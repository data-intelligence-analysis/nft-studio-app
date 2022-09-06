import {React, useState} from 'react'
import twitter from '../assets/twitter.svg'
/*import github from '../assets/github.svg'*/
import discord from '../assets/discord.svg'
import solsurfer from '../assets/solsurfer.png'
import Image from 'next/image'
import styles from '../styles/Footer.module.css'
import Link from 'next/link'
//import marketplace from '../assets/question.svg'
const SocialMedia = [
    {
        name: 'Twitter',
        href: 'https://twitter.com/MetaTeds',
        icon: twitter
    },
    {
        name: 'Discord',
        href: 'http://discord.gg/N5wB8JTBBS',
        icon: discord
    },
    {
        name: 'SolSurfer Markeplace',
        href: 'https://solsurfer.xyz/#/',
        icon: solsurfer,
    },
    /*{   
        name: 'TBA Marketplace',
        href: '/partnerships',
        icon: marketplace
    },
    { 
        name: 'YouTube',
        href: 'www.youtube.com'
    }*/
]

const Footer = () => {
    const [socialImg] = useState(SocialMedia)
    return (
        <footer className={`${styles.footer_container} ${styles.footer_transaparent}`}>
            <div className={styles.social_media_items}>
                {socialImg.map((social, index) => (
                    
                    <a className = {styles.footer_links} key={index} target="_blank" rel = "noreferrer" href={social.href}>
                        <Image
                            /*className={styles.footer_icons}*/
                            alt = {social.name} 
                            src ={social.icon} 
                            width={20}
                            height={20}
                            layout="fixed"
                            //viewBox="0 0 512 512" 
                        />                                       
                    </a>
                    
                ))}
            </div>
            <div className= {`${styles.copyright} ${styles.footer_white_color} ${styles.footer_font_weight}`}>
                <p>Copyright © 2022 MetaTed Labs</p>
            </div>
            
        </footer>
    )
}

export default Footer