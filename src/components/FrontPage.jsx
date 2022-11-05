import React from 'react'
import metatedsHeader from '../assets/metateds-header.png'
import Link from 'next/link'
import Image from 'next/image'
import styles from '../styles/Home.module.css';
import Head from 'next/head'
import styled from 'styled-components'


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
									layout='intrinsic'
									height={250}
									width={1000}
							/>
            </div>
            <div className = {`${styles.home_content_subheader} ${styles.font_weight} 
                                ${styles.font_text_size} ${styles.font_color}`}>
                <h1>Building a Web3 Ecosystem</h1>
            </div>
            <div className="mt-8 flex text-center">
							<Link href ="/mint">
									<MintButton>
											Mint Teds
									</MintButton>
							</Link>
							<ExploreButton>
									Explore
							</ExploreButton>
            </div>

        </div>
    )
};

const MintButton = styled.button`
		font-size: 1.2rem;
		padding-top: 0.5rem;
		padding-bottom: 0.5rem;
		cursor: pointer;
		background-repeat: no-repeat;
		width: 150px;
		font-family: 'Ranchers',bold;
		border-radius: 4px;
		margin-right: 1.5rem;
		background-color: var(--tw-purple-ted);
		&:hover {
			background: #4e4197;
			font-weight: 500;
			box-shadow: 0;
			-webkit-box-shadow: 0px 5px 40px -10px rgba(0,0,0,0.57);
			-moz-box-shadow: 0px 5px 40px -10px rgba(0,0,0,0.57);
			transition: all 0.3s ease 0s;
		};
		@media (max-width: 428px){
				padding-top: 0.5rem;
        padding-bottom: 0.5rem;
        padding-right: 1rem;
        padding-left: 1rem;
        height: 100%;
        width: 100px;
        font-size: 1rem;
		}
`
const ExploreButton = styled.button`
		font-size: 1.2rem;
		padding-top: 0.5rem;
		padding-bottom: 0.5rem;
		cursor: pointer;
		background-repeat: no-repeat;
		width: 150px;
		font-family: 'Ranchers',bold;
		border-radius: 4px;
		margin-left: 1.5rem;
		background-color: var(--tw-metateds);
		&:hover{
			background: #B27315;
			font-weight: 500;
			box-shadow: 0;
			-webkit-box-shadow: 0px 5px 40px -10px rgba(0,0,0,0.57);
			-moz-box-shadow: 0px 5px 40px -10px rgba(0,0,0,0.57);
			transition: all 0.3s ease 0s;
		}
		@media (max-width: 428px){
			padding-top: 0.5rem;
			padding-bottom: 0.5rem;
			padding-right: 1rem;
			padding-left: 1rem;
			height: 100%;
			width: 100px;
			font-size: 1rem;
	}
`


export default FrontPage;