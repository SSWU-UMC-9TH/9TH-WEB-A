import { type FormEvent, type ChangeEvent } from "react";

type TodoFormProps = {
  input: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
};

const TodoForm = ({ input, onChange, onSubmit }: TodoFormProps) => {
  return (
    <form onSubmit={onSubmit} className="todo-container__form">
      <input
        value={input}
        onChange={onChange}
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
