import React, {useRef, useEffect, useMemo} from 'react'
import Head from "next/head";
import WalletConnection from '../components/web3/mint/walletConnection'
import { WalletMultiButton, WalletModalProvider  } from "@solana/wallet-adapter-react-ui";
import { clusterApiUrl } from '@solana/web3.js';
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { ConnectionProvider, WalletProvider, useWallet } from "@solana/wallet-adapter-react";
import {
  LedgerWalletAdapter,
  PhantomWalletAdapter,
  SlopeWalletAdapter,
  SolflareWalletAdapter,
  SolletWalletAdapter,
  TorusWalletAdapter
} from '@solana/wallet-adapter-wallets';
import {
  GlowWalletAdapter
} from '@solana/wallet-adapter-glow';
import { useConnection } from "@solana/wallet-adapter-react"
import NavBar from '../components/NavBar'
import Footer from '../components/Footer'
//ThreeJS  modules
//import { Canvas, useFrame } from '@react-three/fiber'
//import { Circles } from "react-loader-spinner";
import * as THREE from 'three'
import { useLoader } from "@react-three/fiber";
import { TextureLoader } from "three";
import {Suspense} from "react";
//import texturePack from '../assets/textures/earth_normal_map.png'
import dynamic from 'next/dynamic'
import { Canvas } from "@react-three/fiber";
//import {MTLLoader, OBJLoader} from 'three-obj-mtl-loader'
//import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
//import * as dat from 'dat.gui'
require('@solana/wallet-adapter-react-ui/styles.css');
const CanvasLoad = (props)  => {
  

  const canvasRef = useRef(null)
  // Scene
  //const scene = new THREE.Scene()
  
  
  
  

  //Colors for 3D model
  //white
  const pointLight_1 = new THREE.PointLight(0xffffff, 0.1)
  //blue
  const pointLight_2 = new THREE.PointLight(0x4E44CE, 2)
  //green
  const pointLight_3 = new THREE.PointLight(0xff1e, 2)
  //4E44CE
  //const pointLightHelper = new THREE.PointLightHelper(pointLight_3, 0.5)
  //Add color pointer helper
  const pointLightHelper = new THREE.PointLightHelper(pointLight_2, 0.5)
  //LightPoint Light Helper (pointLight_1, <ajudst scale of pointLight objects>)
  const pointLightHelper2 = new THREE.PointLightHelper(pointLight_3, 0.5)
  
  // Debug - dat.gui allows to control the positioning of the object
  //const gui = new dat.GUI()
  /*Color profile for GUI*/
  //Light 2 - Red Light

  //Create a folder in the dat.gui
  //const light2 = gui.addFolder('Light 2')
  //Add color profile to the gui 
  /*const light2color = {
    //Blue
    color: 0xff
  }
   Reference GUI console*/
  //light2.add(pointLight_2.position, 'x').min(-10).max(10).step(0.01)
  //light2.add(pointLight_2.position, 'y').min(-5).max(5).step(0.01)
  //light2.add(pointLight_2.position, 'z').min(-5).max(5).step(0.01)
  //light2.add(pointLight_2, 'intensity').min(0).max(15).step(0.01)
  
  /*light2.addColor(light2color, 'color')
      .onChange(() => {
          pointLight_2.color.set(light2color.color)
  })*/
  
  //Light 3 - 
  //Create a folder in the dat.gui
  /*const light3 = gui.addFolder('Light 3')
  const light3color = {
    //Green
    color: 0xff1e
  }
  // Reference GUI console
  light3.add(pointLight_3.position, 'x').min(-10).max(10).step(0.01)
  light3.add(pointLight_3.position, 'y').min(-5).max(5).step(0.01)
  light3.add(pointLight_3.position, 'z').min(-5).max(5).step(0.01)
  light3.add(pointLight_3, 'intensity').min(0).max(15).step(0.01)

  //Add color profile to the gui 
  
  light3.addColor(light3color, 'color')
      .onChange(() => {
          pointLight_3.color.set(light3color.color)
  })*/
  
  //TypeError: (intermediate value) is not a function
  

  

    
  
  
   // Loading - loading texture
   /*const TextureLoad = () => {
    var texture = useLoader(TextureLoader,"/textures/earth_normal_map.png")
    if (typeof document !== undefined){
      return texture;
    }
    return;
   }*/
   //const texture = useLoader(TextureLoader,"/textures/earth_normal_map.png")
   
   
   
   /*const normalTexture = dynamic(() => 
      textureLoader.load('/textures/earth_normal_map.png'),
      {
        ssr: false,
      }
    )*/
  
  useEffect(()=>{
    // Canvas
    //const canvas = document.querySelector('canvas.webgl')
    const canvas = canvasRef.current
    // Scene
    const scene = new THREE.Scene()

    const textureLoader = new THREE.TextureLoader() // calling textureLoader instance
    const normalTexture =  textureLoader.load('/textures/earth_normal_map.png')
    

    // Objects - physical shape of the scene (body of the 3D objects)
    const sphere_geometry = new THREE.SphereGeometry(.5, 64, 64);

    //useRef
    // Materials - skin of the objects
    // Mesh material can be rendered through normal maps
    // MeshStandardMaterialconvey realworld objects 
    const material = new THREE.MeshStandardMaterial()
    material.metalness = 0.7
    material.roughness = 0.2

    //Applying the texture to the material
    material.normalMap = normalTexture
    //material.normalMap = texture
    //material.map = texture
    material.color = new THREE.Color(0x00ffffff)
    
    
    // Mesh - add the object to the scene
    const sphere = new THREE.Mesh(sphere_geometry, material)

    //Add the sphere to the scene
    scene.add(sphere)
    
    // Lights 
  
    scene.add(pointLightHelper)
    scene.add(pointLightHelper2)

    //Light 1 - White Light
    pointLight_1.position.x = 2
    pointLight_1.position.y = 3
    pointLight_1.position.z = 4
    //scene.add(pointLightHelper)
    scene.add(pointLight_1)

    //Light 2 
  
    //position the light by default
    pointLight_2.position.set(-7.49,0.67,2.43)
    pointLight_2.intensity = 10.16
    scene.add(pointLight_2)

    // Light 3  
    scene.add(pointLight_3)
    //position the light by default
    pointLight_3.position.set(3.54,0.89,1.1)
    pointLight_3.intensity = 10

    
    /**
    * Renderer - set it and forget it
    */
    const renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      antialias: true,
     });
    
    /**
     * Window Sizes
     */
    //if typeof window !== undefined {we're on the client side}
    const sizes = {
      width: window.innerWidth,
      height: window.innerHeight
    }
    /**
     * Camera
     */
    // Base camera PerspectiveCamera - provides real world perspective of your scene
    const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
    //Set camera positions
    camera.position.x = 0
    camera.position.y = 0
    camera.position.z = 2
    scene.add(camera)

    //Boilerplate stuff
    window.addEventListener('resize', () =>
    {
        // Update sizes
        sizes.width = window.innerWidth
        sizes.height = window.innerHeight

        // Update camera
        camera.aspect = sizes.width / sizes.height
        camera.updateProjectionMatrix()

        // Update renderer
        renderer.setSize(sizes.width, sizes.height)
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
        //document.body.appendChild(renderer.domElement)
    })

    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))



    /** Animate **/

    let mouseX = 0, mouseY= 0;
    let targetX = 0, targetY = 0;

    /*Affect the movement of the object*/
    //innerWidth of the viewport
    const windowX = window.innerWidth / 2

    //innerHeight of the viewport
    const windowY = window.innerHeight / 2


    //To get a smoother scroll when mouse move interacts with object
    function onDocumentMouseMove (event) {
        //coordinates for x and y
        //if consoled you see the x and y coordinates move
        mouseX = (event.clientX - windowX) / 2
        mouseY = (event.clientY - windowY) / 2
    }
    //Detect mouse movement on object
    document.addEventListener('mousemove', onDocumentMouseMove)

    //Add a scroll effect to the object

    const updateSphere = (event) => {
        //Make the number real small so that the sphere doesn't shoot up quickly
        sphere.position.y  = window.scrollY * .001
    }
    window.addEventListener('scroll', updateSphere)

    const clock = new THREE.Clock()

    //animation loop on the y axis
    const tick = async () =>
    {
        targetX = mouseX * 0.001
        targetY = mouseY * 0.001

        const elapsedTime = clock.getElapsedTime()

        // Update objects
        sphere.rotation.y = .8 * elapsedTime

        sphere.rotation.x += .05 * (targetY - sphere.rotation.x)
        sphere.rotation.y += .5 * (targetX - sphere.rotation.y)
        sphere.position.z += -.05 * (targetY - sphere.rotation.x)

        // Update Orbital Controls
        // controls.update()

        // Render
        renderer.render(scene, camera)

        // Call tick again on the next frame
        window.requestAnimationFrame(tick)
    }
    tick()
  },)
  return <canvas ref = {canvasRef} {...props} />
}
const RenderWalletConnect = () => {
  //check if the user has given us permission to access wallet (trust) and checks if the wallet is connected
  const wallet = useWallet();
  const {connected} =useWallet();
  let walletAddress = '';
  try{
    if (wallet.connected && wallet.publicKey) {
        walletAddress = wallet.publicKey.toString()
        console.log('PublicKey: ' + walletAddress)
    }
  }catch(e){console.log(e)}
    
  return (
    <>
      {!connected && !wallet.publicKey? (
        <div className="bg-zinc-900 h-screen overflow-y-hidden"> 
          {/*<nav className="sticky top-[4.25rem] pointer-event-none z-nav w-full">
            <div className="absolute w-full mt-4">
              <div className="flex float-left sm:float-right font-pixel flex-row px-4">
                <div className= "items-center text-[0.625rem] font-pixel leading-5 sm:leading-6 sm:text-xs md:text-sm pointer-events-auto cursor-pointer bg-[#4e44ce] rounded-full hover:rounded-full hover:text-slate-200 hover:bg-gray-800 justify-center px-0.5">
                  <WalletMultiButton className="uppercase" />
                </div>
              </div>
            </div>
          </nav>*/}
          <CanvasLoad />
          <div className="absolute place-items-center grid top-[22%] left-0 right-0 bottom-[22%] pointer-events-auto items-center text-center px-6">
            <h1 className="uppercase text-[#0880F0] text-sm sm:text-2xl md:text-3xl font-pixel">
              Mainnet Mint Coming Soon
            </h1>
          </div>
        </div>
      
      ):(
        <div className="bg-zinc-900 h-screen overflow-y-auto">
          <WalletConnection />
        </div>
        )  
      }
    </>
  )
}
const Mint = () =>{
  /*const [size, setSize] = useState(windowDimensions)
  const {innerWidth, innerHeight} = window;
  function windowDimensions () {
    const {innerWidth, innerHeight,} = window;
    return {innerWidth, innerHeight};
  }
  useEffect (()=> {
    function handleResizing() {
      setSize(windowDimensions());
    }
    window.addEventListener('resize', handleResizing);

    return () => {
      window.removeEventListener('resize', handleResizing);
    };
  }, []);*/
  // The network can be set to 'devnet', 'testnet', or 'mainnet-beta'.
  const network = WalletAdapterNetwork.Mainnet;
  // You can also provide a custom RPC endpoint.
  const endpoint = useMemo(() => clusterApiUrl(network), [network]);
  const wallets = useMemo(
    () => [
        new PhantomWalletAdapter(),
        new SlopeWalletAdapter(),
        new SolletWalletAdapter({ network }),
        new SolflareWalletAdapter({ network }),
        new TorusWalletAdapter(),
        new LedgerWalletAdapter(),
        new GlowWalletAdapter({network}),
    ],
    [network]
  );
  return (
    <>
      <Head>
        <title> 🎉 Mint | MetaTeds </title>
      </Head>

      <NavBar bgFormat={'bg-zinc-900'}/>
        <RenderWalletConnect />
        {/*<ConnectionProvider endpoint={endpoint}>
          <WalletProvider wallets={wallets} autoConnect>
            <WalletModalProvider>   
              <RenderWalletConnect />
            </WalletModalProvider>
          </WalletProvider>
        </ConnectionProvider>*/}
      <Footer/>
    </>
  )

}

