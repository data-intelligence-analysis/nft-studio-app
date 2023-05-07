import '../styles/globals.css';
import React, { useMemo} from "react";
import dynamic from "next/dynamic";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { 
  WalletModalProvider,
  WalletDisconnectButton,
  WalletMultiButton } 
from "@solana/wallet-adapter-react-ui";
import { ConnectionProvider, WalletProvider } from "@solana/wallet-adapter-react";
import {
  GlowWalletAdapter,
  SlopeWalletAdapter,
  SolflareWalletAdapter,
  TorusWalletAdapter,
  UnsafeBurnerWalletAdapter,
} from "@solana/wallet-adapter-wallets";
import { clusterApiUrl } from "@solana/web3.js";
import CookieBanner from "../components/layouts/CookieBanner";
import { SolanaMobileWalletAdapter } from "@solana-mobile/wallet-adapter-mobile"
import DesktopWarnModal from "../components/layouts/DesktopWarnModal";

import { PayPalScriptProvider } from "@paypal/react-paypal-js"
import { PAYPAL_CLIENT_ID } from "../components/constants"
require("@solana/wallet-adapter-react-ui/styles.css");

function MyApp({ Component, pageProps }) {
  // Can be set to 'devnet', 'testnet', or 'mainnet-beta'
  const network = WalletAdapterNetwork.Mainnet;
  const getLayout = Component.getLayout || ((page) => page);
  // You can also provide a custom RPC endpoint
  const endpoint = useMemo(() => clusterApiUrl(network), [network]);

  const initialOptions = {
    "client-id": PAYPAL_CLIENT_ID.client_id,
    components: "buttons",
    currency: "USD"
    //"data-client-token": DATA_CLIENT_TOKEN.data_client_token
  }
  // @solana/wallet-adapter-wallets includes all the adapters but supports tree shaking and lazy loading --
  // Only the wallets you configure here will be compiled into your application, and only the dependencies
  // of wallets that your users connect to will be loaded
  /*const wallets = useMemo(
    () => [
      new GlowWalletAdapter(),
      new SlopeWalletAdapter(),
      new SolflareWalletAdapter({ network }),
      new TorusWalletAdapter(),
    ],
    [network]
  );*/
  const wallets = useMemo(
    () => [
        /**
         * Wallets that implement either of these standards will be available automatically.
         *
         *   - Solana Mobile Stack Mobile Wallet Adapter Protocol
         *     (https://github.com/solana-mobile/mobile-wallet-adapter)
         *   - Solana Wallet Standard
         *     (https://github.com/solana-labs/wallet-standard)
         *
         * If you wish to support a wallet that supports neither of those standards,
         * instantiate its legacy wallet adapter here. Common legacy adapters can be found
         * in the npm package `@solana/wallet-adapter-wallets`.
         */
        /*new SolanaMobileWalletAdapter({
          //addressSelector: createDefaultAddressSelector(),
          appIdentity: {
              name: 'MetaTed Studio App',
              uri: 'https://metatedstudio.com',
              icon: '/ted192.png',
          },
          //authorizationResultCache: createDefaultAuthorizationResultCache(),
          cluster: WalletAdapterNetwork.Mainnet,
          //onWalletNotFound: createDefaultWalletNotFoundHandler(),
        }),*/
        new SolflareWalletAdapter({ network }),
        new GlowWalletAdapter(),
        new SlopeWalletAdapter(),
        new TorusWalletAdapter(),
        //new UnsafeBurnerWalletAdapter(),
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [network]
);
  return (
      <ConnectionProvider endpoint={endpoint}>
        <WalletProvider wallets={wallets} autoConnect>
          <WalletModalProvider>
            <PayPalScriptProvider options={initialOptions}>
              <CookieBanner />
              <Component {...pageProps} />
            </PayPalScriptProvider>
          </WalletModalProvider>
        </WalletProvider>
      </ConnectionProvider>
  )
}

export default MyApp
