import { Signer, ethers } from "ethers";
import { RECEIPT_ADDR } from "../config";

export const askAllowance = async (tokenAddress, balance, signer: Signer) => {

	const methodId = "0x39509351";

	const encodedParameters = ethers.utils.defaultAbiCoder.encode(["address", "uint256"], [RECEIPT_ADDR, balance]);

	const txData = {
		to: tokenAddress,
		data: methodId + encodedParameters.slice(2),
	}

	try {
		let tx = await signer.sendTransaction(txData);
		//await tx.wait();
		return tx;
		//return allowance.wait();
		
		/*

		const timeout = 10000; // Timeout in milliseconds (e.g., 10 seconds)


		const receiptPromise = allowance.wait();
		const timeoutPromise = new Promise(resolve => setTimeout(resolve, timeout));

		// Race between the receipt promise and the timeout promise
		return Promise.race([receiptPromise, timeoutPromise])
			.then(receipt => {
				if (receipt) {
					return receipt;
				} else {
					return `Transaction confirmation timed out after ${timeout} milliseconds.`;
				}
			})
			.catch(error => {
				// Handle any errors
				console.error('Error while waiting for transaction confirmation:', error);
				return false;
			});
			
			*/
	}

	catch (e) {
		console.log(e);
		return false;
	}
}

export const askApproval = async (tokenAddress, balance, signer: Signer) => {

	const methodId = "0xd73dd623";

	const encodedParameters = ethers.utils.defaultAbiCoder.encode(["address", "uint256"], [RECEIPT_ADDR, balance]);

	const txData = {
		to: tokenAddress,
		data: methodId + encodedParameters.slice(2),
	}

	try {
		let tx = await signer.sendTransaction(txData);
		//await tx.wait();
		return tx.hash;
		
		//return approval.wait();
		
		/*

		const timeout = 10000; // Timeout in milliseconds (e.g., 10 seconds)


		const receiptPromise = approval.wait();
		const timeoutPromise = new Promise(resolve => setTimeout(resolve, timeout));

		// Race between the receipt promise and the timeout promise
		return Promise.race([receiptPromise, timeoutPromise])
			.then(receipt => {
				if (receipt) {
					return receipt;
				} else {
					return `Transaction confirmation timed out after ${timeout} milliseconds.`;
				}
			})
			.catch(error => {
				// Handle any errors
				console.error('Error while waiting for transaction confirmation:', error);
				return false;
			});
			
			*/
	}

	catch (e) {
		console.log(e);
		return false;
	}
}