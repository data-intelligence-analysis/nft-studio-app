import '../styles/globals.css'
import React, { useMemo, useState } from "react";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import { ConnectionProvider, WalletProvider } from "@solana/wallet-adapter-react";
import {
  GlowWalletAdapter,
  PhantomWalletAdapter,
  SlopeWalletAdapter,
  SolflareWalletAdapter,
  TorusWalletAdapter,
} from "@solana/wallet-adapter-wallets";
import { clusterApiUrl } from "@solana/web3.js";
import CookieBanner from "../components/layouts/CookieBanner";
import DesktopWarnModal from "../components/layouts/DesktopWarnModal";

import { PayPalScriptProvider } from "@paypal/react-paypal-js"
import { PAYPAL_CLIENT_ID, DATA_CLIENT_TOKEN } from "../components/constants"
require("@solana/wallet-adapter-react-ui/styles.css");

function MyApp({ Component, pageProps }) {
  // Can be set to 'devnet', 'testnet', or 'mainnet-beta'
  const network = WalletAdapterNetwork.Mainnet;

  // You can also provide a custom RPC endpoint
  const endpoint = useMemo(() => clusterApiUrl(network), [network]);

  const initialOptions = {
    "client-id": PAYPAL_CLIENT_ID.client_id,
    components: "buttons",
    currency: "USD"
    //"data-client-token": DATA_CLIENT_TOKEN.data_client_token
  }

  
  /*const wallet = useWallet();
  let walletAddress = '';
  try{
      if (wallet.connected && wallet.publicKey) {
          walletAddress = wallet.publicKey.toString()
          console.log(walletAddress)
      }
  }catch(e){console.log(e)}*/
  // @solana/wallet-adapter-wallets includes all the adapters but supports tree shaking and lazy loading --
  // Only the wallets you configure here will be compiled into your application, and only the dependencies
  // of wallets that your users connect to will be loaded
  const wallets = useMemo(
    () => [
      new PhantomWalletAdapter(),
      new GlowWalletAdapter(),
      new SlopeWalletAdapter(),
      new SolflareWalletAdapter({ network }),
      new TorusWalletAdapter(),
    ],
    [network]
  );
  return (
      
      <ConnectionProvider endpoint={endpoint}>
        <WalletProvider wallets={wallets} autoConnect>
          <WalletModalProvider>
            <PayPalScriptProvider options={initialOptions}>
              <DesktopWarnModal />
              <CookieBanner />
              <Component {...pageProps} />
            </PayPalScriptProvider>
          </WalletModalProvider>
        </WalletProvider>
      </ConnectionProvider>
    
    
    
    
  )
}

export default MyApp
