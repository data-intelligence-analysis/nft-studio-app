import products from "./products.json";
//You'll note we're not taking the hashes! This is because we don't want to give viewers the hashes before they've paid for the items as they can just download them lol
export default function handler(req, res){
    //If get request
    if (req.method === "GET"){
        const productsNoHashes=products.map((product) =>{
            const { hash, filename, ...rest } = product;
            return rest;
        });
        res.status(200).json(productsNoHashes);
    }else{
        res.status(405).send(`Method ${req.method} not allowed`)
    }
}