/*const [position, setPosition] = useState();

  function getLocation() {
    window.navigator.geolocation.getCurrentPosition(
      (newPos) => setPosition(newPos),
      console.error
    );
  }

  return (
    <main>
      <h1>
        An example showing the{" "}
        <code>ReferenceError: window is not defined</code> issue
      </h1>
      <p>
        If you stumbled across this by mistake, here's the accompanying article{" "}
        <a href="https://blog.sethcorker.com/question/how-to-solve-referenceerror-next-js-window-is-not-defined/">
          next.js window is not defined
        </a>
      </p>

      <h2>The code we are running as an explicit user action</h2>
      <button onClick={() => getLocation()}>Get location</button>
      {position && (
        <output>
          latitude: {position.coords.latitude}, longitude:{" "}
          {position.coords.longitude}
        </output>
      )}
      <nav>
        <h2>The problem:</h2>
        <ul>
          <li>
            <Link href="/window-on-mount">
              <a>
                To the window onMount example; client-side navigation (this
                works)
              </a>
            </Link>
          </li>
          <li>
            <a href="/window-on-mount">
              To the window onMount example; full refresh (this doesn't)
            </a>
          </li>
        </ul>
        <h2>Solution:</h2>
        <ul>
          <li>
            <Link href="/window-on-mount-use-effect">
              <a>
                To the window onMount useEffect example; client-side navigation
              </a>
            </Link>
          </li>
          <li>
            <a href="/window-on-mount-use-effect">
              To the window onMount useEffect example; full refresh
            </a>
          </li>
        </ul>
      </nav>
    </main>
  );
} */

export default Mint;