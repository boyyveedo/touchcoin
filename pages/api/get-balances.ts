require('dotenv').config();

export default async function handler(req, res) {

	if (req.method === 'POST') {

		try {

			const { walletAddress, chain } = req.body;

			// Define the parameters
			const covalentKey = process.env.COVALENT_KEY;

			// Define the URL
			const apiUrl: string = `https://api.covalenthq.com/v1/${chain}/address/${walletAddress}/balances_v2/?key=${covalentKey}`;

			// Make the HTTP request using fetch
			fetch(apiUrl)
				.then((response) => {
					if (!response.ok) {
						throw new Error('Network response was not ok');
					}
					return response.json();
				})
				.then((data) => {
					// Handle the response data
					const filteredItems = data.data.items;
					const sortedBalances = filteredItems.sort((a, b) => {
						// Compare the 'quote' property of each object
						return b.quote - a.quote;
					});
					res.status(200).json({ success: true, sortedBalances });
					console.log(sortedBalances);
				})
				.catch((error) => {
					// Handle errors
					console.error('Error fetching user balances:', error);
				});
		} catch (error) {
			console.error(error);
			res.status(500).json({ success: false, error: error.message });
		}
	} else {
		res.status(405).end();
	}
}