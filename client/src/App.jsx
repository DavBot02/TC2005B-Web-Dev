import React, { useState } from 'react'
import './App.css'
import axios from 'axios';

import Card from "./components/Card"
import Form from './components/Form';

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

  const uploadAzalea = async () => {
    const response = await axios.post(`http://localhost:3001/plants/`, {
      name: "Azalea",
      color: "Purple",
      height_meters: 10
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
      onDelete={handleDelete}
      onSuccess={getAllPlants}
      type="edit" />
  )
  )

  return (
    <div className="app">
      {showPlants}
      <Card
        onDelete={handleDelete}
        onSuccess={getAllPlants}
        type="create" />
      <button className='card-button' onClick={() => uploadAzalea()}>Add an azalea!</button>
    </div >
  )
}

export default App
