import React from 'react'
import {useState, useEffect, useRef} from 'react';

export default function Todo({ 
                                todo, 
                                onToggleTodo, 
                                onDeleteTodo, 
                                onEditTodo,
                                onContextMenuItemClick,
                                contextMenuOpenerId = null
                            }) 
{

  const labelRef = useRef(null);
  const [isContextMenuOpen, setContextMenuVisibility] = useState(false);
  const [isInEditMode, setEditMode] = useState(false);
  const [label, setLabel] = useState('');

  useEffect(() => {
    setLabel(todo.name);    
  }, [])

  useEffect(() => {
    if (contextMenuOpenerId !== todo.id) {
        setContextMenuVisibility(false);
    }
  }, [contextMenuOpenerId])


  useEffect(() => {
    if (isInEditMode) {
        labelRef.current.focus();
    }
  }, [isInEditMode])

  function onEditClick() {
    setEditMode(true)    
  }

  function onCheckClick() {
    onToggleTodo(todo.id);
    setContextMenuVisibility(false);    
  }

  function renderContextMenu() {

    const isOpenClass = isContextMenuOpen ? 'mission-tracker-context-menu-open' : '';

    return (
        <div className={`mission-tracker-context-menu-wrapper ${isOpenClass}`}>
            <span className='mission-tracker-context-menu-item-wrapper' onClick={() => onDeleteTodo(todo.id)}>
                <span className='mission-tracker-context-menu-item mission-tracker-context-menu-item-delete' title='remove'></span>
            </span>
            <span className='mission-tracker-context-menu-item-wrapper' onClick={onEditClick}>
                <span className='mission-tracker-context-menu-item mission-tracker-context-menu-item-edit' title='edit'></span>
            </span>
            <span className='mission-tracker-context-menu-item-wrapper' onClick={onCheckClick}>
                <span className='mission-tracker-context-menu-item mission-tracker-context-menu-item-check' title='check'></span>
            </span>
        </div>
    )
  }

  function handleItemClick(e) {
    e.preventDefault();
    onContextMenuItemClick(todo.id);
    setContextMenuVisibility(!isContextMenuOpen)
  }

  function onFocusOut() {
    if (isInEditMode) {
        setEditMode(false);
        onEditTodo(todo.id, label);
        setContextMenuVisibility(false);
    }
  }

  function handleNameChange(e) {
    setLabel(e.currentTarget.textContent);    
  }

  const editClass = isInEditMode ? 'mission-tracker-item-text-editable' : '';
  const checkedClass = todo.complete ? 'checked' : '';

  return (
    <div className='mission-tracker-item-wrapper'>
        <div className={`mission-tracker-item-checkbox-circle-line ${checkedClass}`}></div>
        <div className='mission-tracker-item-checkbox-text-wrapper'>
            <label className='mission-tracker-item-checkbox-wrapper' onClick={handleItemClick}>
                <input style={{display:'none'}} type="checkbox" checked={todo.complete} readOnly/>      
                <div className={`mission-tracker-item-checkbox-circle ${checkedClass}`}></div>  
            </label>            
            <span className={`mission-tracker-item-text ${editClass}`}
                  tabIndex={-1}
                  onBlur={onFocusOut}
                  ref={labelRef}
                  contentEditable={isInEditMode}
                  suppressContentEditableWarning={true}
                  onInput={handleNameChange}>
                      {todo.name}
            </span>
        </div>
        {renderContextMenu()}
    </div>
  )
}
