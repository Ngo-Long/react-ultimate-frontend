import TodoData from './TodoData';
import TodoNew from './TodoNew';
import './todo.css';
import reactLogo from '../../assets/react.svg';
import { useState } from 'react';

const TodoApp = () => {
    const [todoList, setTodoList] = useState([])

    const removeTodo = (id) => {
        setTodoList(todoList.filter(x => x.id !== id));
    }

    const addNewTodo = (name) => {
        const newTodo = {
            id: randomIntFromInterval(1, 1000000),
            name
        }

        setTodoList([...todoList, newTodo])
    }

    const randomIntFromInterval = (min, max) => {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    return (
        <div className="todo-container">
            <div className="todo-title">Todo List</div>

            <TodoNew addNewTodo={addNewTodo} />

            {todoList.length > 0 ?
                <TodoData
                    todoList={todoList}
                    removeTodo={removeTodo}
                />
                :
                <div className='todo-image'>
                    <img src={reactLogo} className='logo' />
                </div>
            }
        </div>
    )
}

export default TodoApp;