import { type FormEvent, type ChangeEvent } from "react";
import { useTodo } from "../context/TodoContext";

const TodoForm = () => {
  const { input, setInput, addTodo } = useTodo();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addTodo();
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  return (
    <form onSubmit={handleSubmit} className="todo-container__form">
      <input
        value={input}
        onChange={handleChange}
        className="todo-container__input"
        placeholder="할 일을 입력해주세요."
        required
      />
      <button type="submit" className="todo-container__button">
        추가
      </button>
    </form>
  );
};

export default TodoForm;
