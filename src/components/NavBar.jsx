import {useState, React, forwardRef} from 'react'
/*import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';*/
import Image from 'next/image'
//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
//import { solid } from '@fortawesome/fontawesome-svg-core/import.macro' // <-- import styles to be used
import MetaTedLogo from '../assets/ted_1.png'
import Link from 'next/link'
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import styles from '../styles/NavBar.module.css';


const NavBarElements =[
    {
        id: 1,
        name: 'Home',
        href: '/'
    },
    /*{
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
    },*/
    {
        id: 5,
        name: 'Gaming',
        href: '/gaming'
    },
    {
        id: 6,
        name: 'Support',
        href: '/support'
    }

]

const NavBar = () => {
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
        <a href={href} ref={ref} className={styles.nav_logo}>
          <Image
            height = {60}
            width = {60}
            alt = "MetaTeds Logo"
            src = {MetaTedLogo}
            layout = "intrinsic"
            style = {{borderRadius: '15px', overflow: 'hidden'}}
          />
        </a>
      )
    })
    return (
      <>
        <nav className = 
            {`${styles.nav_positioning} 
              ${styles.nav_font_weight} 
              ${styles.nav_font_text} bg-transparent`} 
            >
            <button className={styles.navBar_btn} onClick={toggleNav}>
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
            <ul className={`${collapse ? styles.navBarElements:""}`}></ul>
            <div className = {`${styles.home_logo}`}>
                <Link href = '/' passHref legacyBehavior>
                  <Logo />
                </Link>
                
            </div> 
            
            <div className= {`${styles.nav_3d_btn_container}`} >
                {<a href={valURL(new URL("https://metateds-studio-3d.netlify.app"))? 'https://metateds-studio-3d.netlify.app' : ''} className={`${styles.pointer} ${styles.w_btn}`}>
                    <button 
                        className= {`${styles.pointer} ${styles.w_btn} ${styles.app_btn}`}
                        onClick={()=> alert ('3D experience optimized for Desktop')} >
                        3D Experience
                    </button>
                </a>}
            </div>
            <div className = {`${styles.navBarElements} ${styles.hidden}`} >
                {navBarElements.map((element, index) => (
                    <Link href={element.href} key={index}>
                        <a className ={styles.navBarItems} key={index} onClick={closeNav}>
                            {element.name}
                        </a>
                    </Link>
                ))}   
            </div>       
        </nav>
          
      </>
    )
}
export default NavBar;
