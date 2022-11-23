/* eslint-disable react/display-name */
import React, {useState, useEffect, useRef, forwardRef} from 'react'
import Image from 'next/image'
import MetaTedLogo from '../assets/ted_1.png'
import Link from 'next/link'
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import ogIcon from '../assets/og_icon.png'
import {
    WalletMultiButton
} from '@solana/wallet-adapter-react-ui';
import Linktree from '../assets/linktree-6.svg'
const NavBarElements =[
    {
        id: 0,
        name: <Image src={Linktree} alt='linktree' width="auto"/>,
        href: 'https://linktr.ee/metateds'
    },
    {
        id: 1,
        name: 'Home',
        href: '/'
    },
    {
        id: 2,
        name: 'Legion',
        href: '/legion'
        
    },
    {
        id: 3,
        name: 'Roadmap',
        href: '/roadmap'
    },
    {
        id: 4,
        name: 'Utility',
        href: '/utility'
    },
    {
        id: 5,
        name: 'Support',
        href: '/support'
    }

]

const NavBar = ({bgFormat, display}) => {
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
  return(
    
      <nav className={`fixed top-0 left-0 w-full z-20 ${bgFormat}`}>
        <div className="max-w-7xl w-full mx-auto px-2 py-3 flex items-center justify-between">
          
          <div className = "hidden h-10 justify-center sm:flex items-center p-2">
            <Link href = '/' passHref legacyBehavior>
              <Logo />
            </Link>
          </div>
          <a className="h-10 cursor-pointer justify-center hidden sm:flex items-center p-2 rounded" href={valURL(new URL("https://metateds-studio-3d.netlify.app"))? 'https://metateds-studio-3d.netlify.app' : ''} target="_blank" rel="noopener noreferrer">
            <div className="flex items-center p-2 h-10">
              <button className="rounded text-sm overflow-hidden bg-[#B27315] w-full py-1 px-4 hover:ring-indigo-500 hover:ring-4 font-bold font-display"
                onClick={()=> alert ('3D experience optimized for Desktop')} >
                3D Experience
              </button>
            </div>
          </a>
          <div className="flex items-center gap-x-1 pl-2" ref={ref}>
            <button className = "sm:hidden h-10 justify-center p-2 h-10 rounded text-indigo-500 font-bold hover:ring-4 bg-zinc-700 flex items-center cursor-pointer" onClick={toggleDropdown}>
              <Image src={ogIcon} alt="ted-og" width="21" height="25" style={{marginRight:'0.475rem'}}/> 
              <p className="font-bold font-display text-sm">Items</p>
            </button>
            {isOpen && 
              <ul className={"sm:hidden responsive-dropdown-list responsive-dropdown-list-active text-center items-center place-items-center"} aria-label="dropdown-list" role="menu" tabIndex="0" id="Dropdown">
                <li className="h-10 justify-center flex items-center p-2 pointer-cursor">
                  <Link href = '/' passHref legacyBehavior>
                    <Logo />
                  </Link>
                </li>
                <a href={valURL(new URL("https://metateds-studio-3d.netlify.app"))? 'https://metateds-studio-3d.netlify.app' : ''} target="_blank" rel="noopener noreferrer">
                  <li className="flex mx-auto text-center items-center p-2 h-10 rounded text-sm overflow-hidden bg-[#B27315] w-full py-1 px-4 hover:ring-indigo-500 hover:ring-4 font-bold font-display pointer-cursor" onClick={()=> alert ('3D experience optimized for Desktop')}>
                    3D Experience
                  </li>
                </a>
              </ul>
            }
          </div>
          <ul className={`${collapse ? 'navBarElements':''}`}></ul>
          <div className={`${display}flex items-center gap-x-1 p-2`}>
            <WalletMultiButton className="px-2 h-auto font-bold font-display py-2 transition-all duration-150 font-bold hover:ring-4 bg-indigo-700 pointer-cursor hover:bg-indigo-600 hover:ring-indigo-500" style={{background:"#4e44ce", height: "1.9rem", fontSize:"0.875rem", lineHeight: "1.25rem"}}/>
          </div>
          
          <div className="navBarElements text-base sm:text-2xl uppercase">
            {navBarElements.map((element, index) => (
              (<Link
                  href={element.href}
                  key={index}
                  legacyBehavior
                >
                <a className="navBarItems text-xl sm:text-2xl uppercase"onClick={closeNav}>{element.name}</a>
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
export default NavBar;

{/*
<nav className = {`nav_positioning uppercase nav_font_text ${bgFormat}`}>
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
      <ul className={`${collapse ? 'navBarElements':''}`}></ul>
      <div className = 'home_logo lg:relative'>
        <Link href = '/' passHref legacyBehavior>
          <Logo />
        </Link>
          
      </div> 
      
      <div className= 'nav_3d_btn_container' >
        {<a href={valURL(new URL("https://metateds-studio-3d.netlify.app"))? 'https://metateds-studio-3d.netlify.app' : ''} className='cursor-pointer w-full'>
            <button 
                className= 'cursor-pointer w-full app_btn'
                onClick={()=> alert ('3D experience optimized for Desktop')} >
                3D Experience
            </button>
        </a>}
      </div>
      <div className={`${display} w-[118px] sm:w-[125px] mx-1 mt-4 sm:mt-3 sm:mx-4 flex float-left justify-center text-center rounded-md gap-x-2 items-center bg-indigo-700 pointer-cursor`}>
        <WalletMultiButton className="h-auto max-w-xs font-bold hover:ring-4 text-[10px] text-xs hover:bg-indigo-600 hover:ring-indigo-500" style={{fontSize: '14px', height:"35px", paddingLeft: "10px", paddingRight:"10px", paddingTop:"5px", paddingBottom:"5px"}}/>
      </div>
      <div className = 'navBarElements'>
        {navBarElements.map((element, index) => (
          (<Link
              href={element.href}
              key={index}
              legacyBehavior
            >
            <a className="navBarItems" onClick={closeNav}>{element.name}</a>
          </Link>)
        ))}   
      </div>       
    </nav>
*/}