import './App.css';
import {useState} from "react";

const todoRepository = {
    todoCount: 0,
    todos: [],
    addTodo(text) {
        this.todos.push({text: text, id: this.todoCount})
        this.todoCount += 1
    },
    getTodos() {
        return this.todos
    },
    deleteTodo(id) {
        this.todos = this.todos.filter(it => it.id !== id)
    }
}

function TodoApp() {
    const [todoInputText, setTodoInputText] = useState('')
    const [todos, setTodos] = useState([])

    function createTodo() {
        if (todoInputText){
            todoRepository.addTodo(todoInputText)
        }
        setTodoInputText('')
        setTodos(todoRepository.getTodos())
    }

    function deleteTodo(id) {
        todoRepository.deleteTodo(id)
        setTodos(todoRepository.getTodos())
    }

    return (
        <>
            <h1>Todo list</h1>
            <button onClick={createTodo}>Create todo</button>
            <form onSubmit={(e) => {
                e.preventDefault()
                createTodo()
            }}>
                <input value={todoInputText}
                       onChange={e => setTodoInputText(e.target.value)}
                />
            </form>
            <ul>
                {
                    todos.map(todo => (
                        <li key={todo.id}>
                            <button onClick={() => deleteTodo(todo.id)}>
                                🗑️
                            </button>
                            {todo.text}
                        </li>
                    ))
                }
            </ul>
        </>
    )
}

export default TodoApp;
