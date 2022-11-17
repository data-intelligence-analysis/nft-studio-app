import priceFetch from "./price.json";
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