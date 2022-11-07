import {React, useState} from 'react'
import twitter from '../assets/twitter.svg'
import discord from '../assets/discord.svg'
import solsurfer from '../assets/solsurfer.png'
import platformIcon from '../assets/ted@3.png'
import Image from 'next/image'
//import styles from '../styles/Footer.module.css'
import Link from 'next/link'
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
    /*{
        name: 'SolSurfer Markeplace',
        href: 'https://solsurfer.xyz/#/',
        icon: solsurfer,
    },*/
    {   
        name: 'Platform',
        href: 'https://metateds.com/',
        icon: platformIcon,
    },
    
    /*{ 
        name: 'YouTube',
        href: 'https://www.youtube.com/channel/UCdAwJk3r-ZLVWekikurLDjw',
        icon: require('../assets/YouTube-Original.png')
    }*/
]

//fixed pt-1 pb-1 z-30 text-center w-full bottom-0 bg-transparent
const Footer = () => {
    const [socialImg] = useState(SocialMedia)
    function valURL(url) {
        const parsed = url
        return ['https:', 'http:'].includes(parsed.protocol)
      }
    return (
        <footer className='fixed pt-1 pb-1 z-30 text-center w-full bottom-0 bg-transparent'>
            <div className='social_media_items'>
                {socialImg.map((social, index) => (
                    <a className = 'footer_links' key={index} 
                        target="_blank" rel = "noreferrer" 
                        href={valURL(new URL(`${social.href}`)) ? social.href : ''}>
                        <Image
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
            <div className= 'copyright'>
                <p>Copyright © 2022 MetaTed Labs</p>
            </div>
            
        </footer>
    )
}

export default Footer