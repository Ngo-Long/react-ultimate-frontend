const TodoData = (props) => {
    //props là một object {}
    const { todoList, removeTodo } = props;

    const handleClickRemove = (id) => {
        removeTodo(id);
    }

    return (
        <div className='todo-data'>
            {todoList.map((item, index) => {
                return (
                    <div className="todo-item" key={item.id}>
                        <div>{index + 1}: {item.name}</div>
                        <button onClick={() => handleClickRemove(item.id)}>Delete</button>
                    </div>
                )
            })}
        </div >
    )
}

export default TodoData;
