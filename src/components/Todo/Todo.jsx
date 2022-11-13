import React from 'react';
import { BsFillTrashFill } from 'react-icons/bs';

const style = {
  li: `flex justify-between p-4 my-2 capitalize bg-[#393e46] rounded-md`,
  liComplete: `flex justify-between p-4 my-2 capitalize`,
  row: `flex`,
  text: `ml-2 cursor-pointer`,
  textComplete: `ml-2 cursor-pointer line-through`,
  button: `flex items-center cursor-pointer`,
};

const Todo = ({ todo, toggleComplete, deleteTodo }) => {
  return (
    <li className={todo.completed ? style.liComplete : style.li}>
      <div className={style.row}>
        <input
          onChange={() => toggleComplete(todo)}
          type="checkbox"
          checked={todo.completed ? 'checked' : ''}
        />
        <p
          onClick={() => toggleComplete(todo)}
          className={todo.completed ? style.textComplete : style.text}
        >
          {todo.text}
        </p>
      </div>
      <button onClick={() => deleteTodo(todo.id)}>{<BsFillTrashFill />}</button>
    </li>
  );
};

export default Todo;
