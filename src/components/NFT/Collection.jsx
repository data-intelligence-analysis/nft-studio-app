import React,{useState, useRef} from 'react';
import useRouter from 'next/router';
import Image from 'next/image';
import PageLayout from "../Layouts/PageLayout";

export default function Collection ({collection}) {
  //4 rows, 3 columns showing nfts
  const initialNftCount = 12;

  //states
  const [nftAccounts, setNftAccounts] = useState([]);
  const [displayedNftCount, setDisplayedNftCount] = useState(initialNftCount);

  /*useEffect(() => {
    const fetchNftAccounts = async () => {
        const accounts = await connectionRPC.getProgramAccounts(
            //token public key
            new PublicKey(process.env.NEXT_PUBLIC_METAHEAD_MINT_PUBLIC_KEY),
            {
                filters: [
                    {
                        memcmp: {
                            offset: 0,
                            bytes: mintPublicKey.toBase58(),
                        },
                    },
                ],
                encoding: 'jsonParsed',
            },
            { commitment: 'recent' },
        );
        setNftAccounts(accounts);
    };
    fetchNftAccounts();
  }, [connectionRPC, mintPublicKey]);*/
  
  //NFT Collection render
  const NFTCard = ({ account }) => {
    const { tokenAmount } = account.account.data.parsed.info
    const image = tokenAmount?.amount === '1' ? account.account.data.parsed.info?.uri : undefined;
    return (
      <div className="card rounded-md w-[240px] drop-shadow-md">
          {image && <Image src={image} alt="nftCards" height="200px" width="200px" placeholder='blur' style={{borderRadius:'6px'}} />}
          <div className="flex flex-col gap-2 justify-center items-center mt-2">
              <p>{account.pubkey.toBase58()}</p>
              <p>{tokenAmount?.amount}x {tokenAmount?.uiAmountString}</p>
          </div>
      </div>
    );
  }
  return (
    <div id="nftLayout" className="p-2 lg:p-4 sm:col-span-5 sm:col-start-4 lg:col-span-8 lg:col-start-5 place-items-center">
      <div id="nfts" className="mt-2" >
        {nftAccounts.slice(0, displayedNftCount).map((account, index) => (
            <NFTCard key={index} account={account} />
        ))}
      </div>
      <div className="my-4 flex flex-col items-center justify-center mx-auto w-full pointer-events-auto sm:text-base lg:text-lg text-sm font-sans font-bold">
        {/*<button onClick={() => setDisplayedNftCount(displayedNftCount + initialNftCount)}>View More</button>*/}
        <span className="my-8">Coming Sooon</span>
        <button disabled id="call-more-nfts" type="button" className="cursor-not-allowed rounded-xl p-2 px-4 border-2 border-indigo-700 hover:bg-slate-800">Load More</button>
      </div>
    </div>
  )
}