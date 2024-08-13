// src/pages/ItemDetails.js
import React, { Suspense, useState, useEffect, useTransition } from 'react'

import { Canvas, useLoader } from '@react-three/fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'
import { OrbitControls } from '@react-three/drei'

import CardDetails from './CardDetails'

// import { Slider, Box } from '@mui/material';
import { useControls, button } from 'leva'

// const models = [
//   '/models/Burger_GLTF/Burger.gltf',
//   '/models/burger.gltf',
// ]

interface ModelProps {
  url: string
  positionX: number
  positionY: number
  scale: number
}

function ItemDetails() {
  const [nutritionalFacts, setNutritionalFacts] = useState([{}])

  const nutritionalData = [
    { key: 'Calories', value: '259.3' },
    { key: 'Total Fat', value: '10.0 g' },
    { key: 'Saturated Fat', value: '3.5 g' },
    // { key: "Polyunsaturated Fat", value: "0.2 g" },
    // { key: "Monounsaturated Fat", value: "1.2 g" },
    // { key: "Cholesterol", value: "47.2 mg" },
    // { key: "Sodium", value: "529.6 mg" },
    // { key: "Potassium", value: "213.4 mg" },
    // { key: "Total Carbohydrate", value: "27.1 g" },
    // { key: "Dietary Fiber", value: "4.4 g" },
    // { key: "Sugars", value: "2.3 g" },
    // { key: "Protein", value: "17.0 g" },
    // { key: "Vitamin A", value: "16.3 %" },
    // { key: "Vitamin B-12", value: "1.0 %" },
    // { key: "Vitamin B-6", value: "2.4 %" },
    // { key: "Vitamin C", value: "40.7 %" },
    // { key: "Vitamin D", value: "0.2 %" },
    // { key: "Vitamin E", value: "0.8 %" },
    // { key: "Calcium", value: "5.7 %" },
    // { key: "Copper", value: "1.0 %" },
    // { key: "Folate", value: "1.6 %" },
    // { key: "Iron", value: "14.5 %" },
    // { key: "Magnesium", value: "1.2 %" },
    // { key: "Manganese", value: "1.6 %" },
    // { key: "Niacin", value: "0.7 %" },
    // { key: "Pantothenic Acid", value: "0.7 %" },
    // { key: "Phosphorus", value: "4.3 %" },
    // { key: "Riboflavin", value: "2.1 %" },
    // { key: "Selenium", value: "1.6 %" },
    // { key: "Thiamin", value: "1.2 %" },
    // { key: "Zinc", value: "1.7 %" },
  ]

  useEffect(() => {
    setNutritionalFacts(nutritionalData)
  }, [])

  const [burgerModelUrl, setBurgerModelUrl] = useState('/models/burger.gltf')
  const [burgerPositionX, setBurgerPositionX] = useState(0)
  const [burgerPositionY, setBurgerPositionY] = useState(0)
  const [burgerScale, setBurgerScale] = useState(3)
  const [cheeseAmount, setCheeseAmount] = useState(1)
  const [pattyAmount, setPattyAmount] = useState(1)
  const [lettuceAmount, setLettuceAmount] = useState(1)
  const [tomatoAmount, setTomatoAmount] = useState(1)
  const [isBurgerPending, startBurgerTransition] = useTransition()

  useEffect(() => {
    startBurgerTransition(() => {
      // setBurgerModelUrl('/models/hot_dog.gltf');
      // setBurgerModelUrl('/models/truck_model.gltf');
      setBurgerModelUrl('/models/burger.gltf')
      // setBurgerModelUrl('/models/Burger_GLTF/Burger.gltf')
      // setBurgerModelUrl('/models/mouthwatering_banana_pancakes_in_syrup.glb')
      // setBurgerModelUrl('/models/hamburger_free/scene.gltf')
      // setBurgerModelUrl('/models/hungry_burger__drawfee__jaiden_fan_art/scene.gltf')
      setBurgerPositionX(0)
      setBurgerPositionY(0)
      setBurgerScale(3)
      setCheeseAmount(1)
      setPattyAmount(1)
      setLettuceAmount(1)
      setTomatoAmount(1)
    })
  }, [])

  console.log(isBurgerPending)

  //   let modelPath = "/models/Burger_GLTF/Burger.gltf"
  const gltfLoader = new GLTFLoader()
  const dracoLoader = new DRACOLoader()
  dracoLoader.setDecoderPath('/draco/')
  gltfLoader.setDRACOLoader(dracoLoader)

  const Model: React.FC<ModelProps> = ({ url, positionX, positionY, scale }) => {
    console.log('url: ', url)

    const model = useLoader(GLTFLoader, url, loader => {
      loader.setDRACOLoader(dracoLoader)
    })

    // Find the cheese mesh in the model
    const cheeseMesh = model.scene.children[0].children.find(node => node.name === 'cheese')

    // Find the patty mesh in the model
    const pattyMesh = model.scene.children[0].children.find(node => node.name === 'patty')

    // Find the lettuce mesh in the model
    const lettuceMesh = model.scene.children[0].children.find(node => node.name === 'salad')

    // Find the tomato mesh in the model
    const tomatoMesh = model.scene.children[0].children.find(node => node.name === 'tomato')

    // Adjust the cheese based on the slider value
    useEffect(() => {
      if (cheeseMesh) {
        if (controls.cheeseAmount === 0) {
          cheeseMesh.visible = false // Hide the cheese
        } else {
          cheeseMesh.visible = true // Show the cheese
          cheeseMesh.scale.set(1.75, controls.cheeseAmount, 1.75) // Adjust scale for extra cheese
        }
      }
    }, [controls.cheeseAmount, cheeseMesh])

    // Adjust the patty based on the slider value
    useEffect(() => {
      if (pattyMesh) {
        if (controls.pattyAmount === 0) {
          pattyMesh.visible = false // Hide the patty
        } else {
          pattyMesh.visible = true // Show the patty
          pattyMesh.scale.set(1, controls.pattyAmount, 1) // Adjust scale for extra patty
        }
      }
    }, [controls.pattyAmount, pattyAmount])

    // Adjust the lettuce based on the slider value
    useEffect(() => {
      if (lettuceMesh) {
        if (controls.lettuceAmount === 0) {
          lettuceMesh.visible = false // Hide the lettuce
        } else {
          lettuceMesh.visible = true // Show the lettuce
          lettuceMesh.scale.set(1, controls.lettuceAmount, 1) // Adjust scale for extra lettuce
        }
      }
    }, [controls.lettuceAmount, lettuceAmount])

    // Adjust the tomato based on the slider value
    useEffect(() => {
      if (tomatoMesh) {
        if (controls.tomatoAmount === 0) {
          tomatoMesh.visible = false // Hide the tomato
        } else {
          tomatoMesh.visible = true // Show the tomato
          tomatoMesh.scale.set(1, controls.tomatoAmount, 1) // Adjust scale for extra tomato
        }
      }
    }, [controls.tomatoAmount, tomatoAmount])

    return <primitive object={model.scene} position-x={positionX} position-y={positionY} scale={scale} />
  }

  const controls = useControls({
    burgerPositionX: 0,
    burgerPositionY: -1,
    burgerScale: 3,
    cheeseAmount: {
      value: 1, // Default is regular cheese
      min: 0, // No cheese
      max: 2, // Extra cheese
      step: 1, // Step value
      label: 'Cheese Amount',
    },
    pattyAmount: {
      value: 1, // Default is regular patty
      min: 0, // No patty
      max: 2, // Extra patty
      step: 1, // Step value
      label: 'Patty Amount',
    },
    lettuceAmount: {
      value: 1, // Default is regular lettuce
      min: 0, // No lettuce
      max: 2, // Extra lettuce
      step: 1, // Step value
      label: 'Lettuce Amount',
    },
    tomatoAmount: {
      value: 1, // Default is regular tomato
      min: 0, // No tomato
      max: 2, // Extra tomato
      step: 1, // Step value
      label: 'Tomato Amount',
    },
    'Add To Cart': button(() => {
      console.log('Add to cart clicked')
    }),
  })

  console.log('controls.positionX: ', burgerPositionX)
  console.log('controls.positionY: ', burgerPositionY)
  console.log('controls.scale: ', burgerScale)
  console.log('controls.cheeseAmount: ', cheeseAmount)
  console.log('controls.pattyAmount: ', pattyAmount)
  console.log('controls.tomatoAmount: ', tomatoAmount)

  return (
    <div style={{ padding: '1vh 14vw' }}>
      <div className="column-container">
        <div className="column1">
          <h1>Hello</h1>
          <div className="canvas-container">
            <Suspense fallback={<div>Loading model...</div>}>
              <Canvas>
                {burgerModelUrl && (
                  <Model
                    url={burgerModelUrl}
                    positionX={controls.burgerPositionX}
                    positionY={controls.burgerPositionY}
                    scale={controls.burgerScale}
                  />
                )}
                <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} decay={0} intensity={Math.PI} />
                {/* <spotLight position={[-10, -10, -10]} angle={-0.15} penumbra={1} decay={0} intensity={Math.PI} /> */}

                <OrbitControls />
              </Canvas>
            </Suspense>
          </div>
        </div>
        <div className="column2">
          <div className="productDetails-container">
            {/* <br/>
            <br/>
            <br/>
            <br/>
            <h5 style={{ fontFamily: "Arial" }}>BBQ Sauce</h5>
            <Box sx={{ width: 300 }}>
                <Slider
                aria-label="BBQ Sauce"
                defaultValue={2}
                valueLabelDisplay="auto"
                step={1}
                marks={marksSauce}
                min={0}
                max={3}
                />
            </Box>
            <br/>
            <br/>
            <br/>
            <br/>
            <h5 style={{ fontFamily: "Arial" }}>Patties</h5>
            <Box sx={{ width: 300 }}>
                <Slider
                aria-label="Patties"
                defaultValue={2}
                valueLabelDisplay="auto"
                step={1}
                marks={marksPatties}
                min={0}
                max={3}
                />
            </Box>
            <br/>
            <br/>
            <br/> */}
            <p>Category: {'item.category'}</p>
            {/* <img src={item.image} alt={item.title} /> */}
            <p>Size: {'item.size'}</p>
            <p>Price: $11.99</p>
            <p>Reviews: 5 Stars (112 reviews)</p>
            <button>Add to Cart</button>
          </div>
        </div>
      </div>
      <div className="cardDetails-list">
        {nutritionalFacts.map((item, index) => (
          <CardDetails key={index} nutritionalData={item}></CardDetails>
        ))}
      </div>
    </div>
  )
}

export default ItemDetails
