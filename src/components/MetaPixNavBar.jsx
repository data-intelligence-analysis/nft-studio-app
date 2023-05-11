/* eslint-disable react/display-name */
import React, {useState, useEffect, useRef, forwardRef} from 'react'
import Image from 'next/image'
import MetaTedLogo from '../assets/ted512.png'
import Link from 'next/link'
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import ogIcon from '../assets/og_icon.png';
import {useRouter} from 'next/router';
import { SiLinktree } from 'react-icons/si';
import {
    WalletMultiButton
} from '@solana/wallet-adapter-react-ui';
import { IconContext } from "react-icons";
import { HomeIcon, UserIcon, MapIcon, CogIcon, InformationCircleIcon, 
          BuildingLibraryIcon, CloudArrowDownIcon, WrenchIcon, PhotoIcon, PuzzlePieceIcon, GlobeAltIcon, RocketLaunchIcon } from '@heroicons/react/24/solid'

/*const NavBarElements =[
    {
      id: 0,
      name: <SiLinktree />,
      href: '/links',
      target: '_blank',
      rel : "noreferrer noopener"
    },
    {
      id: 1,
      name: 'Home',
      href: '/metapix'
        
    },
    {
      id: 2,
      name: 'MetaTed Studio',
      href: '/',
      target: '_blank',
      rel : "noreferrer noopener"
      
    },
    {
      id: 3,
      name: 'DAO',
      href: '/metapix/dao',
    },
    {
      id: 4,
      name: 'Community',
      href: '/metapix/service',
      //target: '_blank',
      //rel: "noreferrer noopener"
    }
]*/


