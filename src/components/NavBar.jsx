/* eslint-disable react/display-name */
import {useState, React, forwardRef} from 'react'
import Image from 'next/image'
import MetaTedLogo from '../assets/ted_1.png'
import Link from 'next/link'
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';


const NavBarElements =[
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
    /*{
        id: 5,
        name: 'Gaming',
        href: '/gaming'
    },*/
    {
        id: 6,
        name: 'Support',
        href: '/support'
    }

]

const NavBar = ({bgFormat}) => {
    const [navBarElements] = useState(NavBarElements);
    //React Hooks
    const [collapse, setCollapse] = useState(false)
    const toggleNav = () => {
        setCollapse(prev => !prev)
    }
    const closeNav = () => {
        setCollapse(false)
    }
    //Security measure to validate urls
    function valURL(url) {
      const parsed = url
      return ['https:', 'http:'].includes(parsed.protocol)
    }
    const Logo = forwardRef(({ href }, ref) => {
      return (
        <a href={href} ref={ref} className='nav_logo'>
          <Image
            height = {60}
            width = {60}
            alt = "MetaTeds Logo"
            src = {MetaTedLogo}
            style = {{borderRadius: '15px', overflow: 'hidden'}}
          />
        </a>
      )
    })
    return <>
      <nav className = 
          {`nav_positioning uppercase nav_font_text ${bgFormat}`} 
          >
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
          <div className = 'home_logo'>
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
          <div className = 'navBarElements'>
              {navBarElements.map((element, index) => (
                  (<Link
                      href={element.href}
                      key={index}
                      className ='navBarItems'
                      onClick={closeNav}>

                      {element.name}

                  </Link>)
              ))}   
          </div>       
      </nav>
        
    </>;
}
export default NavBar;
