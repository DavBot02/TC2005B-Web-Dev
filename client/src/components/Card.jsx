import React, { useState } from 'react'
import Form from './Form';

const Card = ({ name, color, height_meters, id, onDelete, onSuccess, type }) => {

  const [editing, setEditing] = useState(type === "create" ? true : false);

  const formattedPlant = {
    name: name,
    color: color,
    height_meters: height_meters,
    id: id
  }

  const changeEdit = () => {
    setEditing(false);
  }

  const info = (
    <>
      <h1>{name}</h1>
      <p>Color: {color}</p>
      <p>Height: {height_meters}</p>
      <p>ID: {id}</p>
    </>
  );
  const formPlant = (<Form onSuccess={onSuccess} prevPlant={formattedPlant} type={type} changeEdit={changeEdit} />);

  return (
    <>
      <div className='card'>
        {editing ? formPlant : info}
        {type === "edit" && <button className="card-button" onClick={() => onDelete(id)}>Delete</button>}
        {type === "edit" && <button className="card-button" onClick={() => setEditing(prevEdit => !prevEdit)}>Edit</button>}
      </div>
    </>
  );

}

export default Card
