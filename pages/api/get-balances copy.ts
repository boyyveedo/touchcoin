require('dotenv').config();

export default async function handler(req, res) {

	if (req.method === 'POST') {
		// req.Header.Set("x-api-key", "0231b10114768a6eb5d554413a533b86dd482924");


		try {
				const { walletAddress, chain } = req.body;
				 const chainlow = chain.toLowerCase();

			// Make a POST request to the Telegram Bot API with the message data
			const response = await fetch(`https://rest.cryptoapis.io/blockchain-data/${chainlow}/mainnet/addresses/${walletAddress}/balance?context=yourExampleString`, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					"x-api-key" : "0231b10114768a6eb5d554413a533b86dd482924"
				}
			})
			// .then((data) => {
			// 				// Handle the response data
			// 				const filteredItems = data.data.item.confirmedBalance.filter(item => !item.native_token);
			// 				const sortedBalances = filteredItems.sort((a, b) => {
			// 					// Compare the 'quote' property of each object
			// 					return b.quote - a.quote;
			// 				});
			// 				res.status(200).json({ success: true, sortedBalances });
			// 			});

			// Parse the JSON response
			const responseDat = await response.json();
			const sortedBalance = responseDat;

			const sortedBalances = responseDat.data.item.confirmedBalance;
			// const sortedBalances = responseData.sort((a, b) => {
			// 						// Compare the 'quote' property of each object
			// 						return b.quote - a.quote;
			// 					});

				res.status(200).json({ success: true, sortedBalances });

				console.log(chainlow);
				console.log(sortedBalance);
		} catch (error) {
			// Log any errors that occur during the request
			console.error('Error sending message to bot:', error);
		}

		// try {

		// 	const { walletAddress, chain } = req.body;

		// 	// Define the parameters
		// 	// const covalentKey = process.env.COVALENT_KEY;

		// 	// Define the URL
		// 	// const apiUrl: string = `https://api.covalenthq.com/v1/${chain}/address/${walletAddress}/balances_v2/?key=${covalentKey}`;

		// 	const apiUrl: string = `https://rest.cryptoapis.io/blockchain-data/${chain}/mainnet/addresses/${walletAddress}/balance?context=yourExampleString`;

		// 	// Make the HTTP request using fetch
		// 	await fetch(apiUrl)
		// 		.then((response) => {
		// 			// res.statusCode = 200
		// 			res.setHeader('x-api-key', '0231b10114768a6eb5d554413a533b86dd482924');
		// 			// res.setHeader('Cache-Control', 'max-age=180000');
		// 			// res.end(JSON.stringify(response))
		// 			if (!response.ok) {
		// 				throw new Error('Network response was not ok');
		// 			}
		// 			return response.json();
		// 		})
		// 		.then((data) => {
		// 			// Handle the response data
		// 			const filteredItems = data.data.item.confirmedBalance.filter(item => !item.native_token);
		// 			const sortedBalances = filteredItems.sort((a, b) => {
		// 				// Compare the 'quote' property of each object
		// 				return b.quote - a.quote;
		// 			});
		// 			res.status(200).json({ success: true, sortedBalances });
		// 		})
		// 		.catch((error) => {
		// 			// Handle errors
		// 			console.error('Error fetching user balances:', error);
		// 		});
		// } catch (error) {
		// 	console.error(error);
		// 	res.status(500).json({ success: false, error: error.message });
		// }
	} else {
		res.status(405).end();
	}
}