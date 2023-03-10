import React, {useState, useEffect} from 'react'
import metatedsHeader from '../assets/metateds-header.png'
import Link from 'next/link'
import Image from 'next/image'
import styled from 'styled-components';
import CloseIcon from '@mui/icons-material/Close';
import ogIcon from '../assets/og_icon.png';
import left_nft from '../assets/merger/left-nft.png';
import right_nft from '../assets/merger/right-nft.png';
import elixir from '../assets/merger/elixir.png';
import metaheadLogo from '../assets/ted_1.png';
import metatedsLogo from '../assets/tednorm.png';
import ArrowCircleRightOutlinedIcon from '@mui/icons-material/ArrowCircleRightOutlined';
import ArrowCircleDownIcon from '@mui/icons-material/ArrowCircleDown';
import {server} from '../config';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { Button, CardActions } from '@mui/material';
import Typography from '@mui/material/Typography';


const FrontPage = () => {
	//explore page array
	const modalNavBarElements =[
    {
			id: 1,
			name: "Evolution",
			href: "mutation",
			content: "Enhance your MetaTeds NFT by merging it with our Elixir to unlock and mint a gamefied version NFT",
			title: "Evolved MetaTeds",
			img: left_nft,
			img2: right_nft,
    },
    {
			id: 2,
			name:"MetaPix",
			href: 'metapix',
			content: "MetaPix provides a creation studio that offers users the opportunity to pixelate 2D art and merge metateds NFTs with secondary attributes that can be used for a wide variety of purposes such as pfps for the metateds platform, NFTs, avatars, game characters, and more, to meet your standards.",
			title: "MetaPix creation studio",
			img: require('../assets/metapix_banner.png'),
    },
    {
			id: 3,
			name: "Gallery",
			href: "gallery",
			content: "View our generative art and join the communities it represents.",
			title: "Collections & Communities",
			img: metaheadLogo, //require('../assets/ted_1.png'),
			img2: metatedsLogo, //require('../assets/tednorm.png')
			img3: ""
    },
		{
			id: 4,
			name: "Ecosystem",
			href: "ecosystem",
			content: "Welcome, hope you stay awhile!",
			title: "Building Excellence",
			img: '',
			img2: '',
			img3:''
		},
  
  ]
	//react hooks
	const [modal, setModal] = useState(false);
  const [modalNavbar] = useState(modalNavBarElements);
  const [activeSidebar, setActiveSideBar] = useState(null);
  const [landing, setLanding] = useState(null);

	//Security measure to validate external site urls
  function valURL(url) {
    const parsed = url
    return ['https:', 'http:'].includes(parsed.protocol)
  }

	//url to tweet metateds and metahead gallery
	const tweetNow = (event, twitterShareUrl, tweetContent, twitterAccount) => {
    console.log("tweetNow has been selected")
    let twitterParam = []
    twitterParam.push('url=' + encodeURI(twitterShareUrl))
    twitterParam.push('text=' + encodeURI(tweetContent))
    twitterParam.push('via=' + encodeURI(twitterAccount))
    const url = 'https://twitter.com/intent/tweet?' + twitterParam.join('&');
    Linking.openURL(url)
      .then((data)=>{
        console.log('Twitter has opened')
      }).catch((error)=>{
        console.log(error)
      })
  }
	//custom loader
	const customLoader = ({src, width, quality}) => {
		return process.env.NODE_ENV === "production" ?
		`${process.env.BASE_URL}/${src}?${width}&q=${quality || 75}`:
		`http://localhost:3000/${src}?${width}&q=${quality || 75}`;
	}

	const toggleModal = () => {
		setModal(prev => !prev);
		setLanding(prev => !prev)
	}
	const activeModal = (event, index) => {
		setLanding(false);
		setActiveSideBar(index)
		console.log(`current ${index}`)
	}

	const RenderModal = ({...props}) => {
		return (
			<div key={props.id}>
				{props.id==0 && 
					<div key={props.id} className="items-center w-full h-full">
						<div className= "m-1 mb-8 sm:m-5 flex items-center">
							<div className="w-3/12 min-w-fit mx-auto h-full justify-center flex items-center cursor-pointer py-1 px-1 max-w-xs rounded-lg border-2 border-slate-100" >
								<Image src={ogIcon} alt="ted-og" width="25" height="auto" placeholder="shimmer" style={{marginRight:'0.75rem'}}/>
								<div className="block text-left mr-3 sm:mr-6">
									<p className="text-xs uppercase font-normal">Powered by</p>
									<p className="text-xs uppercase">MetaTed Labs - Metapix</p>
								</div>
							</div>
						</div>
						<div className="mt-2 w-full">
							<h1 className="text-3xl sm:text-4xl">{props.title}</h1>
						</div>
						<section className="w-full m-2 mt-2 sm:mt-4 block">
							<p className="inline-block text-sm sm:text-lg font-sans text-slate-400 font-bold">
								{props.content}
							</p>
						</section>
						<div className="w-full mt-6 mb-6 pb-4 sm:mt-8 sm:mb-8">
							<div className="m-1 sm:grid justify-content items-center sm:place-items-center sm:grid-cols-10 md:grid-cols-13">
								<div className="flex justify-center sm:col-start-1 sm:col-span-2 md:col-span-3">
									<Image
										loader={customLoader}
										quality='90'
										src={props.img}
										alt="left-nft"
										height="300"
										width= "auto"
										placeholder='blur'
										style = {{objectFit: 'contain', objectPosition: 'center', borderRadius: '10px'}}
									/>
								</div>
								<div className="hidden sm:grid sm:col-start-3 sm:col-span-2 md:col-start-4">
									<ArrowCircleRightOutlinedIcon/>
								</div>
								<div className="mt-2 pt-2 pb-4 sm:hidden">
									<ArrowCircleDownIcon />
								</div>
								<div className="flex justify-center sm:col-start-5 sm:col-span-2 md:col-start-6 md:col-span-3">
									<Image
										loader={customLoader}
										quality='90'
										src={elixir}
										alt="elixir"
										height="300"
										width= "auto"
										placeholder='blur'
										style = {{objectFit: 'contain', objectPosition: 'center', borderRadius: '10px'}}
									/>
								</div>
								<div className="hidden sm:grid sm:col-start-7 sm:col-span-2 md:col-start-9">
									<ArrowCircleRightOutlinedIcon/>
								</div>
								<div className="mt-2 pt-2 pb-4 sm:hidden">
									<ArrowCircleDownIcon />
								</div>
								<div className="flex justify-center sm:col-start-9 sm:col-span-2 md:col-start-11 md:col-span-3">
									<Image
										loader={customLoader}
										quality='90'
										src={props.img2}
										alt="right-nft"
										height="300"
										width= "auto"
										placeholder='blur'
										style = {{objectFit: 'contain', objectPosition: 'center', borderRadius: '10px'}}
									/>
								</div>
							</div>
						</div>
						<section className="mt-4 m-2 sm:mt-8 mb-2 w-full block">
							<p className="text-center inline-block text-base sm:text-lg font-sans mb-4 text-slate-300">
								The elixir, built by the first scientist of the MetaTeds species, 
								contains a serum that empowers SolTed characters with super abilities 
								capable of weilding weapons or establishing a fighting stance to become
								in-game playable characters in our {" "}
								<a className="text-indigo-500 bold font-['Ranchers']" href={valURL(new URL("https://metateds.com/gaming"))?'https://metateds.com/gaming':''} rel="noopener noreferrer" target="_blank">
									gaming project.
								</a>{" "}
							</p>
							<p className="mt-2 text-center inline-block text-base sm:text-lg font-sans text-slate-300">
								The elixir evolves <b>Gen 1</b> metateds to <b>Gen 2</b> derivatives. 
								It would be distributed as an airdrop to our holders. 
							</p>
							<p className="mt-1 font-bold font-['Ranchers'] leading-6 text-center inline-block text-base sm:text-lg font-sans text-indigo-500">
								Click the button below to get started
							</p>
						</section>
						<section className="mt-2 sm:mt-4 mb-4 w-full block">
							<Link href='/metapix/dao' legacyBehavior >
								<a target='_blank' rel ="noopener noreferrer">
									<button type="button" className="cursor-pointer text-center text-lg sm:text-xl md:text-2xl m-4 sm:m-8 hover:bg-slate-900 rounded-lg bg-indigo-700 px-4 py-2 sm:px-6">
										Evolve NFT
									</button>
								</a>
							</Link>
						</section>
					</div>
				}
				{props.id==1 && 
					<div key={props.id} className="items-center w-full h-full">
						<h1 className="text-3xl sm:text-4xl">{props.title}</h1>
						<div className="my-4 w-full items-center">
							<span className="box-border block overflow-hidden bg-none opacity-100 border-0 m-0 p-0 relative">
                <Image
                  loader={customLoader}
                  quality='90'
                  src={props.img}
                  alt="metapix"
                  height="220"
                  width= "auto"
                  placeholder='shimmer'
                  style = {{objectFit: 'contain', objectPosition: 'center', borderRadius: '15px'}}
                />
              </span>
						</div>
						<section className="w-full text-center sm:text-left m-2 mt-2 sm:mt-4 block">
							<p className="mt-2 mb-1 inline-block text-base sm:text-lg font-sans text-slate-300">
								{props.content}
							</p>
							<p className="mt-2 mb-1 inline-block text-base sm:text-lg font-sans text-slate-300">
								Own and control the pixel quality of your images and produce outstanding pixelated images that meet your desires.
							</p>
							<p className="mt-2 mb-2 inline-block text-base sm:text-lg font-sans text-slate-300">
								<a href="/metapix/dao" className="text-indigo-500 bold text-base lg:text-lg font-['Ranchers']" target="_blank" rel="noreferrer noopener">NFT holders</a> can mint their final pixelated images from the MetaPix creation studio.
							</p>
						</section>
						<div className="mt-3 mb-6 text-align items-center">
							<Link href='/metapix' legacyBehavior >
								<a target='_blank' rel ="noopener noreferrer">
									<button type="button" className="cursor-pointer text-center text-lg sm:text-xl md:text-2xl m-4 sm:m-8 hover:bg-slate-900 rounded-lg bg-indigo-700 px-4 py-2 sm:px-6">
										MetaPix
									</button>
								</a>
              </Link>
						</div>
					</div>
				}
				{props.id==2 && 
					<div key={props.id} className="items-center w-full h-full">
						<h1 className="text-3xl sm:text-4xl text-center">{props.title}</h1>
						<section className="w-full m-2 text-center mt-2 sm:mt-4 block">
							<p className="mt-2 mb-1 inline-block text-md sm:text-lg font-sans text-slate-400 font-bold">
								{props.content}
							</p>
						</section>
						<div className="w-full mx-auto my-2 sm:my-4 lg:mx-6 lg:my-6">
							<div className="flex items-center text-center justify-center px-2 py-4 sm:px-4 lg:px-6 lg:py-6">
								<Card sx={{ 
									bgcolor: 'rgba(30,41,59,1)',
									justifyContent: 'center',
									alignItems: 'center',
									marginRight: 'auto',
									marginLeft: 'auto',
									maxWidth: 300,
									minWidth: 250,
									width:'100%',
									borderRadius: 4,
								}}
								>
									<CardMedia
										component="img"
										sx={{ width: '100%', objectFit: 'contain', objectPosition: 'center'}}
										image = {props.img}
										alt="Metahead"
									/>
									<Box sx={{ display: 'flex', flexDirection: 'column', p:1, width: '80%' }}>
										<CardContent sx={{ flex: '1 0 auto' }}>
											<Typography component="div" variant="h5" align='left' sx={{pb: 1, color:'rgba(255,255,255, 0.9)'}}>
												MetaHeads
											</Typography>
											<Typography variant="string" color="rgba(148,163,184,0.8)" component="div" align='left' sx={{fontFamily: 'Graphik'}}>
                         Platform Beta Access Collection
                      </Typography>
										</CardContent>
										<CardActions>
											<Button size="small" color="primary" onClick= {(event) => tweetNow(event,
												`${server}/gallery/metahead`,
												'Check out MetaHead gallery and join the community - https://metateds.com/communities/metaheads', 
												'MetaTeds')}>
												Tweet
											</Button>
											<Button size="small" href="/gallery/metahead" target='_blank' rel ="noopener noreferrer" color="primary">
												Gallery
											</Button>
											<Button sx={{paddingLeft:'20px'}} size="small" color="primary" href={valURL(new URL("https://metateds.com/communities/metaheads"))?'https://metateds.com/communities/metaheads':''} target='_blank' rel ="noopener">
												Community
											</Button>
										</CardActions>
									</Box>
								</Card>
							</div>
							<div className="flex justify-center items-center text-center px-2 py-4 sm:px-4 lg:px-6 lg:py-6">
								<Card sx={{ 
									bgcolor: 'rgba(30,41,59,1)',
									justifyContent: 'center',
									alignItems: 'center',
									marginRight: 'auto',
									marginLeft: 'auto',
									maxWidth: 300,
									minWidth: 250,
									width:'100%',
									borderRadius: 4,
								}}>
									<CardMedia
										component="img"
										sx={{ width: '100%', objectFit: 'contain', objectPosition: 'center'}}
										image = {props.img2}
										alt="Metateds"
									/>
									<Box sx={{ display: 'flex', flexDirection: 'column', p:1, width: '80%' }}>
										<CardContent sx={{ flex: '1 0 auto' }}>
											<Typography component="div" variant="h5" align='left' sx={{pb: 1, color:'rgba(255,255,255, 0.9)'}}>
												MetaTeds
											</Typography>
											<Typography variant="string" color="rgba(148,163,184,0.8)" component="div" align='left' sx={{fontFamily: 'Graphik'}}>
                        Original Collection
                      </Typography>
										</CardContent>
										<CardActions>
											<Button size="small" color="primary" onClick= {(event) => tweetNow(event,
												`${server}/gallery/metated`,
												'Check out the Metated gallery and join the community - https://metateds.com/communities/metateds', 
												'MetaTeds')}>
												Tweet
											</Button>
											<Button size="small" href="/gallery/metated" target='_blank' rel ="noopener noreferrer" color="primary">
												Gallery
											</Button>
											<Button sx={{paddingLeft:'20px'}} size="small" color="primary" href={valURL(new URL("https://metateds.com/communities/metateds"))?'https://metateds.com/communities/metateds':''} target='_blank' rel ="noopener">
												Community
											</Button>
										</CardActions>
									</Box>
								</Card>
							</div>
							<div className="flex justify-center items-center text-center px-2 py-4 sm:px-4 lg:px-6 lg:py-6">
								<Card sx={{ 
									bgcolor: 'rgba(30,41,59,1)',
									justifyContent: 'center',
									alignItems: 'center',
									marginRight: 'auto',
									marginLeft: 'auto',
									maxWidth: 300,
									minWidth: 250,
									width:'100%',
									borderRadius: 4,
								}}>
									<CardMedia
										component="img"
										sx={{ width: '100%', objectFit: 'contain', objectPosition: 'center'}}
										image = {props.img3}
										alt="Weapons"
									/>
									<Box sx={{ display: 'flex', flexDirection: 'column', p:1, width: '80%' }}>
										<CardContent sx={{ flex: '1 0 auto' }}>
											<Typography component="div" variant="h5" align='left' sx={{pb: 1, color:'rgba(255,255,255, 0.9)'}}>
												Weapons
											</Typography>
											<Typography variant="string" color="rgba(148,163,184,0.8)" component="div" align='left' sx={{fontFamily: 'Graphik'}}>
                        MetaTed Weapons Collection
                      </Typography>
										</CardContent>
										<CardActions>
											<Button size="small" color="primary" onClick= {(event) => tweetNow(event,
												`${server}/gallery/weapons`,
												'Check out the Metated gallery and join the community - https://metateds.com/communities/metateds', 
												'MetaTeds')}>
												Tweet
											</Button>
											<Button size="small" href="/gallery/weapons" target='_blank' rel ="noopener noreferrer" color="primary">
												Gallery
											</Button>
											<Button sx={{paddingLeft:'20px'}} size="small" color="primary" href={valURL(new URL("https://metateds.com/communities/metateds"))?'https://metateds.com/communities/metateds':''} target='_blank' rel ="noopener">
												Community
											</Button>
										</CardActions>
									</Box>
								</Card>
							</div>
						</div>
					</div>
				}
				{props.id==3 && 
					<div key={props.id} className="items-center w-full h-full">				
						<section className="w-full text-center mt-2 sm:mt-4 block">
							<h1 className="text-3xl sm:text-4xl">{props.title}</h1>
							<p className="my-4 inline-block text-md sm:text-lg font-sans font-bold text-slate-400">
								{props.content}
							</p>
							<p className="mt-2 mb-1 inline-block text-base sm:text-lg font-sans text-slate-300">
								A platform that has never been experienced before - providing a first hand glance to what we have acomplished, scroll down below to view more!
							</p>
						</section>
						<div className="my-6">
							<p className="my-4 inline-block text-base sm:text-lg font-sans font-bold text-slate-400 uppercase">Blueprints Coming soon</p>
						</div>
					</div>
				}
			</div>
		)
	}
	const Explore = () => {
		return (
			<>
			{modal ? (
				<div className="inset-0 z-10 fixed bg-[#2e2e30e6] overflow-y-auto">
					<div className="min-h-screen p-2 items-center mx-auto w-screen max-w-full lg:max-w-screen-2xl">
						<nav className='flex items-center w-full h-[45px] mt-20 sticky gap-x-2'>
							<button className="text-[30px] ml-auto flex justify-center items-center h-full pr-0.5 mr-2 text-white bg-transparent pointer-cursor outline-none overflow-hidden hover:ring-4 hover:ring-indigo-600 rounded-md" onClick={toggleModal}>
									<CloseIcon sx={{width: 50, height:38}}/>
							</button>
						</nav>
						<div className="h-full overflow-hidden px-4 mt-1 mb-4 pb-5 sm:mt-2 sm:mb-4 sm:p-4 opacity-100">
							<div className="sm:mt-2 sm:grid sm:grid-cols-8 md:grid-cols-13 sm:place-items-center">
								<div className="overflow-x-auto mx-auto items-center w-full sm:col-start-1 sm:col-span-2 md:col-start-1 md:col-span-4">
									<div className="m-2 p-4 sm:m-4 sm:p-6 sm:flex items-center text-center justify-center sm:gap-x-4 gap-x-1 sm:flex-col flex-row">
										{modalNavbar.map((elem, i) =>(
											<button className={`cursor-pointer text-center text-base sm:text-xl md:text-2xl m-4 sm:m-8 hover:bg-slate-900 rounded-lg bg-indigo-700 px-2 py-2 sm:px-4 ${activeSidebar===i?"ring-indigo-700 ring-4 bg-violet-900":""}`} 
												key={i} onClick={(event) => activeModal(event, i)}>
												{elem.name}
											</button>
										))}
									</div>
								</div>
								<div className="items-center sm:grid sm:col-start-3 sm:col-span-6 md:col-start-5 md:col-span-9">
									{landing ? (
										<div className="items-center mx-auto relative sm:flex">
											<Image
												src={require('../assets/landingIMG.png')}
												alt="space-ted"
												placeholder='shimmer'
												width='500'
												height='auto'
												loader={customLoader}
											/>
										</div>
									):(modalNavbar.map((elem, index) =>(
											<div key={index}>
												{activeSidebar===index &&
													<RenderModal 
														id={index}
														title={elem.title}
														content={elem.content}
														img={elem.img}
														img2={elem.img2}
														img3={elem.img3}
													/>
												}
											</div>
										)))}
								</div>
							</div>
						</div>
					</div>
				</div>
				):(null)}
			</>
		)
	}
	useEffect(() => {
    const loadImage = (e) => {
      return metatedsHeader;
      
    }
    document.body.addEventListener("onload", loadImage)
    // CLEANUP
    // remove event listener
    return () => {
      document.body.removeEventListener("onload", loadImage)
    }

  },[]);
	return (
			<div className='home_container'>
					<div className = 'home_container_name'>
						<Image
								loader={customLoader} 
								src={metatedsHeader}
								alt="MetaTeds Logo"
								height={250}
								width='auto'
								priority='true'
						/>
					</div>
					<div className = 'home_content_subheader pb-10 ml-a mr-a font_text_size text-[#EAA640]'>
							<h1>Building a Web3 Platform</h1>
					</div>
					<div className="mt-8 flex text-center">
						<Link href ="/mint" legacyBehavior>
								<MintButton>
										Mint Teds
								</MintButton>
						</Link>
						<ExploreButton onClick={toggleModal}>
								Explore
						</ExploreButton>
					</div>
					{modal && <Explore />}

			</div>
	);
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
				padding-top: 0.375rem;
        padding-bottom: 0.375rem;
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
			padding-top: 0.375rem;
			padding-bottom: 0.375rem;
			padding-right: 1rem;
			padding-left: 1rem;
			height: 100%;
			width: 100px;
			font-size: 1rem;
	}
`


export default FrontPage;