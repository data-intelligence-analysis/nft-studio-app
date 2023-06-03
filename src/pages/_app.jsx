require("@solana/wallet-adapter-react-ui/styles.css");
import '../styles/globals.css';
import React, { useMemo, useCallback, useState, useEffect } from "react";
import { 
  WalletModalProvider,
} 
from "@solana/wallet-adapter-react-ui";
import { WalletAdapterNetwork, WalletError } from '@solana/wallet-adapter-base';
import { Connection, Wallet } from '@solana/web3.js';
import { SnackbarProvider, useSnackbar } from 'notistack';
import { ConnectionProvider, WalletProvider } from "@solana/wallet-adapter-react";
import {
  SlopeWalletAdapter,
  GlowWalletAdapter,
  LedgerWalletAdapter,
  SolflareWalletAdapter,
  TorusWalletAdapter,
  PhantomWalletAdapter,
  CoinbaseWalletAdapter
} from "@solana/wallet-adapter-wallets";
//import { CoinbaseWalletAdapter } from "@solana/wallet-adapter-coinbase";
//import { GlowWalletAdapter } from "@solana/wallet-adapter-glow";
//import { SolanaMobileWalletAdapter } from "@solana-mobile/wallet-adapter-mobile"
import { clusterApiUrl, ConnectionConfig } from "@solana/web3.js";
import CookieBanner from "../components/layouts/CookieBanner";
import DesktopWarnModal from "../components/layouts/DesktopWarnModal";
import { PayPalScriptProvider } from "@paypal/react-paypal-js"
import { PAYPAL_CLIENT_ID } from "../components/constants"
//import { ThemeProvider } from '@emotion/react';

const CONNECTION_CONFIG = { commitment: 'processed' };
//const theme = /*#__PURE__*/ createTheme();
//const endpoint = /*#__PURE__*/ clusterApiUrl(network );
/*const SolanaMobileWalletAdapter = () => {
  const [wallet, setWallet] = useState(null);

  useEffect(() => {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;
    // Regular expression to check if the userAgent indicates a mobile device
    const mobileDeviceRegex = /android|iphone|ipod|ipad|iemobile|opera mini/i;
    const isMobile = mobileDeviceRegex.test(userAgent);
    if (isMobile) {
      connectSolanaWallet();
    }
  }, []);

  const connectSolanaWallet = async () => {
    try {
      // Create a connection to the Solana network
      const connection = new Connection('https://api.mainnet-beta.solana.com');

      // Connect to the Solana wallet using Wallet Connect
      const wallet = await Wallet.connect({
        connection,
        provider: 'https://www.sollet.io',
        network: 'mainnet-beta',
      });

      setWallet(wallet);
    } catch (error) {
      console.error('Error connecting to Solana wallet:', error);
    }
  };

  return (
    <div>
      {wallet ? (
        // Render the Solana mobile wallet adapter
        <div>Render the Solana mobile wallet adapter here</div>
      ) : (
        <div>Mobile wallet adapter is only available on mobile devices.</div>
      )}
    </div>
  );
};*/
function MyApp({ Component, pageProps }) {
  //states
  const [isMobile, setIsMobile] = useState(false);
  // Can be set to 'devnet', 'testnet', or 'mainnet-beta'
  const network = WalletAdapterNetwork.Mainnet; 
  // You can also provide a custom RPC endpoint
  const endpoint = useMemo(() => clusterApiUrl(network), [network]);
  
  const { enqueueSnackbar } = useSnackbar();
    const handleWalletError = useCallback(
        (e) => {
            enqueueSnackbar(`${e.name}: ${e.message}`, { variant: 'error' });
        },
        [enqueueSnackbar],
    );
  const initialOptions = {
    "client-id": PAYPAL_CLIENT_ID.client_id,
    components: "buttons",
    currency: "USD"
    //"data-client-token": DATA_CLIENT_TOKEN.data_client_token
  }
  /*useEffect(() => {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;

    // Regular expression to check if the userAgent indicates a mobile device
    const mobileDeviceRegex = /android|iphone|ipod|ipad|iemobile|opera mini/i;

    setIsMobile(mobileDeviceRegex.test(userAgent));
  }, []);*/
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
  /**/
  const wallets = useMemo(
      () => typeof window === 'undefined'
      ? [] // No wallet adapters when server-side rendering.
      :[
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
                name: 'MetaTeds Studio App',
                uri: 'https://metatedstudio.com',
                icon: '/ted192.png',
            },
            //authorizationResultCache: createDefaultAuthorizationResultCache(),
            //cluster: WalletAdapterNetwork.Mainnet,
            //onWalletNotFound: createDefaultWalletNotFoundHandler(),
          }),*/
          new CoinbaseWalletAdapter(),
          new LedgerWalletAdapter(),
          //new SlopeWalletAdapter(),
          //new GlowWalletAdapter(),
          new SolflareWalletAdapter(),
          //new SolletWalletAdapter(),
          //new SolletExtensionWalletAdapter({ network }),
          new TorusWalletAdapter(),
          new PhantomWalletAdapter({network}),
      ],
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [network]
  );
  
  return (
    <SnackbarProvider autoHideDuration={10000}>
      <ConnectionProvider config={CONNECTION_CONFIG} endpoint={endpoint}>
        <WalletProvider wallets={wallets} autoConnect={true} onError={handleWalletError}>
          <WalletModalProvider>
            <PayPalScriptProvider options={initialOptions}>
              <CookieBanner />
              <Component {...pageProps} />
            </PayPalScriptProvider>
          </WalletModalProvider>
        </WalletProvider>
      </ConnectionProvider>
    </SnackbarProvider>
  )
}

export default MyApp
