import { SideBar } from '../SideBar';
import UserNFTApp from '../NFT/UserNFTApp'
export default function PageLayout({
  children,
  collection,
  pathname
}){
  return (
    <div>
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