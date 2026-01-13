"use client";

import { useContext } from "react";
import NextImage from "next/image"; // Renamed this import to avoid conflicts with the global Image constructor.
import Link from "next/link";
import {
  ClerkProvider,
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";
import { SignUp } from "@clerk/nextjs";

import "./globals.css";
import Footer from "../components/Footer/Footer";
import CoinContextProvider, { CoinContext } from "../context/CoinContext";
// Importing the existing Navbar styles for header styling.
import headerStyles from "../components/Navbar/Navbar.module.css";

const Header = () => {
  const { setCurrency } = useContext(CoinContext) || {};

  const currencyHandler = (event) => {
    const currencyMap = {
      usd: { name: "usd", symbol: "$" },
      eur: { name: "eur", symbol: "€" },
      inr: { name: "inr", symbol: "₹" },
    };
    setCurrency?.(currencyMap[event.target.value] || currencyMap.usd);
  };

  return (
    <header className={headerStyles.navbar}>
      <Link href="/" passHref>
        {/* Notice that we refer to the asset using its URL path since it's in the public folder */}
        <NextImage
          src="/assets/logo.png"
          alt="Logo"
          className={headerStyles.logo}
          width={100}
          height={50}
        />
      </Link>
      
      <ul className={headerStyles.navLinks}>
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/features">Features</Link>
        </li>
        <li>
          <Link href="/blog">Blog</Link>
        </li>
        <li>
          <Link href="/about">About</Link>
        </li>
        <li>
          <Link href="/contact">Contact</Link>
        </li>
      </ul>
      

      <div className={headerStyles.navRight}>
      <ul>
      <li>
  <Link href="/portfolio-by-address">
    <button className={headerStyles.portfolioButton}>Portfolio Tracker</button>
  </Link>
</li>

      </ul>
        <select onChange={currencyHandler} defaultValue="usd">
          <option value="usd">USD</option>
          <option value="eur">EUR</option>
          <option value="inr">INR</option>
        </select>

        {/* Clerk authentication components: Show SignIn/SignUp when signed out and the UserButton when signed in */}
        <SignedOut>
          {/* <SignInButton/> */}
          {/* <SignUpButton /> */}
          <Link className="sg-btn" href="/sign-in">Sign In</Link>
          <Link className="sg-btn" href="/sign-up">Sign Up</Link>
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </header>
  );
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className="app antialiased">
          <CoinContextProvider>
            <Header />
            {children}
          </CoinContextProvider>
          <Footer />
        </body>
      </html>
    </ClerkProvider>
  );
}
