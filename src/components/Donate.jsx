import React, { useState, useMemo, useEffect } from "react";
import { Keypair, Transaction } from "@solana/web3.js";
import { findReference, FindReferenceError } from "@solana/pay";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { InfinitySpin } from "react-loader-spinner";
import { addOrder, hasPurchased} from "../api";

//confirming transactions are sent - turn transactions to payments
const STATUS = {
  Initial: "Initial",
  Submitted: "Submitted",
  Paid: "Paid"
}

export default function Donate(){
  const { connection } = useConnection();
  const { publicKey, sendTransaction } = useWallet();
  const orderID = useMemo(() => Keypair.generate().publicKey, []);// Public key used to identify the order


  const [item, setItem] = useState(null);
  const [status, setStatus] = useState(STATUS.Initial);

  const [loading, setLoading] = useState(false); // Loading state of all above

  // useMemo is a React hook that only computes the value if the dependencies change
  const order = useMemo(
    () => ({
      buyer: publicKey.toString(),
      orderID: orderID.toString(),
    }),
    [publicKey, orderID]
  );

  // Fetch the transaction object from the server 
  const processTransaction = async () => {
    setLoading(true);
    const txResponse = await fetch("../api/createTransactionSOL", {
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
      const purchased = await hasPurchased(publicKey);
      if (purchased) {
        setStatus(STATUS.Paid);
        console.log("Address has already purchased this item!");
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
                  clearInterval(interval);
                  setStatus(STATUS.Paid);
                  setLoading(false);
                  addOrder(order)
                  alert("Thank you for your purchase!");
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
    if (status === STATUS.Paid){
        console.log("Payment has been sucessfully sent")
    }
  }, [status]);    
}