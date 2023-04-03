import React, { useEffect, useState } from "react";
import axios from "axios";
import { Circles } from "react-loader-spinner";
export default function PriceTracker () {
  //state
  const [solanaPrice, setSolanaPrice] = useState(null);
  const [bitcoinPrice, setBitcoinPrice] = useState(null);
  const [polygonPrice, setPolygonPrice] = useState(null);
  
  useEffect(() => {
    const fetchSolanaPrice = async () => {
      const response = await axios.get(
        "https://api.coingecko.com/api/v3/coins/solana"
      );
      setSolanaPrice(response.data.market_data.current_price.usd);
    };
    fetchSolanaPrice();
    
    const interval = setInterval(fetchSolanaPrice, 2000); // Update price every minute

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const fetchBitcoinPrice = async () => {
      const response = await axios.get(
        "https://api.coindesk.com/v1/bpi/currentprice.json"
      );
      setBitcoinPrice(response.data.bpi.USD.rate);
    };
    fetchBitcoinPrice();
    
    const interval = setInterval(fetchBitcoinPrice, 2000); // Update price every minute

    return () => clearInterval(interval);
  }, []);
  useEffect(() => {
    const fetchPolygonPrice = async () => {
      const response = await axios.get(
        "https://api.coingecko.com/api/v3/coins/matic-network"
      );
      setPolygonPrice(response.data.market_data.current_price.usd);
    };
    fetchPolygonPrice();
    
    const interval = setInterval(fetchPolygonPrice, 2000); // Update price every minute

    return () => clearInterval(interval);
  }, []);
  

  return (
    <div className="h-full">
      <div className="mmax-w-screen-2xl w-full">
        <section className="m-2 flex justify-center items-center text-sm font-sans">
          <div id="solana-price" className="p-2 px-4">
            {solanaPrice ? 
            (<p>SOL: <span className="inline-flex items-baseline text-orange-500 font-semibold">${solanaPrice}</span></p>):
            (
              <Circles 
                width='10' 
                height='10' 
                color="white"
                ariaLabel = "circles-loading"
                wrapperClass="items-center justify-center"
                visible={true} />
            )

            }
          </div>
          <div id="bitcoin-price" lassName="p-2 px-4">
            {bitcoinPrice ? 
              (<p>Bitcoin: <span className="inline-flex items-baseline text-orange-500 font-semibold">${bitcoinPrice}</span></p>):
              (
                <Circles 
                  width='10' 
                  height='10' 
                  color="white"
                  ariaLabel = "circles-loading"
                  wrapperClass="items-center justify-center"
                  visible={true} />
              )

              }
          </div>
          <div id="polygon-price" className="p-2 px-4">
            {polygonPrice ? 
              (<p>Polygon: <span className="text-orange-500 font-semibold">${polygonPrice}</span></p>):
              (
                <Circles 
                  width='10' 
                  height='10' 
                  color="white"
                  ariaLabel = "circles-loading"
                  wrapperClass="items-center justify-center"
                  visible={true} />
              )

              }
            </div>
        </section>
      </div>
    </div>
  )
}
