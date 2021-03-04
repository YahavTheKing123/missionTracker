import React from 'react'
import Todo from './Todo'
import AddNewTodo from './AddNewTodo';
import {useState, useEffect} from 'react';

export default function TodoList(props) {
   
  const [contextMenuOpenerId, setContextMenuOpenerId] = useState(null);

  // useEffect(() => {
  //   if (contextMenuOpenerId !== todo.id) {
  //       setContextMenuVisibility(false);
  //   }
  // }, [contextMenuOpenerId])  

  return (
      <div className='mission-tracker-items'>
          {
            props.todos.map(todo => <Todo 
                                      key={todo.id} 
                                      onToggleTodo={props.onToggleTodo} 
                                      onEditTodo={props.onEditTodo}
                                      onDeleteTodo={props.onDeleteTodo}
                                      contextMenuOpenerId={contextMenuOpenerId}
                                      onContextMenuItemClick={(id) => setContextMenuOpenerId(id)}
                                      todo={todo} />
            )
          }
          <AddNewTodo onAddTodo={props.onAddTodo}/>
      </div>
  )
}
