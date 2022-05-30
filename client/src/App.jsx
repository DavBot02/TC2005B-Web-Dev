import React, { useState } from 'react'
import './App.css'
import axios from 'axios';

import Card from "./components/Card"

function App() {
  const [plants, setPlants] = useState([]);


  React.useEffect(() => {
    getAllPlants();
  }, []);

  const getHelloServer = async () => {
    const response = await axios.get("http://localhost:3001/plants");
    console.log(response.data);
  }

  const getAllPlants = async () => {
    const response = await axios.get("http://localhost:3001/plants");
    setPlants(response.data);
  }


  const handleDelete = async (id) => {
    const response = await axios.delete(`http://localhost:3001/plants/${id}`);
    if (response.status === 200) {
      setPlants(prevPlants => {
        return prevPlants.filter(plant => plant.id !== id)
      })
    }
  }

  const uploadPlant = async () => {
    const response = await axios.post(`http://localhost:3001/plants/`, {
      name: "azalea",
      color: "purple",
      height_meters: 10,
      id: 3
    });
    console.log(response)
    if (response.status === 200) {
      getAllPlants();
    }
  }

  const showPlants = plants.map(plant => (
    <Card
      name={plant.name}
      height_meters={plant.height_meters}
      id={plant.id}
      color={plant.color}
      onDelete={handleDelete} />
  )
  )

  console.log(plants);

  return (
    <div className="app">
      {showPlants}
      <button className='card-button' onClick={() => uploadPlant()}>Add an azalea!</button>
    </div >
  )
}

export default App
