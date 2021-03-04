import React from 'react'
import {useRef} from 'react';

export default function AddNewTodo(props) {
  
  const checkboxRef = useRef(null);

  function handleAddClick() {
    props.onAddTodo()
    setTimeout(()=>checkboxRef.current.scrollIntoView(), 0)        
  }

  return (
    <div className='mission-tracker-item-wrapper' ref={checkboxRef}>
        <div className="mission-tracker-item-checkbox-circle-line"></div>
        <div>
            <label className='mission-tracker-item-checkbox-wrapper'>
                <input style={{display:'none'}} type="checkbox" onChange={handleAddClick} readOnly/>      
                <div className='mission-tracker-item-checkbox-circle add-new-todo'></div>  
            </label>
            <span className='mission-tracker-item-text'>{''}</span>
        </div>        
    </div>
  )
}
