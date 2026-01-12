import { spawn } from "child_process";

export default function handler(req, res) {
  const { transaction_count, avg_transaction_value, transaction_frequency, wallet_age } = req.query;

  if (!transaction_count || !avg_transaction_value || !transaction_frequency || !wallet_age) {
    res.status(400).json({ error: "Missing required parameters." });
    return;
  }

  // Option 1: Try using shell mode
  const pythonProcess = spawn("python", [
    "predict.py",
    "--transaction_count", transaction_count,
    "--avg_transaction_value", avg_transaction_value,
    "--transaction_frequency", transaction_frequency,
    "--wallet_age", wallet_age,
  ], { shell: true });
  
  let output = "";
  pythonProcess.stdout.on("data", (data) => {
    output += data.toString();
  });
  pythonProcess.stderr.on("data", (data) => {
    console.error("Python error:", data.toString());
  });
  pythonProcess.on("close", (code) => {
    if (code === 0) {
      res.status(200).json({ prediction: output.trim() });
    } else {
      res.status(500).json({ error: `Python process exited with code ${code}` });
    }
  });
}
