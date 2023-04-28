/** @format */

import Head from "next/head";
import Image from "next/image";
import { useEffect, useState } from "react";
import GradientBG from "../components/GradientBG.js";
import styles from "../styles/Home.module.css";
import TokenForm from "../components/TokenForm";
import { Button, useToast } from "@chakra-ui/react";

export default function Home() {
  const [connectContent, setConnectContent] = useState("Connect wallet");
  const [account, setAccount] = useState();

  const toast = useToast({
    position: "bottom-right",
  });

  const connectWallet = async () => {
    if (!(window as any).mina) {
      toast({
        title: "No provider was found Auro Wallet",
        status: "error",
      });
    }

    try {
      const windowMina = (window as any).mina;
      const data = await windowMina.requestAccounts();
      if (data.length) {
        setConnectContent(`${data[0].slice(0, 6)}...${data[0].slice(-4)}`);
      } else {
        setAccount(data[0]);
      }
    } catch (error: any) {
      throw new Error(error.message);
    }
  };

  return (
    <>
      <Head>
        <title>Mina zkApp UI</title>
        <meta name="description" content="built with SnarkyJS" />
        <link rel="icon" href="/assets/favicon.ico" />
      </Head>
      <GradientBG>
        <main className={styles.main}>
          <Button
            onClick={connectWallet}
            position={"absolute"}
            borderRadius={0}
            top={2}
            right={2}
            bg={"orange"}
          >
            {connectContent}
          </Button>

          <div className={styles.center}>
            <a
              href="https://minaprotocol.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                className={styles.logo}
                src="/assets/HeroMinaLogo.svg"
                alt="Mina Logo"
                width="191"
                height="174"
                priority
              />
            </a>
          </div>
          <TokenForm />
        </main>
      </GradientBG>
    </>
  );
}
