// src/pages/ItemDetails.js
import React, { Suspense, useState, useEffect } from "react";

import { Canvas, useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";
import { OrbitControls, Html } from "@react-three/drei";

import CardDetails from "./CardDetails";
import { Slider, Box } from '@mui/material';

function ItemDetails() {

  const [nutritionalFacts, setNutritionalFacts] = useState([]);



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
  
  let modelPath = "/models/Burger_GLTF/Burger.gltf"

  const marksSauce = [
    {
      value: 0,
      label: "None"
    },
    {
      value: 1,
      label: "Little"
    },
    {
      value: 2,
      label: "Regular"
    },
    {
      value: 3,
      label: "Extra"
    }
  ];

  const marksPatties = [
    {
      value: 0,
      label: "Chicken"
    },
    {
      value: 1,
      label: "Beef"
    },
    {
      value: 2,
      label: "Fish"
    },
    {
      value: 3,
      label: "Veggie"
    }
  ];

  return (
    <div style={{ padding: "1vh 14vw" }}>
      <div className="column-container">
        <div className="column1">
          <h1>Hello</h1>
          <div className="canvas-container">
            <Suspense fallback={<div>Loading model...</div>}>
              <Canvas>
              <Html>
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
                </Html>
                <ModelLoader modelPath={modelPath} />
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
            <br/>
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
            <br/>
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

function ModelLoader({ modelPath }) {
  const gltfLoader = new GLTFLoader();
  const dracoLoader = new DRACOLoader();
  dracoLoader.setDecoderPath("/draco/draco-gltf/");
  gltfLoader.setDRACOLoader(dracoLoader);

  const model = useLoader(GLTFLoader, modelPath, (loader) => {
    loader.setDRACOLoader(dracoLoader);
  });

  console.log("model: ", model);

//   const animations = useAnimations(model.animations, model.scene);
//   console.log("animations: ", animations);
//   model.materials["Material.001"].transparent = true;
//   model.materials["Material.001"].opacity = 0.1;
//   // model.materials["Material.001"].dithering = true;

//   useEffect(() => {
//     const action = animations.actions.Burger_explode;
//     action.play();
//   });

  return model ? (
    <primitive object={model.scene} />
  ) : (
    <div>Model not found</div>
  );
}

export default ItemDetails;
