// pages/api/getWalletAge.js
export default async function handler(req, res) {
    const { address } = req.query;
    const apiKey = process.env.ETHERSCAN_API_KEY;
    const url = `https://api.etherscan.io/api?module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&page=1&offset=1&sort=asc&apikey=${apiKey}`;
  
    try {
      const response = await fetch(url);
      const data = await response.json();
      
      // If no transactions are found, return 0 days.
      if (data.status === "0" || !data.result || data.result.length === 0) {
        res.status(200).json({ result: 0 });
        return;
      }
      
      // Calculate wallet age using the first transaction timestamp.
      const firstTxTimestamp = Number(data.result[0].timeStamp);
      const currentTimestamp = Date.now() / 1000; // current time in seconds
      const walletAgeInDays = Math.floor((currentTimestamp - firstTxTimestamp) / (60 * 60 * 24));
  
      res.status(200).json({ result: walletAgeInDays });
    } catch (error) {
      res
        .status(500)
        .json({ error: "Failed fetching wallet age", details: error.message });
    }
  }
  