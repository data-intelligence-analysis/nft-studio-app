import React, {useState, useMemo, useEffect, useRef} from "react";
import { Keypair, Transaction } from "@solana/web3.js";
import { findReference, FindReferenceError } from "@solana/pay";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { Circles } from "react-loader-spinner";
import { addOrder, hasPurchased } from "../pages/api";
import { Snackbar } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import Stack from '@mui/material/Stack';
import { server } from '../config'
//confirming transactions are sent - turn transactions to payments
const STATUS = {
  Initial: "Initial",
  Submitted: "Submitted",
  Paid: "Paid"
}

const BuyUSD = ({priceID, price, ticker}) => {

  const { connection } = useConnection();
  const { publicKey, sendTransaction } = useWallet();
  const orderID = useMemo(() => Keypair.generate().publicKey, []);// Public key used to identify the order
  const [alertState, setAlertState] = useState({
    open: false,
    message: "",
    severity: undefined,
  });
  //const [item, setItem] = useState(null);
  const [status, setStatus] = useState(STATUS.Initial);

  const [loading, setLoading] = useState(false); // Loading state of all above
  
  // useMemo is a React hook that only computes the value if the dependencies change
  const order = useMemo(
    () => ({
      buyer: publicKey.toString(),
      orderID: orderID.toString(),
      priceID: priceID
    }),
    [publicKey, orderID, priceID]
  );
  
  //to handle external APIs
  /*const corsHeaders ={
    'Allow-Control-Allow-Headers': '*',
    'Allow-Control-Allow-Methods': 'POST',
    'Access-Control-Allow-Origin': '*'
  }*/
  // Fetch the transaction object from the server 
  const processTransaction = async () => {
    setLoading(true);
    
    const txResponse = await fetch(`${server}/api/createTransactionUSDCcoin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        //...corsHeaders
      },
      body: JSON.stringify(order),
    });
  
    

    const txData = await txResponse.json();

    console.log(txData)
    // We create a transaction object
    const tx = Transaction.from(Buffer.from(txData.transaction, "base64"));
    console.log("Tx data is", tx);
    
    // Attempt to send the transaction to the network
    try {
      // Send the transaction to the network
      const txHash = await sendTransaction(tx, connection);
      console.log(`Transaction sent: https://solscan.io/tx/${txHash}?cluster=mainnet`);
      // Even though this could fail, we're just going to set it to true for now
      setStatus(STATUS.Submitted)
    } catch (error) {
      let msg = error.msg || "Minting failed! Please try again!";
      if (!error.msg){
        if (!error.message){
          msg= "Transaction timeout! Please try again."
        } else if (error.message.indexOf("0x135")){
          msg = `Insufficient funds to mint. Please fund your wallet.`;
        } 
      }
      setAlertState({
        open: true,
        message: msg,
        severity: "error",
        hideDuration: 8000
      });
      console.error(error); 
    } finally {
      setLoading(false);
    }

  };
  useEffect(() => {
    // Check if this address has already purchased this item
    // If so, fetch the item and set paid to true
    // Async function to avoid blocking the UI
    async function checkPurchased() {
      const purchased = await hasPurchased(publicKey, priceID);
      if (purchased) {
        setStatus(STATUS.Paid);
        let alreadyPurchased = "Address has already made a donation!"
        setAlertState({
          open: true,
          message: alreadyPurchased,
          severity: "info",
          hideDuration: null
        })
        console.log("Address has already made a donation!");
      }
    }
    checkPurchased();
  }, [publicKey, priceID]);
  /*The magic of solana pay - Solana Pay allows us to search for transactions by their reference. 
  *This means we can instantly check if a payment has been made without any deep digging.
  */
  useEffect(() => {
    //Check if transaction was confirmed
    if (status === STATUS.Submitted){
      setLoading(true);
      const interval = setInterval(async () => {
          try {
              //search transactions by their reference to check if a payment has been made
              const result = await findReference(connection, orderID);
              console.log("Finding tx reference", result.confirmationStatus);
              if (result.confirmationStatus === "confirmed" || result.confirmationStatus === "finalized") {
                let success = "Thank you for your purchase!"
                clearInterval(interval);
                setStatus(STATUS.Paid);
                setLoading(false);
                addOrder(order)
                setAlertState({
                  open: true,
                  message: success,
                  severity: "success",
                  hideDuration: null
                })
              }
          }catch (e) {
              /*looks for the oldest transaction signature reference our orderID. If we find one, we check that the transaction status
              * was either confirmed or finalized.
              * So we check if the error was from the FindReferenceError class and ignore it.
              *
              * If all goes according to plan, our code will start looking for the transaction just as the user clicks "Approve". 
              * The first search will probably fail because transactions take about 0.5s. 
              * This is why we're using setInterval >:D. 
              * The second time it checks, it'll find the transaction and will confirm it, 
              * updating our app to indicate payment.
              * THIS IS A BIG DEAL! The whole reason we use blockchains is so that we don't have to worry about invalid transactions. 
              * When Solana Pay tells you a transaction was confirmed, 
              * you know a transaction was confirmed and that the money is in your wallet. No chargebacks */
              if (e instanceof FindReferenceError){
                  return null;
              }
              // this function will error if the transaction isn't found and that can happen right after the transaction
              console.error("Uknown error: ", e);
              setAlertState({
                open: true,
                message: "Transaction isn't found, check console!",
                severity: "error",
                hideDuration: 5000
              })
              
          }finally {setLoading(false);}
      }, 1000); //1 seconds
      return () => {
        clearInterval(interval);
      };
    }
    if (status === STATUS.Paid){
        let success = "Transaction Successful"
        console.log(success)
        setAlertState({
          open: true,
          message: success,
          severity: "success",
          hideDuration: 6000
        })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);
  
  if (!publicKey){
    let error = "Connect wallet to make transaction"
    setAlertState({
      open: true,
      message: error,
      severity: "error",
      hideDuration: null
    })
    return (
      console.log("Unable to identify wallet public key")
    )
  }

  if (loading) {
    //let waiting = "Waiting for transaction....."
    //console.log(waiting)
    return (
        <Circles 
          width='50' 
          height='50' 
          color="purple"
          ariaLabel = "circles-loading"
          wrapperClass="items-center justify-center"
          wrapperStyle=""
          visible={true} />
    )
  }
  return(
    <div className="relative">
      <div>
        {status === STATUS.Paid ? (
          <div className="text-center items-center text-sm sm:text-base">
            <Alert
              onClose={()=> {}}
              severity="success"
              iconMapping={{success: <CheckCircleOutlineIcon fontSize="inherit" />}}
              >
              Successful USDC Donation
            </Alert>
          </div>
          
        ) : (
          <div className="flex items-center justify-center mt-5 sm:mt-10">
            {/*()=> alert("Still in development")*/}
            <button disabled={loading} onClick = {processTransaction} className="solana-button-text bg-[#4e44ce] text-sm sm:text-base font-bold px-2.5 py-1 text-center">
              <p className="inline-block">Donate {price.split(".")[0]} {ticker}</p>
            </button>
          </div>
          
        )}
      </div>
      <div className="fixed mx-auto top-0 left-0 bottom-0 text-center items-center">
        <Snackbar
          open={alertState.open}
          autoHideDuration={
            alertState.hideDuration === undefined ? 6000 : alertState.hideDuration
          }
          onClose={() => setAlertState({ ...alertState, open: false })}
        >
          <Alert
            onClose={() => setAlertState({ ...alertState, open: false })}
            severity={alertState.severity}
          >
            {alertState.message}
          </Alert>

        </Snackbar>
      </div>
    </div>
  )
}
const Buy = ({priceID, price, ticker}) => {

  const { connection } = useConnection();
  const { publicKey, sendTransaction } = useWallet();
  const orderID = useMemo(() => Keypair.generate().publicKey, []); // Public key used to identify the order
  const [alertState, setAlertState] = useState({
    open: false,
    message: "",
    severity: undefined,
  });
  //const [item, setItem] = useState(null);
  const [status, setStatus] = useState(STATUS.Initial);

  const [loading, setLoading] = useState(false); // Loading state of all above
  
  // useMemo is a React hook that only computes the value if the dependencies change
  const order = useMemo(
    () => ({
      buyer: publicKey.toString(),
      orderID: orderID.toString(),
      priceID: priceID
    }),
    [publicKey, orderID, priceID]
  );
  
  //to handle external APIs
  const corsHeaders ={
    'Allow-Control-Allow-Headers': '*',
    'Allow-Control-Allow-Methods': 'POST',
    'Access-Control-Allow-Origin': '*'
  }
  // Fetch the transaction object from the server 
  const processTransaction = async () => {
    setLoading(true);
    
    const txResponse = await fetch(`${server}/api/createTransactionSOLcoin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders //to avoid 500 errors
      },
      body: JSON.stringify(order),
    });
  
    

    const txData = await txResponse.json();

    console.log(txData)
    // We create a transaction object
    const tx = Transaction.from(Buffer.from(txData.transaction, "base64"));
    console.log("Tx data is", tx);
    
    // Attempt to send the transaction to the network
    try {
      // Send the transaction to the network
      const txHash = await sendTransaction(tx, connection);
      console.log(`Transaction sent: https://solscan.io/tx/${txHash}?cluster=mainnet`);
      // Even though this could fail, we're just going to set it to true for now
      setStatus(STATUS.Submitted)
    } catch (error) {
      let msg = error.msg || "Transaction failed! Please try again!";
      if (!error.msg){
        if (!error.message){
          msg = `Transaction timeout! Please try again.`;
        } else if (error.message.indexOf("0x135")){
          msg = `Insufficient funds to mint. Please fund your wallet.`;
        } else {
          msg = `Transaction failed!`;
        }
      }else {
        if (error.code === 4001){
          console.log(error)
          msg = `Request was rejected by the user`
        }
      }
      setAlertState({
        open: true,
        message: msg,
        severity: "error",
        hideDuration: 8000
      });
      console.error(error); 
    } finally {
      setLoading(false);
    }

  };
  useEffect(() => {
    // Check if this address has already purchased this item
    // If so, fetch the item and set paid to true
    // Async function to avoid blocking the UI
    async function checkPurchased() {
      const purchased = await hasPurchased(publicKey, priceID);
      if (purchased) {
        setStatus(STATUS.Paid);
        let alreadyPurchased = "Address has already made a donation!"
        setAlertState({
          open: true,
          message: alreadyPurchased,
          severity: "info",
          hideDuration: null
        })
        console.log("Address has already made a donation!");
      }
    }
    checkPurchased();
  }, [publicKey, priceID]);
  /*The magic of solana pay - Solana Pay allows us to search for transactions by their reference. 
  *This means we can instantly check if a payment has been made without any deep digging.
  */
  useEffect(() => {
    //Check if transaction was confirmed
    if (status === STATUS.Submitted){
      setLoading(true);
      const interval = setInterval(async () => {
          try {
              //search transactions by their reference to check if a payment has been made
              const result = await findReference(connection, orderID);
              console.log("Finding tx reference", result.confirmationStatus);
              if (result.confirmationStatus === "confirmed" || result.confirmationStatus === "finalized") {
                let success = "Thank you for your purchase!"
                clearInterval(interval);
                setStatus(STATUS.Paid);
                setLoading(false);
                addOrder(order)
                setAlertState({
                  open: true,
                  message: success,
                  severity: "success",
                  hideDuration: null
                })
              }
          }catch (e) {
              /*looks for the oldest transaction signature reference our orderID. If we find one, we check that the transaction status
              * was either confirmed or finalized.
              * So we check if the error was from the FindReferenceError class and ignore it.
              *
              * If all goes according to plan, our code will start looking for the transaction just as the user clicks "Approve". 
              * The first search will probably fail because transactions take about 0.5s. 
              * This is why we're using setInterval >:D. 
              * The second time it checks, it'll find the transaction and will confirm it, 
              * updating our app to indicate payment.
              * THIS IS A BIG DEAL! The whole reason we use blockchains is so that we don't have to worry about invalid transactions. 
              * When Solana Pay tells you a transaction was confirmed, 
              * you know a transaction was confirmed and that the money is in your wallet. No chargebacks */
              if (e instanceof FindReferenceError){
                  return null;
              }
              // this function will error if the transaction isn't found and that can happen rigth after the transaction
              console.error("Uknown error", e);
              setAlertState({
                open: true,
                message: "Transaction isn't found!",
                severity: "error",
                hideDuration: 5000
              })
              
          }finally {setLoading(false);}
      }, 1000); //1 seconds
      return () => {
        clearInterval(interval);
      };
    }
    if (status === STATUS.Paid){
        let success = "Transaction Successful"
        console.log(success)
        setAlertState({
          open: true,
          message: success,
          severity: "success",
          hideDuration: 6000
        })
        
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);
  
  if (!publicKey){
    let error = "Connect wallet to make transaction"
    setAlertState({
      open: true,
      message: error,
      severity: "error",
      hideDuration: null
    })
    return (
      console.log("Unable to identify wallet public key")
    )
  }

  if (loading) {
    //let waiting = "Waiting for transaction....."
    //console.log(waiting)
    return (
        <Circles 
          width='50' 
          height='50' 
          color="purple"
          ariaLabel = "circles-loading"
          wrapperClass="items-center justify-center"
          wrapperStyle=""
          visible={true} />
    )
  }
  return(
    <>
      <div>
        {status === STATUS.Paid ? (
          <div className="text-center items-center text-sm sm:text-base">
            <Alert
              onClose={()=> {}}
              severity="success"
              iconMapping={{success: <CheckCircleOutlineIcon fontSize="inherit" />}}
              >
              Successful SOL Donaton
            </Alert>
          </div>
        ) : ( //solana-button-text flex items-center gap-x-1 text-base sm:text-lg font-bold px-2.5 py-1 text-center
            
            <div className="items-center justify-center flex">
              {/*()=> alert("Still in development")*/}
              <button disabled={loading} onClick = {processTransaction} className="solana-button-text bg-[#4e44ce] text-sm sm:text-base font-bold px-2.5 py-1 text-center">
                <p className="inline-block">Donate {price.split(".")[0]} {ticker}</p>
              </button>
            </div>
          
        )}
      </div>
      <div className="absolute flex mb-4 text-center items-center">
        <Snackbar
          open={alertState.open}
          autoHideDuration={
            alertState.hideDuration === undefined ? 6000 : alertState.hideDuration
          }
          onClose={() => setAlertState({ ...alertState, open: false })}
        >
          <Alert
            onClose={() => setAlertState({ ...alertState, open: false })}
            severity={alertState.severity}
          >
            {alertState.message}
          </Alert>

        </Snackbar>
      </div>
    </>
  )
}
export default function Donate({priceInfo}){
  const {id, fee, ticker} = priceInfo
  return (
    <div>
      {id === 1 &&
        <Buy priceID = {id} price={fee} ticker={ticker} />
      }
      {/*id === 2 &&
        <BuyUSD priceID = {id} price={fee} ticker={ticker} />*/
      }
    </div>
    
  );

}