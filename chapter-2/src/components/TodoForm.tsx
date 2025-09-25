import { useState, type FormEvent } from "react";
import { useTodo } from "../context/TodoContext";

const TodoForm = () => {
  const { addTodo } = useTodo();
  const [input, setInput] = useState<string>('');

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const text = input.trim(); // 공백 제거
  
    if (text) {
      // addTodo
      addTodo(text);
      setInput('');
    }
  }

  return (
    <form onSubmit={handleSubmit} className='todo-container__form'>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className='todo-container__input'
        placeholder='할 일을 입력해주세요.'
        required
      />
      <button type='submit' className='todo-container__button'>추가</button>
    </form>
  );
}

export default TodoForm