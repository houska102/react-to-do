import React, {Component} from 'react';
import './App.css';
import ToDoCard from './Components/Molecules/ToDoCard/ToDoCard';

function getFreeId (list) {
  let id = 0
  while (list.find(item => item.id === id)) {
    id++
  }
  return id
}
class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      newName: '',
      newDescription: '',
      toDoList: this.loadSavedTodos()
    }
  } 

  newNameChangeHandler =  (newValue) => {
    this.setState({
      newName: newValue
    })
  }
  newDescriptionChangeHandler =  (newValue) => {
    this.setState({
      newDescription: newValue
    })
  }

  saveTodos () {
    localStorage.setItem('todoList', JSON.stringify(this.state.toDoList))
  }
  loadSavedTodos () {
    const savedTodos = JSON.parse(localStorage.getItem('todoList')) || []
    return savedTodos
  }

  deleteTodoHandler  = async(id) => {
    await this.setState({
      toDoList: this.state.toDoList.reduce((accu, item) => {
        if (item.id !== id) {
          accu.push(item)
        }
        return accu
      }, [])
    })
    this.saveTodos()
  }
  addTodoHandler  = async() => {
    const newId = getFreeId(this.state.toDoList)
    const newTodo = {
      id: newId,
      name: this.state.newName,
      description: this.state.newDescription
    }
    await this.setState({
      toDoList: [...this.state.toDoList, newTodo],
      newDescription: '',
      newName: ''
    })
    this.saveTodos()
  }

  generateTodoList () {
    return this.state.toDoList.map(todo => {
      return <ToDoCard label={todo.name} description={todo.description} key={todo.id} deleteClick={this.deleteTodoHandler.bind(this, todo.id)} />
    })
  }

  render () {
    return (
      <div className="App">
        <header className="App-header">
          <span className="title">Yet another ToDo App</span>
        </header>
        <main className="App-content">
          <div className="add-form col-2">
            <input 
              type="text"
              placeholder="Name" 
              value={this.state.newName} 
              onChange={e => this.newNameChangeHandler(e.target.value)} 
            ></input>
            <textarea 
              placeholder="Description" 
              style={{resize: 'vertical', minHeight: '100px'}}
              value={this.state.newDescription} 
              onChange={e => this.newDescriptionChangeHandler(e.target.value)}
            ></textarea>
            <button onClick={this.addTodoHandler}>Add Todo</button>
          </div>
          <div className="row wrap col-10">
            {this.generateTodoList()}
          </div>
        </main>
      </div>
    );
  }
}

export default App;
