// pages/api/getAvgTxValue.js
export default async function handler(req, res) {
    const { address } = req.query;
    const apiKey = process.env.ETHERSCAN_API_KEY;
    const url = `https://api.etherscan.io/api?module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&page=1&offset=10000&sort=asc&apikey=${apiKey}`;
  
    try {
      const response = await fetch(url);
      const data = await response.json();
      
      // If no transactions are found, return an average of 0.
      if (data.status === "0" || !data.result || data.result.length === 0) {
        res.status(200).json({ result: 0 });
        return;
      }
      
      const transactions = data.result;
      // Sum up each transaction value assuming they’re in Wei.
      const totalValueWei = transactions.reduce((acc, tx) => acc + Number(tx.value), 0);
      
      const averageValueWei = totalValueWei / transactions.length;
      // Convert Wei to Ether:
      const averageValueEth = averageValueWei / 1e18;
      
      res.status(200).json({ result: averageValueEth });
    } catch (error) {
      res.status(500).json({
        error: "Failed fetching average transaction value",
        details: error.message,
      });
    }
  }
  