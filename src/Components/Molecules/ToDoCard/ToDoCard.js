import React from 'react';
import './ToDoCard.css';

function ToDoCard(props) {
  return (
    <div className="todo-card col-2">
      <div className="heading">
        <span className="title">{props.label}</span>
        <div className="actions">
          <button onClick={props.deleteClick} style={{background: 'red', color: 'white'}}>X</button>
        </div>
      </div>
      <div className="description">{props.description}</div>
    </div>
  );
}

export default ToDoCard;