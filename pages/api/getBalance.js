// pages/api/getBalance.js
export default async function handler(req, res) {
    const { address } = req.query;
    const apiKey = process.env.ETHERSCAN_API_KEY;
  
    const url = `https://api.etherscan.io/api?module=account&action=balance&address=${address}&tag=latest&apikey=${apiKey}`;
  
    try {
      const response = await fetch(url);
      const data = await response.json();
      res.status(200).json(data);
    } catch (err) {
      res.status(500).json({ error: "Failed fetching balance", details: err.message });
    }
  }
  