import { SideBar } from '../SideBar';
import UserNFTApp from '../NFT/UserNFTApp'
import { ArrowUpLeftIcon } from '@heroicons/react/24/solid'
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import SelectWalletHelper from './SelectWalletHelper'
export default function PageLayout({
  children,
  collection,
  pathname
}){

  const wallet = useWallet();
  const { publicKey } = useWallet();
  return (
    <div>
      {!wallet.connected && !wallet.publicKey ? (<SelectWalletHelper />):(null)}
      <UserNFTApp 
          collection={collection} />
      <div id="grid layout" className="text-slate-100 relative mt-5 w-full gap-2 grid sm:grid-cols-8 lg:grid-cols-13">
        <SideBar 
          collection1="Metahead"
          collection2="Metated"
          pathname={pathname} />
        {children}
      </div>
    </div>
  )
}