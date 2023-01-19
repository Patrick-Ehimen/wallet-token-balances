// import useState hook from react
import { useState } from "react";

// import styles from Home.module.css
import styles from "../styles/Home.module.css";

// Import Moralis and @moralisweb3/common-evm-utils
const Moralis = require("moralis").default;
const { EvmChain } = require("@moralisweb3/common-evm-utils");

  export default function Header() {
    const [showResult, setShowResult] = useState(false);
    const [result, setResult] = useState([]);
    let walletAddress;

    const handleSubmit = async () => {
      walletAddress = document.querySelector("#walletAddress").value;
      const chain = EvmChain.ETHEREUM;

      await Moralis.start({
        apiKey: process.env.NEXT_PUBLIC_MORALIS_API_KEY,
      });

      const response = await Moralis.EvmApi.token.getWalletTokenBalances({
        address: walletAddress,
        chain,
      });

      console.log(response.toJSON());
      setResult(response.toJSON());
      setShowResult(true);
      document.querySelector("#walletAddress").value = "";
    };

  return (
    <section className={styles.main}>
      <form
        className={styles.getTokenForm}
        name="create-profile-form"
        method="POST"
        action="#"
      >
        <label className={styles.label} htmlFor="walletAddress">
          Add ERC20 Wallet Address
        </label>
        <input
          className={styles.walletAddress}
          type="text"
          id="walletAddress"
          name="walletAddress"
          maxLength="120"
          required
        />
      </form>
      <button className={styles.form_btn} onClick={handleSubmit}>
        Submit Address
      </button>
      <section className={styles.result}>
        {showResult &&
          result.map((token) => {
            return (
              <section
                className={styles.tokenContainer}
                key={result.indexOf(token)}
              >
                <img src={token.thumbnail} />
                <p className={styles.name}>{token.name}</p>
                <p className={styles.amount}>
                  {(token.balance / 10 ** token.decimals).toFixed(2)}
                </p>
              </section>
            );
          })}
      </section>
    </section>
  );
}