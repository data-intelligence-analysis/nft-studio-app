import React, {useMemo, useEffect, useState} from 'react'
import {FaPaypal} from "react-icons/fa";
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import { Circles } from "react-loader-spinner";
export default function PayPal() {

  //paypal states
  const [succeeded, setSucceeded] = useState(false);
  const [paypalErrorMessage, setPaypalErrorMessage] = useState("");
  const [orderID, setOrderID] = useState(false);
  const [billingDetails, setBillingDetails] = useState("");
  // usePayPalScriptReducer can be use only inside children of PayPalScriptProviders
    // This is the main reason to wrap the PayPalButtons in a new component
  const [{ options, isPending }, dispatch] = usePayPalScriptReducer();

  /*Paypal Functions*/
  const PayPalamt = "35"
  const PayPalcurrency = "USD"
  const PayPalstyle = {
    color: "blue",
    shape: "pill",
    label: "pay",
    tagline: false,
    layout: "vertical",
    label: "donate"
  }
  //create paypal order
  const createDonateOrder = (data, actions) => {
    return actions.order
        .create({
            purchase_units: [
                {
                    amount: {
                        value: PayPalamt,
                        breakdown: {
                            item_total: {
                                currency_code: "USD",
                                value: PayPalamt,
                            },
                        },
                    },
                    items: [
                        {
                            name: "donation-example",
                            quantity: "1",
                            unit_amount: {
                                currency_code: "USD",
                                value: PayPalamt,
                            },
                            category: "DONATION",
                        },
                    ],
                },
            ],
        })
        .then((orderID) => {
            // Your code here after create the donation
            setOrderID(orderID);
            return orderID;
        });
  }
  const createPayPalOrder = (data, actions) => {
    return actions.order
            .create(
              {
                purchase_units: [
                  {
                    amount: {
                      //price charged per order
                      currency_code: PayPalcurrency, 
                      value: PayPalamt
                    }
                  }
                ],
                application_context: {
                  shipping_preference: "NO_SHIPPING"
                },
              }
            )
            .then((orderID) => {
              setOrderID(orderID);
              return orderID;
            })
  }
  //run when paypal payment is approved
  const onApprove = (data, actions) => {
    return actions.order.capture().then(function (details){
      const {payer} = details;
      setBillingDetails(payer, details);
      setSucceeded(true);
    }).catch(err=> setPaypalErrorMessage("Something went wrong"))
  };

  useEffect(() => {
    dispatch({
        type: "resetOptions",
        value: {
            ...options,
            currency: PayPalcurrency,
        },
    });
  }, [PayPalcurrency]);
  return (
    <div className="my-5 flex items-center justify-center sm:mt-10">
      {isPending ? 
      (<Circles 
          width='50' 
          height='50' 
          color="purple"
          ariaLabel = "circles-loading"
          wrapperClass="items-center justify-center p-2"
          wrapperStyle=""
      visible={true} />): (null)}
        <div className="z-10">
          <PayPalButtons
              disabled={false}
              fundingSource="paypal"
              //forceReRender={[PayPalamt, PayPalcurrency, PayPalstyle]}
              style={PayPalstyle}
              createOrder={createDonateOrder}
              //onApprove={onApprove}
          />
        </div>
    </div>
  )
}
