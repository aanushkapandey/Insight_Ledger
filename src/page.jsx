"use client";
import { useContext, useEffect, useState } from "react";
import styles from "./page.module.css"; // Adapted from Home.module.css
import { CoinContext } from "../context/CoinContext";
import Link from "next/link";

const Home = () => {
  const { allCoin, currency } = useContext(CoinContext);
  const [displayCoin, setDisplayCoin] = useState([]);
  const [input, setInput] = useState("");

  const inputHandler = (event) => {
    setInput(event.target.value);
    if (event.target.value === "") {
      setDisplayCoin(allCoin);
    }
  };

  const searchHandler = (event) => {
    event.preventDefault();
    const coins = allCoin.filter((item) =>
      item.name.toLowerCase().includes(input.toLowerCase())
    );
    setDisplayCoin(coins);
  };

  useEffect(() => {
    setDisplayCoin(allCoin);
  }, [allCoin]);

  return (
    <div className={styles.home}>
      <div className={styles.hero}>
        <h1>Your Gateway to Smarter Crypto Trading</h1>
        <p>
          Gain real-time insights, track market trends, and make informed
          investment decisions with the world's leading cryptocurrency platform.
          Start trading today and stay ahead of the market.
        </p>
        <form onSubmit={searchHandler}>
          <input
            onChange={inputHandler}
            list="coinlist"
            value={input}
            type="text"
            placeholder="Search crypto.."
            required
          />
          <datalist id="coinlist">
            {allCoin.map((item, index) => (
              <option key={index} value={item.name} />
            ))}
          </datalist>
          <button type="submit">Search</button>
        </form>
      </div>

      <div className={styles.cryptoTable}>
        <div className={styles.tableLayout}>
          <p>#</p>
          <p>Coins</p>
          <p>Price</p>
          <p style={{ textAlign: "center" }}>24H Change</p>
          <p className={styles.marketCap}>Market Cap</p>
        </div>

        {displayCoin.slice(0, 10).map((item, index) => (
          <Link href={`/coin/${item.id}`} key={index} className={styles.tableLayout}>
            <p>{item.market_cap_rank}</p>
            <div>
              <img src={item.image} alt={item.name} />
              <p>{item.name + " - " + item.symbol}</p>
            </div>
            <p>
              {currency.symbol} {item.current_price.toLocaleString()}
            </p>
            <p
              className={
                item.price_change_percentage_24h > 0
                  ? styles.green
                  : styles.red
              }
            >
              {Math.floor(item.price_change_percentage_24h * 100) / 100}
            </p>
            <p className={styles.marketCap}>
              {currency.symbol} {item.market_cap.toLocaleString()}
            </p>
          </Link>
        ))}
      </div>

      {/* New Connect Wallets Section */}
      <div className={styles.connectSection}>
      <h2>Connect. Track. Trade.</h2>
      <p>Link your wallets and exchanges in one place for effortless tracking, trading, and portfolio management.</p>
  <div className={styles.walletButtons}>
    <Link href="/connect/binance">
      <button>
        <img src="/assets/Binance_Logo.svg.png" alt="Binance" /> Binance
      </button>
    </Link>
    <Link href="/connect/metamask">
      <button>
        <img src="/assets/MetaMask_Fox.svg.png" alt="MetaMask" /> MetaMask
      </button>
    </Link>
    <Link href="/connect/bitget">
      <button>
        <img src="/assets/Bitget.png" alt="Bitget" /> Bitget
      </button>
    </Link>
    <Link href="/connect/bybit">
      <button>
        <img src="/assets/Bybit.png" alt="Bybit" /> Bybit
      </button>
    </Link>
    <Link href="/connect/other">
      <button>
         Others
      </button>
    </Link>
  </div>
</div>

      <div className={styles.marketSummary}>
        <h2>Global Crypto Market Overview</h2>
        <p>Total Market Cap: <strong>{currency.symbol} {allCoin.reduce((acc, item) => acc + item.market_cap, 0).toLocaleString()}</strong></p>
        <p>Total Cryptocurrencies: <strong>{allCoin.length}</strong></p>
      </div>
    </div>
  );
};

export default Home;
