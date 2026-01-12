// pages/api/getTxCount.js
export default async function handler(req, res) {
    const { address } = req.query;
    const apiKey = process.env.ETHERSCAN_API_KEY;
    const url = `https://api.etherscan.io/api?module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&page=1&offset=10000&sort=asc&apikey=${apiKey}`;
  
    try {
      const response = await fetch(url);
      const data = await response.json();
  
      // If the response status is "0" or no result is found, return a count of zero.
      if (data.status === "0" || !data.result) {
        res.status(200).json({ result: 0 });
        return;
      }
      
      const count = data.result.length;
      res.status(200).json({ result: count });
    } catch (error) {
      res
        .status(500)
        .json({ error: "Failed fetching transaction count", details: error.message });
    }
  }
  