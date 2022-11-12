import React, { useState, useMemo, useEffect, useRef} from "react";
import { Keypair, Transaction } from "@solana/web3.js";
import { findReference, FindReferenceError } from "@solana/pay";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { Circles } from "react-loader-spinner";
import { addOrder, hasPurchased} from "../../api";
import { Snackbar } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import Stack from '@mui/material/Stack';
//confirming transactions are sent - turn transactions to payments
const STATUS = {
  Initial: "Initial",
  Submitted: "Submitted",
  Paid: "Paid"
}

const Buy = ({priceID, price}) => {

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
  
  // Fetch the transaction object from the server 
  const processTransaction = async () => {
    setLoading(true);
    const txResponse = await fetch("../api/createTransactionsol", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(order),
    });

    const txData = await txResponse.json();
      
    // We create a transaction object
    const tx = Transaction.from(Buffer.from(txData.transaction, "base64"));
    console.log("Tx data is", tx);
    
    // Attempt to send the transaction to the network
    try {
      // Send the transaction to the network
      const txHash = await sendTransaction(tx, connection);
      console.log(`Transaction sent: https://solscan.io/tx/${txHash}?cluster=devnet`);
      // Even though this could fail, we're just going to set it to true for now
      setStatus(STATUS.Submitted)
    } catch (error) {
      let message = error.msg || "Minting failed! Please try again!";
      if (!error.msg){
        if (!error.message){
          message="Transaction timeout! Please try again."
        } else if (error.message.indexOf("0x135")){
          message = `Insufficient funds to mint. Please fund your wallet.`;

        } 
      }
      //console.error(error);
      setAlertState({
        open: true,
        message,
        severity: "error",
      });
    } finally {
      setLoading(false);
    }

  };
  useEffect(() => {
    // Check if this address has already purchased this item
    // If so, fetch the item and set paid to true
    // Async function to avoid blocking the UI
    async function checkPurchased() {
      const purchased = await hasPurchased(publicKey);
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
  }, [publicKey]);
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
            }finally {setLoading(false);}

        }, 1000); //1 seconds
        return () => {
          clearInterval(interval)
        };
    }
    /*if (status === STATUS.Paid){
        let success = "Transaction Successful"
        setAlertState({
          open: true,
          message: success,
          severity: "success",
          hideDuration: null
        })
        console.log(success)
    }*/
  }, [status]);
  
  if (!publicKey){
    let error = "Connect wallet to make transaction "
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
    let waiting = "Waiting for transaction....."
    console.log("Waiting for transaction.....")
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
          <div className="bottom-0 text-center items-center">
            <Alert
              onClose={()=> {}}
              severity="success"
              iconMapping={{success: <CheckCircleOutlineIcon fontSize="inherit" />}}
              >
              Transaction successful
            </Alert>
          </div>
          
        ) : (
          <button disabled={loading} onClick = {processTransaction} className="solana-button-text items-center text-lg sm:text-base font-bold px-2.5 py-1">
              Donate {price.slice(0,1)} SOL
          </button>
        )}
      </div>
      <div className="bottom-0 text-center items-center">
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
export default function Donatesol({priceInfo}){
  const {id, name, fee, description} = priceInfo
  return (
    <>
      <Buy priceID = {id} price={fee} />
    </>
    
  );

}