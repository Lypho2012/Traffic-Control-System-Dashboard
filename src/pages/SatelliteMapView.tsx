import { GoogleMap, useLoadScript } from "@react-google-maps/api";
import { useEffect, useState } from "react";
import * as tf from "@tensorflow/tfjs";
import TextField from "@mui/material/TextField";
import { Route, Routes } from "react-router-dom";

function Map() {
  /** 
   * Load satellite segmentation model 
  */
  async function loadModel() {
    return await tf.loadLayersModel("public/models/satellite_segmentation_30/model.json");
  }

  /**
   * Recenters map to user location
   */
  function recenter() {
    // Try HTML5 geolocation.
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position: GeolocationPosition) => {
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };

          setCenter(pos);
          setZoom(10);
        }
      );
    } else {
      // Browser doesn't support Geolocation
      throw Error("Error: Your browser doesn't support geolocation.");
    }
  }

  /**
   * Processes image to patches before predicting
   */
  async function process_image(image:tf.Tensor) {
    
    return image;
  }

  /**
   * Uses google maps current window to predict road segmentation and returns overlay
   */
  async function predict() {
    const model = loadModel();
    const currentMap = tf.browser.fromPixels(document.querySelector("#static-image") as HTMLImageElement);
    const prediction = (await model).predict(await process_image(currentMap));
    return prediction;
  }

  /**
   * Opens list of reported congestion events in dashboard
   */
  function openCongestionList() {

  }

  /**
   * Opens list of reported accidents in dashboard
   */
  function openAccidentsList() {
    
  }

  // update road segmentation overlay in real-time
  const [roadSegmentation,setRoadSegmentation] = useState(predict()); 

  useEffect(() => {
    setInterval(() => setRoadSegmentation(predict()), 1000)
  },[])
  
  // load google maps api
  const [center,setCenter] = useState({ lat: 37, lng: -122 });
  
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_API_KEY,
  });

  const [zoom,setZoom] = useState(10);

  return (
    <div className="page">
      {!isLoaded ? (
        <h1>Loading...</h1>
      ) : (
      <GoogleMap
        id="map-container"
        center={center}
        zoom={zoom}>
      </GoogleMap>
      
      )}
      <button id="recenter-button" onClick={() => recenter()}>Recenter</button>
      <div id="satellitemapview_dashboard">
        <div id="satellitemapview_dashboard_tabs">
          <button onClick={() => openCongestionList()}>Congestion</button>
          <button onClick={() => openAccidentsList()}>Accidents</button>
        </div>
        <TextField
          id="satellitemapview_dashboard_searchbar"
          variant="outlined"
          fullWidth
          label="Search"
        />
        <Routes>
          <Route path="/" element={}></Route>
          <Route path="/drone-management" element={}></Route>
        </Routes>
      </div>
    </div>
  )
}
export default Map