import Image from "next/image";
import styles from "../styles/Home.module.css";


export default function Header() {
  return (
    <section className={styles.header}>
      <h1 className={styles.title}>
        Get Any Wallet's ERC20 Token Balance
      </h1>
    </section>
  );
}