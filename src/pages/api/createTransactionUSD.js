


//usdc token address in devnnet
//const usdcAddress = new PublicKey("Gh9ZwEmdLJ8DscKNTkTqPbNwLNNBjuSzaG9Vp2KGtKJr");

//usdc token address in mainnnet
const usdcAddress = new PublicKey("EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v");

const sellerAddress = () => {
  if (process.env.SELLER_ADDRESS === undefined){
    console.log
    return (alert("Recipient address to receive funds has not been declared"))
  }
  return process.env.SELLER_ADDRESS
}
const sellerPublicKey = new PublicKey(sellerAddress);
//Get paid in USDC
/*const createTransaction = async (req, res) => {
    try {
      const { buyer, orderID, itemID } = req.body;
      if (!buyer) {
        res.status(400).json({
          message: "Missing buyer address",
        });
      }
  
      if (!orderID) {
        res.status(400).json({
          message: "Missing order ID",
        });
      }
  
      const itemPrice = products.find((item) => item.id === itemID).price;
  
      if (!itemPrice) {
        res.status(404).json({
          message: "Item not found. please check item ID",
        });
      }
  
      const bigAmount = BigNumber(itemPrice);
      const buyerPublicKey = new PublicKey(buyer);
  
      const network = WalletAdapterNetwork.Devnet;
      const endpoint = clusterApiUrl(network);
      const connection = new Connection(endpoint);
  
      const buyerUsdcAddress = await getAssociatedTokenAddress(usdcAddress, buyerPublicKey);
      const shopUsdcAddress = await getAssociatedTokenAddress(usdcAddress, sellerPublicKey);
      const { blockhash } = await connection.getLatestBlockhash("finalized");
      
      // This is new, we're getting the mint address of the token we want to transfer
      const usdcMint = await getMint(connection, usdcAddress);
      
      const tx = new Transaction({
        recentBlockhash: blockhash,
        feePayer: buyerPublicKey,
      });
      
      // Here we're creating a different type of transfer instruction
      const transferInstruction = createTransferCheckedInstruction(
        buyerUsdcAddress, 
        usdcAddress,     // This is the address of the token we want to transfer
        shopUsdcAddress, 
        buyerPublicKey, 
        bigAmount.toNumber() * 10 ** (await usdcMint).decimals, 
        usdcMint.decimals // The token could have any number of decimals
      );
  
      // The rest remains the same :)
      transferInstruction.keys.push({
        pubkey: new PublicKey(orderID),
        isSigner: false,
        isWritable: false,
      });
  
      tx.add(transferInstruction);
  
      const serializedTransaction = tx.serialize({
        requireAllSignatures: false,
      });
  
      const base64 = serializedTransaction.toString("base64");
  
      res.status(200).json({
        transaction: base64,
      });
    } catch (err) {
      console.error(err);
  
      res.status(500).json({ error: "error creating transaction" });
      return;
    }
};*/