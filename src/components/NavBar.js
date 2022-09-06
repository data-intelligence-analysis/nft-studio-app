import {useState, React} from 'react'
/*import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';*/
import Image from 'next/image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro' // <-- import styles to be used
import MetaTedLogo from '../assets/ted_1.png'
import Link from 'next/link'
/*import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';*/
import styles from '../styles/NavBar.module.css';
import '../styles/NavBar.module.css'

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

const NavBar = ({setShow3dApp}) => {
    const [navBarElements] = useState(NavBarElements);
    /*const changeStyle = (index) => {
        console.log("you just clicked");
        setActiveNavBarElement(index);
        if(index === activeNavBarElement){
            return setStyle("navbar-border-bottom");
        }
        return ""; 
    };*/
    /*const hamburgerButton = () => (
        <div className="hamburger-button">
        </div>
    );*/
    /*const toggle3D = () => {
        setShow3dApp(true);
    }*/
    return (
        <>
            <nav className = 
                    {`${styles.nav_positioning} ${styles.nav_font_weight} ${styles.nav_font_text}`} >
                {/*<input type="checkbox" id="check" />*/}
                {/*<label htmlFor ="check">
                
                    <i className= "hamburger" id="btn">
                        <FontAwesomeIcon icon={solid('bars')} />
                    </i>
                    <i className="cross" id="cancel">
                        <FontAwesomeIcon icon={solid('xmark')} />
                    </i>
                </label>*/}
                <div className = {`${styles.home_logo}`} style={{borderRadius: '25px', overflow: 'hidden'}}>
                    <Link href = '/'>
                        <Image
                            height = {60}
                            width = {60}
                            alt = "MetaTeds Logo"
                            src = {MetaTedLogo}
                            layout = "intrinsic"
                        />
                    </Link>
                    
                </div> 
                
                <div className= {`${styles.nav_3d_btn_container} ${styles.pd_l_3}`} >
                    <a href="https://metateds-studio-3d.netlify.app" className={`${styles.pointer} ${styles.w_btn}`}>
                        <button className= {`${styles.pointer} ${styles.w_btn} ${styles.app_btn}` } >
                            Toggle to 3D
                        </button>
                    </a>
                </div>
                <div className = {`${styles.navBarElements} ${styles.hidden}`} >
                    {navBarElements.map((element, index) => (
                        <Link href={element.href} key={index} >
                            <a className ={styles.navBarItems} key={index}  href={element.href}>
                                {element.name}
                            </a>
                        </Link>
                    ))}   
                </div>
                
                
                
                {/*<div className = "items-center justify-start flex width-auto">
                    <a href = "/">
                        <img 
                            src = {MetaTedLogo} 
                            className = "navBarLogo" 
                            alt = "MetaTedLogo" 
                        />
                    </a>
                </div>
                {/*Build the donut styling for mobile*/}
                {/*<div className = "">
                    <button className ="inline-flex items-center justify-center rounded-md padding-2 white-text bg-transparent"
                            type="button"
                            aria-controls="mobile-menu"
                            aria-expanded="false"
                    >
                        <svg class="block height-7 width-7 bg-transparent"
                            xlmns="http://www.w3.org/2000/svg"
                            fill="none" viewbox="0 0 24 24" 
                            stroke="currentColor"
                            aria-hidden="true"
                        >
                            <path stroke-linecap="round" 
                                stroke-linejoin="round" 
                                stroke-width="2" 
                                d="M4 6h16M4 12h16M4 18h16">
                                d="M6 18l18 6M6 6l12 12"
                            </path>
                        </svg>
                    </button>
                </div>
                */}
                    
            </nav>
            {/*<Outlet />*/}
            
        </>
    )
}

export default NavBar;
