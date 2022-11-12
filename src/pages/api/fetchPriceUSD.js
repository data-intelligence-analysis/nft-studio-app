import priceFetch from "./priceusd.json";
//You'll note we're not taking the hashes! This is because we don't want to give viewers the hashes before they've paid for the items as they can just download them lol
export default function handler(req, res){
    //If get request
    if (req.method === "GET"){
        const priceSearch=priceFetch.map((price) =>{
            const {...rest} = price;
            return rest;
        });
        res.status(200).json(priceSearch);
    }else{
        res.status(405).send(`Method ${req.method} not allowed`)
    }
}