// src/pages/ItemDetails.js
import React, { Suspense, useState, useEffect, useTransition } from "react";

import { Canvas, useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";
import { OrbitControls } from "@react-three/drei";

import CardDetails from "./CardDetails";

// import { Slider, Box } from '@mui/material';
import { useControls, button } from 'leva'


// const models = [
//   '/models/Burger_GLTF/Burger.gltf',
//   '/models/burger.gltf',
// ]

interface ModelProps {
    url: string;
    positionX: number;
    positionY: number;
    scale: number;
  }

function ItemDetails() {

  const [nutritionalFacts, setNutritionalFacts] = useState([{}]);



  const nutritionalData = [
    { key: "Calories", value: "259.3" },
    { key: "Total Fat", value: "10.0 g" },
    { key: "Saturated Fat", value: "3.5 g" },
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
  ];

  useEffect(() => {
    setNutritionalFacts(nutritionalData);
  }, []);
  

  const [burgerModelUrl, setBurgerModelUrl] = useState('/models/burger.gltf');
  const [burgerPositionX, setBurgerPositionX] = useState(0);
  const [burgerPositionY, setBurgerPositionY] = useState(0);
  const [burgerScale, setBurgerScale] = useState(1);
  const [isBurgerPending, startBurgerTransition] = useTransition();

  useEffect(() => {
    startBurgerTransition(() => {
        setBurgerModelUrl('/models/hot_dog.gltf');
        // setBurgerModelUrl('/models/truck_model.gltf');
        // setBurgerModelUrl('/models/burger.gltf');
        // setBurgerModelUrl('/models/Burger_GLTF/Burger.gltf');
        setBurgerPositionX(0);
        setBurgerPositionY(0);
        setBurgerScale(1);
    });
  }, []);

  console.log(isBurgerPending)

//   let modelPath = "/models/Burger_GLTF/Burger.gltf"
  const gltfLoader = new GLTFLoader();
  const dracoLoader = new DRACOLoader();
  dracoLoader.setDecoderPath("/draco/");
  gltfLoader.setDRACOLoader(dracoLoader);

const Model: React.FC<ModelProps> = ({ url, positionX, positionY, scale }) => {

  console.log('url: ', url)
  
  const model = useLoader(GLTFLoader, url, (loader) => {
    console.log('loader: ', loader)
    loader.setDRACOLoader(dracoLoader);
  });

  //  // Use GLTFLoader with DRACOLoader
  //  const model = useLoader(GLTFLoader, url, loader => {
  //   (loader as GLTFLoader).setDRACOLoader(dracoLoader);
  // });

  // const model = useLoader(GLTFLoader, url);
  console.log('model: ', model)
  
    return <primitive object={model.scene} position-x={positionX} position-y={positionY} scale={scale} />;
  };

  const controls = useControls({ burgerPositionX: 0, burgerPositionY: -1, burgerScale: 1, "Add To Cart": button(() => { console.log('ok') }) })
  console.log('controls.positionX: ', burgerPositionX)
  console.log('controls.positionY: ', burgerPositionY)
  console.log('controls.scale: ', burgerScale)

//   const marksSauce = [
//     {
//       value: 0,
//       label: "None"
//     },
//     {
//       value: 1,
//       label: "Little"
//     },
//     {
//       value: 2,
//       label: "Regular"
//     },
//     {
//       value: 3,
//       label: "Extra"
//     }
//   ];

//   const marksPatties = [
//     {
//       value: 0,
//       label: "Chicken"
//     },
//     {
//       value: 1,
//       label: "Beef"
//     },
//     {
//       value: 2,
//       label: "Fish"
//     },
//     {
//       value: 3,
//       label: "Veggie"
//     }
//   ];

  return (
    <div style={{ padding: "1vh 14vw" }}>
      <div className="column-container">
        <div className="column1">
          <h1>Hello</h1>
          <div className="canvas-container">
                <Suspense fallback={<div>Loading model...</div>}>
              <Canvas>
                    {/* <Model url={burgerModelUrl} positionX={controls.burgerPositionX} positionY={controls.burgerPositionY} scale={controls.burgerScale}/> */}
                    {burgerModelUrl && (<Model url={burgerModelUrl} positionX={controls.burgerPositionX} positionY={controls.burgerPositionY} scale={controls.burgerScale}/>)}
                    {/* <primitive object={model.scene} position-x={ positionX } position-y={ positionY } scale={scale} /> */}

                <spotLight
                  position={[10, 10, 10]}
                  angle={0.15}
                  penumbra={1}
                  decay={0}
                  intensity={Math.PI}
                  />
                {/* <pointLight
                  position={[-10, -10, -10]}
                  decay={0}
                  intensity={Math.PI}
                  />{" "} */}
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
            <p>Category: {"item.category"}</p>
            {/* <img src={item.image} alt={item.title} /> */}
            <p>Size: {"item.size"}</p>
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
  );
}


export default ItemDetails;