const NavBarElements =[
  {
      id: 0,
      name: 'Linktree',
      icon: <IconContext.Provider value={{ color: "orange", size: "2em", className: "global-class-name" }} ><div><SiLinktree /></div></IconContext.Provider>,
      href: 'https://linktr.ee/metateds',
      target: '_blank',
      rel: "noreferrer noopener"
  },
  {
      id: 1,
      name: 'Learn More',
      href: 'https://metated-labs.gitbook.io/metated-labs/',
      target: '_blank',
      rel: "noreferrer noopener",
      icon: <CogIcon className= "text-[#EAA640] h-6 w-6"/>
  },
  {
      id: 2,
      name: 'MetaPix Studio',
      href: '/metapix',
      icon: <BuildingLibraryIcon className= "text-[#EAA640] h-6 w-6"/>
  },
  {
      id: 3,
      name: 'MetaPix App',
      href: '/metapix/dao',
      icon: <BuildingLibraryIcon className= "text-[#EAA640] h-6 w-6"/>
  },
  {
      id: 4,
      name: 'NFT Studio',
      href: '/',
      icon: <HomeIcon className= "text-[#EAA640] h-6 w-6"/>
  },
  {
      id: 5,
      name: 'Team',
      href: '/team',
      icon: <UserIcon className= "text-[#EAA640] h-6 w-6"/>  
  },
  {
      id: 6,
      name: 'Roadmap',
      href: '/roadmap',
      icon: < MapIcon className= "text-[#EAA640] h-6 w-6"/>,
  },
  {
      id: 7,
      name: 'Utility',
      href: '/utility',
      icon: <CogIcon className= "text-[#EAA640] h-6 w-6"/>
  },
  {
      id: 8,
      name: 'Support',
      href: '/support',
      icon: <InformationCircleIcon className= "text-[#EAA640] h-6 w-6"/>
  },
  {
      id: 9,
      name: 'Games',
      icon: <PuzzlePieceIcon className= "text-[#EAA640] h-6 w-6"/>,
      href: 'https://metateds.com/gaming',
      target: '_blank',
      rel: "noreferrer noopener",
  },
  {
      id: 10,
      name: 'MetaHead Gallery',
      icon: <PhotoIcon className= "text-[#EAA640] h-6 w-6"/>,
      href: '/gallery/metahead',
  },
  {
      id: 11,
      name: 'MetaTed Gallery',
      icon: <PhotoIcon className= "text-[#EAA640] h-6 w-6"/>,
      href: '/gallery/metated',
  },
  {
      id: 12,
      name: 'Studio Mint',
      icon: <RocketLaunchIcon className= "text-[#EAA640] h-6 w-6"/>,
      href: 'https://metateds.com/studio',
      target: '_blank',
      rel: "noreferrer noopener",
  },
  
  /*{
      id: 10,
      name: 'Metapix Free Services',
      href: '/metapix/community',
      icon: <WrenchIcon className= "text-[#EAA640] h-6 w-6"/>
  },
  {
      id: 11,
      name: 'Minting Services',
      href: '/mint',
      icon: <GlobeAltIcon className= "text-[#EAA640] h-6 w-6"/>
  },*/

]
const MetaPixNavBar = ({bgFormat, opacity}) => {
  const [navBarElements] = useState(NavBarElements);
  //React Hooks
  const [collapse, setCollapse] = useState(false)
  const [isOpen, setIsOpen] = useState(false);
  const [walletNavBtn, setWalletNavBtn] = useState(false)
  const [modalWalletNavBtn, setModalWalletNavBtn] = useState(false)

  const toggleDropdown = () => {
    setIsOpen(!isOpen)
  }
  const ref = useRef();
  const toggleNav = () => {
      setCollapse(prev => !prev)
  }
  const closeNav = () => {
      setCollapse(false)
  }
  //Security measure to validate external site urls
  function valURL(url) {
    const parsed = url
    return ['https:', 'http:'].includes(parsed.protocol)
  }
  const Logo = forwardRef(({ href }, ref) => {
    return (
      <a href={href} ref={ref} className='h-10 rounded-md flex items-center p-1 cursor-pointer'>
        <Image
          height = {45}
          width = {50}
          alt = "MetaTeds Logo"
          src = {MetaTedLogo}
          style = {{borderRadius: '12px', marginRight: '0.5rem', overflow: 'hidden'}}
        />
      </a>
    )
  })
  useEffect(() => {
    const HandleClickOutside = (e) => {
      // check if element that was clicked is inside of ref'd component
      // if so no action is required from this event listener so exit
      if (ref.current && ref.current.contains(e.target)){
        return;
      }
      // else close the dropdown
      setIsOpen(false)
      
    }
    document.body.addEventListener("click", HandleClickOutside)
    // CLEANUP
    // remove event listener
    return () => {
      document.body.removeEventListener("click", HandleClickOutside)
    }

  },[]);
  useEffect(() => setWalletNavBtn(
    <WalletMultiButton 
      className="px-2 h-auto font-bold font-display py-2 transition-all duration-150 font-bold hover:ring-4 bg-indigo-700 cursor-pointer hover:bg-indigo-600 hover:ring-indigo-500" 
      style={{background:"#4e44ce",
              height: "1.9rem", 
              fontSize:"0.875rem", 
              lineHeight: "1.25rem"}}
    />
                ), 
      [])

  useEffect(() => setModalWalletNavBtn(
    <WalletMultiButton className="font-bold font-display transition-all duration-150 font-bold hover:ring-4 bg-indigo-700 cursor-pointer hover:bg-indigo-600 hover:ring-indigo-500" 
      style={{background:"#4e44ce", 
              width:'100%', 
              height: "2.5rem", 
              fontSize:"0.8rem", 
              lineHeight: "1.25rem"}}
    />
),[])
  return (
    <nav className={`fixed top-0 left-0 w-full z-30 ${bgFormat} ${opacity} meatapix-navbar-shadow`}>
      <div className="max-w-screen-2xl w-full mx-auto px-2 py-1 flex items-center justify-between">
        {/*<div className = "hidden h-10 justify-center items-center p-2">
          <Link href='/' passHref legacyBehavior>
            <a className='h-10 rounded-md flex items-center p-1'>
              <Logo />
            </a>
          </Link>
        </div>
        <a className="h-10 cursor-pointer justify-center hidden items-center p-2 rounded font-sans" href={valURL(new URL("https://metateds-studio-3d.netlify.app"))? 'https://metateds-studio-3d.netlify.app' : ''} target="_blank" rel="noreferrer">
          <div className="flex items-center p-2 h-10">
            <button className="rounded text-sm overflow-hidden bg-[#B27315] w-full py-1 px-4 hover:ring-indigo-500 hover:ring-4 font-bold font-display"
              onClick={()=> alert ('3D experience optimized for Desktop')} >
              3D Experience
            </button>
          </div>
        </a>*/}
        <div className="flex items-center gap-x-1 pl-2 font-sans" ref={ref}>
          <button className = "h-10 justify-center p-2 h-10 rounded text-indigo-50 font-bold hover:ring-4 bg-slate-900 flex items-center cursor-pointer" onClick={toggleDropdown}>
            <Image src={ogIcon} alt="ted-og" width="21" height="auto" style={{marginRight:'0.475rem'}}/> 
            <p className="font-bold font-sans text-xs">Items</p>
          </button>
          {isOpen && 
            <ul className={"responsive-dropdown-metapix-list responsive-dropdown-list-active text-center items-center place-items-center bg-indigo-900"} aria-label="dropdown-list" role="menu" tabIndex="0" id="Dropdown">
              <li className="h-10 justify-center flex items-center p-2 cursor-pointer">
                <Link href = '/' passHref legacyBehavior>
                  <a className='h-10 rounded-md flex items-center p-1'>
                    <Logo />
                  </a>
                </Link>
              </li>
              <a href={valURL(new URL("https://metateds-studio-3d.netlify.app"))? 'https://metateds-studio-3d.netlify.app' : ''} target="_blank" rel="noopener noreferrer">
                <li className="flex mx-auto text-center items-center p-2 h-10 rounded text-sm overflow-hidden bg-[#4e44ce] w-full py-1 px-4 hover:ring-indigo-500 hover:ring-4 font-bold font-display cursor-pointer" onClick={()=> alert ('3D experience optimized for Desktop')}>
                  <p className="font-sans text-xs">3D Experience</p>
                </li>
              </a>
              <li className="h-full justify-center flex items-center p-2 cursor-pointer font-sans">
                {modalWalletNavBtn}
              </li>
              <Link href='/' passHref legacyBehavior>
                <a target="_blank" rel="noopener noreferrer">
                  <li className="flex mx-auto text-center items-center p-2 h-10 rounded text-sm overflow-hidden bg-[#4e44ce] w-full py-1 px-4 hover:ring-indigo-500 hover:ring-4 font-bold font-display cursor-pointer">
                    <p className="font-sans text-xs">Metateds Studio</p>
                  </li>
                </a>
              </Link>
            </ul>
          }
        </div>
        {/*<ul className={`${collapse ? 'navBarMetaPix':''}`}></ul>*/}
        <div className={`sm:flex items-center gap-x-1 p-2 font-sans hidden`}>
          {walletNavBtn}
          {/*<WalletMultiButton className="px-2 h-auto font-bold font-display py-2 transition-all duration-150 font-bold hover:ring-4 bg-indigo-700 cursor-pointer hover:bg-indigo-600 hover:ring-indigo-500" style={{background:"#4e44ce", height: "1.9rem", fontSize:"0.875rem", lineHeight: "1.25rem"}}/>*/}
        </div>
        
        {/*<div className={`navBarMetaPix ${bgFormat} text-base sm:text-2xl uppercase`}>
          {navBarElements.map((element, index) => (
            (<Link
                href={element.href}
                key={index}
                legacyBehavior
              >
              <a className="navBarItems text-xs sm:text-lg uppercase font-sans"onClick={closeNav} target={element.target} rel={element.rel}>{element.name}</a>
            </Link>)
          ))} 
        </div>
        <button className='navBar_btn' onClick={toggleNav}>
          {collapse ? 
            (
              <CloseIcon sx={{
                      width: 55,
                      height: 40,
                  }}
              />
            ):
            (
              <MenuIcon 
                  sx={{
                      width: 55,
                      height: 40,
                  }}
              />
            )}
        </button>*/}
        <div className="flex items-center gap-x-1 m-1 pl-4 font-sans">
          <button className = "p-2 items-center" 
              onClick={toggleNav} > 
            <MenuIcon 
                  sx={{
                      width: 55,
                      height: 40,
                  }}
              />
          </button>
        </div> 
        {collapse &&
          <div className={`absolute inset-0 h-screen w-full ${bgFormat} z-50 overflow-auto`}>
            <div className="p-6 lg:p-8 mx-auto max-w-screen-xl mb-10">
              <div className="flex justify-between items-center">
                <div className="items-center h-50 p-2">
                  <Link href='/' passHref legacyBehavior>
                    <Logo />
                  </Link>
                </div>
                <button className="font-semibold hover:outline hover:outline-2 hover:outline-offset-1 hover:outline-indigo-600 cursor-pointer p-2 rounded-md " onClick={toggleNav}>
                  <CloseIcon sx={{
                          width: 55,
                          height: 40,
                      }}
                  />
                </button>
              </div>
              <div className="mt-2 flex flex-col gap-y-px">
                {navBarElements.map((element, index) => (
                    (<Link 
                      href={element.href}
                      key={index}
                      legacyBehavior>
                      <a className="text-sm flex items-center px-3 py-2 border border-[#EAA640] hover:bg-zinc-800 rounded-md text-black bg-indigo-800 mt-4" onClick={closeNav} target={element.target} rel={element.rel}>
                        {element.icon}
                        <div className="flex flex-col px-3">
                          <p className="font-bold font-display text-[#EAA640]">{element.name}</p>
                        </div>
                        <p></p>
                      </a>
                    </Link>)
                ))}
              </div>
            </div>
          </div>
        }
      </div>
    </nav>
  )
}
export default MetaPixNavBar