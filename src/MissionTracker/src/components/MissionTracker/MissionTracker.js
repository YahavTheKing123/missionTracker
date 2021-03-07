import React, { Component } from 'react'
import './missionTracker.css';
import closeIcon from '../../assets/images/close.svg';
import TodoList from './TodoList';

export default class MissionTracker extends Component {

    constructor(props) {
        super(props);
        this.state = {
            todos: [
                {
                    name: 'Cleared for takeoff',
                    id: 1,
                    isChecked: false
                }, 
                {
                    name: 'After take off', 
                    id: 2,
                    isChecked: true
                },
                {
                    name: 'Authorize to Cross', 
                    id: 3,
                    isChecked: true
                },
            ]
        }
    }

    onCloseClick = () => {

    }

    renderHeader() {
        const missionName = `eagle 1`;

        return (            
            <div className='mission-tracker-header'>
                <span className='mission-tracker-header-value'>{`${missionName} - Mission Status`}</span>
                <button className='mission-tracker-close-btn'>
                    <img className='mission-tracker-close-btn-img' src={closeIcon} alt='close' onClick={this.onCloseClick}/>
                </button>
            </div>
        )
    }

    toggleTodo = (id) => {
        const newTodos = [...this.state.todos];
        const todo = newTodos.find(todo => todo.id === id);
        todo.complete = !todo.complete;
        this.setState({todos: newTodos});
    }
    
    addTodo = () => {
        this.setState({
            todos: [
                ...this.state.todos, 
                { 
                    id: Math.round(Math.random() * 1000000), 
                    name: 'Rename this label', 
                    complete: false
                }]
        });
      }
    
    deleteTodo = id => {
        const newTodos = this.state.todos.filter(todo => id !== todo.id)
        this.setState({todos: newTodos})
    }

    editTodo = (id, newLabel) => {
        const {todos} = this.state;

        const index = todos.findIndex(todo => id === todo.id);
        
        todos[index].name = newLabel

        todos.splice(index, 1, todos[index]);  // array.splice(start, deleteCount, item1)

        this.setState({todos});
    }

    renderBody() {
        return (
            <div className='mission-tracker-body'>
                <TodoList todos={this.state.todos} 
                    onToggleTodo={this.toggleTodo} 
                    onDeleteTodo={this.deleteTodo}
                    onEditTodo={this.editTodo}
                    onAddTodo={this.addTodo}
                />
            </div>
        )
    }

    renderFooter() {
        return (
            <div className='mission-tracker-footer'>
                <button className='mission-tracker-button'>Cancel</button>
                <button className='mission-tracker-button mission-tracker-button-primary'>Apply</button>
                <button className='mission-tracker-button mission-tracker-button-primary'>Save</button>
            </div>
        )
    }

    render() {
        return (
            <div className='mission-tracker-wrapper'>
                {this.renderHeader()}
                {this.renderBody()}
                {this.renderFooter()}
            </div>
        )
    }
}
