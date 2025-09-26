import { useState, type FormEvent, type ChangeEvent } from "react";
import type { TTodo } from "../types/todo";
import TodoForm from "./TodoForm";
import TodoList from "./TodoList";

const Todo = () => {
  const [todos, setTodos] = useState<TTodo[]>([]);
  const [doneTodos, setDoneTodos] = useState<TTodo[]>([]);
  const [input, setInput] = useState<string>("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const text = input.trim();

    if (text) {
      const newTodo: TTodo = { id: Date.now(), text };
      setTodos((prevTodos) => [...prevTodos, newTodo]);
      setInput("");
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const completeTodo = (todo: TTodo) => {
    setTodos((prevTodos) => prevTodos.filter((t) => t.id !== todo.id));
    setDoneTodos((prevDoneTodos) => [...prevDoneTodos, todo]);
  };

  const deleteTodo = (todo: TTodo) => {
    setDoneTodos((prevDoneTodos) =>
      prevDoneTodos.filter((t) => t.id !== todo.id)
    );
  };

  return (
    <div className="todo-container">
      <h1 className="todo-container__header">BAKA TODO</h1>
      <TodoForm input={input} onChange={handleChange} onSubmit={handleSubmit} />
      <div className="render-container">
        <TodoList
          title="할 일"
          todos={todos}
          onAction={completeTodo}
          actionLabel="완료"
          actionColor="#28a745"
        />
        <TodoList
          title="완료"
          todos={doneTodos}
          onAction={deleteTodo}
          actionLabel="삭제2"
          actionColor="#dc3545"
        />
      </div>
    </div>
  );
};

export default Todo;
