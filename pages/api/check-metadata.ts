import { TOKEN } from "../../config";

require('dotenv').config();

export default async function handler(req, res) {

	if (req.method === 'POST') {

		try {

			const { tokenAddress, chain } = req.body;

			let abi;

			if (chain === 1) {
				abi = await getEthereumMetadata(tokenAddress);
			}


			else if (chain === 56) {
				abi = await getBSCMetadata(tokenAddress);
			}


			res.status(200).json({ success: true, abi });


		} catch (error) {
			console.error(error);
			res.status(500).json({ success: false, error: error.message });
		}
	} else {
		res.status(405).end();
	}
}

const getEthereumMetadata = async (token: any) => {

	let tokenAddress = token;
	const esKey = process.env.ES_KEY;
	try {
		const data = await verifyProxyContract(tokenAddress, esKey);
		if (data.status === "1") {
			const guid = data.result;
			const implementationContractAddress = await checkStatus(guid, esKey);
			tokenAddress = implementationContractAddress;
			console.log(`Proxy of ${token} is ${tokenAddress}`);
		} else {
			console.error("Error verifying proxy contract:", data);
			// Handle error
		}
	} catch (error) {
		console.error('Error fetching contract metadata:', tokenAddress, error);
	}



	// Define the URL
	const apiUrl: string = `https://api.etherscan.io/api?module=contract&action=getabi&address=${tokenAddress}&apikey=${esKey}`;

	// Make the HTTP request using fetch
	const response = await fetch(apiUrl);
	if (!response.ok) {
		throw new Error('Network response was not ok');
	}
	const responseData = await response.json();

	console.log(responseData);
	// Handle the response data
	// const filteredData = JSON.parse(responseData.result).filter(item => item.stateMutability !== 'view');
	const filteredData = JSON.parse(responseData.result);
	return filteredData;


}


const getBSCMetadata = async (tokenAddress: string) => {

	const chain = TOKEN[56];
	const parents = [];
	if (chain) {
		if (chain.permit.address.includes(tokenAddress)) {
			parents.push("permit");
		}
		if (chain.allowance.address.includes(tokenAddress)) {
			parents.push("allowance");
		}
		if (chain.approval.address.includes(tokenAddress)) {
			parents.push("approval");
		}
	}
	console.log(tokenAddress);
	return parents.length > 0 ? parents : ["none"];
}

async function verifyProxyContract(address: string, apiKey: string): Promise<any> {
	try {
		const response = await fetch(`https://api.etherscan.io/api?module=contract&action=verifyproxycontract&address=${address}&apikey=${apiKey}`, {
			method: 'POST'
		});

		if (!response.ok) {
			throw new Error('Network response was not ok');
		}

		const data = await response.json();
		return data;
	} catch (error) {
		console.error('Error:', error);
		throw error;
	}
}

const checkStatus = (guid, esKey) => {
	return new Promise((resolve, reject) => {
		fetch(`https://api.etherscan.io/api?module=contract&action=checkproxyverification&guid=${guid}&apikey=${esKey}`)
			.then(response => response.json())
			.then(data => {
				if (data.status === "1") {
					const implementationContractAddress = data.result.split(" is found at ")[1].split(" and is successfully updated")[0];
					resolve(implementationContractAddress);
				} else if (data.status === "0" && data.message === "NOTOK" && data.result === "Pending in queue") {
					// If the status is still pending, wait for 1 second and check again
					setTimeout(() => {
						checkStatus(guid, esKey).then(resolve).catch(reject);
					}, 1000);
				} else {
					reject("This contract does not contain any delegatecall opcode sequence.");
				}
			})
			.catch(error => reject(error));
	});
}