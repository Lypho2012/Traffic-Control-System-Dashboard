import { Route, Routes } from 'react-router-dom'
import './App.css'
import './pages/Sidebar.css'
import './pages/Header.css'
import './pages/SatelliteMapView.css'
import './pages/DroneLiveFeed.css'
import SatelliteMapView from './pages/SatelliteMapView'
import Sidebar from './pages/Sidebar'
import DroneManagement from './pages/DroneManagement'
import Header from './pages/Header'
import DroneLiveFeed from './pages/DroneLiveFeed'
import DroneLiveFeedVideo from './pages/DroneLiveFeedComponents/DroneLiveFeedVideo'

function App() {

  return (
    <>

    {/** Header */}
    <Header/>
    
    {/** Sidebar */}
    <Sidebar/>

    {/** Routes */}
    <Routes>
      <Route path="/satellite-map-view" element={<SatelliteMapView/>}></Route>
      <Route path="/drone-management" element={<DroneManagement/>}></Route>
      <Route path="/drone-live-feed">
        <Route path=":droneID" element={<DroneLiveFeed/>}></Route>
        <Route path="" element={<DroneLiveFeed/>}></Route>
      </Route>
    </Routes>
    </>
  )
}

export default App
