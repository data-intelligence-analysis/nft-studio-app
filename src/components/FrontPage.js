import React from 'react'
import metatedsHeader from '../assets/metateds-header.png'
import Image from 'next/image'
import styles from '../styles/Home.module.css';
import Head from 'next/head'


const FrontPage = () => {

    const myLoader = ({ src, width, quality }) => {
        return `https://example.com/${src}?w=${width}&q=${quality || 75}`
    }
    return (
        <div className={styles.home_container}>
            <Head>
                <title>Home | MetaTeds </title>
            </Head>
            <div className = {styles.home_container_name}>
            <Image 
                src={metatedsHeader}
                alt="MetaTeds Logo"
                layout = 'intrinsic'
                height={250}
                width={1000}
            />
            </div>
            <div className = {`${styles.home_content_subheader} ${styles.font_weight} 
                                ${styles.font_text_size} ${styles.font_color}`}>
                <h1>Building a Web3 Ecosystem</h1>
            </div>
        </div>
    )
};

export default FrontPage;