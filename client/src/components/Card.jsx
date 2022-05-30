import React from 'react'

const Card = ({name, color, height_meters, id, onDelete}) => {


  return (
    <div className='card'>
      <h1>{name}</h1>
      <p>Color: {color}</p>
      <p>Height: {height_meters}</p>
      <p>ID: {id}</p>
      <button className="card-button" onClick={() => onDelete(id)}>Delete</button>
    </div>
  )
}

export default Card
