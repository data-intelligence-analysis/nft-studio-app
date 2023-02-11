/* eslint-disable react/display-name */
import React, {useState, useEffect, useRef, forwardRef} from 'react'
import Image from 'next/image'
import MetaTedLogo from '../assets/ted_1.png'
import Link from 'next/link'
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import ogIcon from '../assets/og_icon.png';
import {useRouter} from 'next/router';
import { SiLinktree } from 'react-icons/si';
import {
    WalletMultiButton
} from '@solana/wallet-adapter-react-ui';
//import Linktree from '../assets/linktree-6.svg'
//<Image src={Linktree} alt='linktree' width="auto"/>
const NavBarElements =[
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
      name: 'Metapix-DAO',
      href: '/metapix/dao',
    },
    {
      id: 4,
      name: 'Metapix-Free',
      href: '/metapix/service',
      /*target: '_blank',
      rel: "noreferrer noopener"
      */
    },

]

const MetaPixNavBar = ({bgFormat, opacity}) => {
  const [navBarElements] = useState(NavBarElements);
  //React Hooks
  const [collapse, setCollapse] = useState(false)
  const [isOpen, setIsOpen] = useState(false);

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
      <a href={href} ref={ref} className='h-10 rounded-md flex items-center p-1'>
        <Image
          height = 'auto'
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
  return (
    <nav className={`fixed top-0 left-0 w-full z-30 ${bgFormat} ${opacity} meatapix-navbar-shadow`}>
      <div className="max-w-screen-2xl w-full mx-auto px-2 py-2 flex items-center justify-between">
        <div className = "hidden h-10 justify-center items-center p-2">
          <Link href='/' passHref legacyBehavior>
            <Logo />
          </Link>
        </div>
        <a className="h-10 cursor-pointer justify-center hidden items-center p-2 rounded font-sans" href={valURL(new URL("https://metateds-studio-3d.netlify.app"))? 'https://metateds-studio-3d.netlify.app' : ''} target="_blank" rel="noreferrer">
          <div className="flex items-center p-2 h-10">
            <button className="rounded text-sm overflow-hidden bg-[#B27315] w-full py-1 px-4 hover:ring-indigo-500 hover:ring-4 font-bold font-display"
              onClick={()=> alert ('3D experience optimized for Desktop')} >
              3D Experience
            </button>
          </div>
        </a>
        <div className="flex items-center gap-x-1 pl-2 font-sans" ref={ref}>
          <button className = "h-10 justify-center p-2 h-10 rounded text-indigo-50 font-bold hover:ring-4 bg-slate-900 flex items-center cursor-pointer" onClick={toggleDropdown}>
            <Image src={ogIcon} alt="ted-og" width="21" height="auto" style={{marginRight:'0.475rem'}}/> 
            <p className="font-bold font-sans text-xs">Items</p>
          </button>
          {isOpen && 
            <ul className={"responsive-dropdown-metapix-list responsive-dropdown-list-active text-center items-center place-items-center bg-indigo-900"} aria-label="dropdown-list" role="menu" tabIndex="0" id="Dropdown">
              <li className="h-10 justify-center flex items-center p-2 pointer-cursor">
                <Link href = '/' passHref legacyBehavior>
                  <Logo />
                </Link>
              </li>
              <a href={valURL(new URL("https://metateds-studio-3d.netlify.app"))? 'https://metateds-studio-3d.netlify.app' : ''} target="_blank" rel="noopener noreferrer">
                <li className="flex mx-auto text-center items-center p-2 h-10 rounded text-sm overflow-hidden bg-[#4e44ce] w-full py-1 px-4 hover:ring-indigo-500 hover:ring-4 font-bold font-display pointer-cursor" onClick={()=> alert ('3D experience optimized for Desktop')}>
                  <p className="font-sans text-xs">3D Experience</p>
                </li>
              </a>
              <li className="h-full justify-center flex items-center p-2 pointer-cursor font-sans">
                <WalletMultiButton className=" font-bold font-display transition-all duration-150 font-bold hover:ring-4 bg-indigo-700 pointer-cursor hover:bg-indigo-600 hover:ring-indigo-500" style={{background:"#4e44ce", width:'100%', height: "2.5rem", fontSize:"0.8rem", lineHeight: "1.25rem", fontFamily:"Press Start 2P"}} />
              </li>
              <Link href='/' passHref legacyBehavior>
                <a target="_blank" rel="noopener noreferrer">
                  <li className="flex mx-auto text-center items-center p-2 h-10 rounded text-sm overflow-hidden bg-[#4e44ce] w-full py-1 px-4 hover:ring-indigo-500 hover:ring-4 font-bold font-display pointer-cursor">
                    <p className="font-sans text-xs">Metateds Studio</p>
                  </li>
                </a>
              </Link>
            </ul>
          }
        </div>
        <ul className={`${collapse ? 'navBarMetaPix':''}`}></ul>
        <div className={`items-center gap-x-1 p-2 font-sans hidden`}>
          <WalletMultiButton className="px-2 h-auto font-bold font-display py-2 transition-all duration-150 font-bold hover:ring-4 bg-indigo-700 pointer-cursor hover:bg-indigo-600 hover:ring-indigo-500" style={{background:"#4e44ce", height: "1.9rem", fontSize:"0.875rem", lineHeight: "1.25rem"}}/>
        </div>
        
        <div className={`navBarMetaPix ${bgFormat} text-base sm:text-2xl uppercase`}>
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
        </button>
      </div>
    </nav>
  )
}
export default MetaPixNavBar