// pages/api/getTokenTx.js
export default async function handler(req, res) {
    const { address } = req.query;
    const apiKey = process.env.ETHERSCAN_API_KEY;
  
    const url = `https://api.etherscan.io/api?module=account&action=tokentx&address=${address}&startblock=0&endblock=99999999&page=1&offset=100&sort=asc&apikey=${apiKey}`;
  
    try {
      const response = await fetch(url);
      const data = await response.json();
      res.status(200).json(data);
    } catch (err) {
      res.status(500).json({ error: "Failed fetching token transfers", details: err.message });
    }
  }
  