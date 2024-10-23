import { useState } from "react";

const TodoNew = (props) => {
    const { addNewTodo } = props;
    const [valueInput, setValueInput] = useState();

    const handleChangeInput = (name) => {
        setValueInput(name);
    }

    const handleClickAdd = () => {
        addNewTodo(valueInput);
        setValueInput("");
    }

    return (
        <div className='todo-new'>
            <input type="text"
                onChange={(e) => handleChangeInput(e.target.value)}
                value={valueInput}
            />
            <button onClick={handleClickAdd}>Add</button>
            <p>My text input: {valueInput}</p>
        </div>
    )
}

export default TodoNew;
