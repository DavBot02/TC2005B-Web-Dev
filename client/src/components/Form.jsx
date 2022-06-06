import React, { useState } from 'react'
import axios from 'axios';

const Form = ({ onSuccess, prevPlant, type, changeEdit }) => {

  const EMPTY_FORM = {
    name: "",
    color: "",
    height_meters: 0
  }

  const [plant, setPlant] = useState(prevPlant ? prevPlant : EMPTY_FORM)

  const handleSubmit = async event => {
    event.preventDefault();
    const response = await axios.post(`http://localhost:3001/plants`, plant)
    if (response.status === 200) {
      onSuccess();
      setPlant(EMPTY_FORM);
    }
  }

  const handleEdit = async event => {
    event.preventDefault();
    const response = await axios.put(`http://localhost:3001/plants/${prevPlant.id}`, plant)
    if (response.status === 200) {
      onSuccess();
      changeEdit();
    }
  }

  const handleChange = event => {
    setPlant(prevPlant => {
      return {
        ...prevPlant,
        [event.target.name]: event.target.value
      }
    })
  }

  return (
    <div className='card'>
      <form className='form' onSubmit={type === "create" ? handleSubmit : handleEdit}>
        <label htmlFor='name'>Name: </label>
        <input id='name'
          name='name'
          onChange={handleChange}
          value={plant.name} />
        <label htmlFor='color'>Color: </label>
        <input id='color'
          name='color'
          onChange={handleChange}
          value={plant.color} />
        <label htmlFor='height'>Height: </label>
        <input id='height'
          type='number'
          name='height_meters'
          onChange={handleChange}
          value={plant.height_meters} />
        <button className='card-button'>Submit</button>
      </form>
    </div>
  )
}

export default Form
