import { createContext, useContext, useState, type ReactNode } from "react";
import type { TTodo } from "../types/todo";

type TodoContextType = {
  todos: TTodo[];
  doneTodos: TTodo[];
  input: string;
  setInput: (value: string) => void;
  addTodo: () => void;
  completeTodo: (todo: TTodo) => void;
  deleteTodo: (todo: TTodo) => void;
};

const TodoContext = createContext<TodoContextType | undefined>(undefined);

export const TodoProvider = ({ children }: { children: ReactNode }) => {
  const [todos, setTodos] = useState<TTodo[]>([]);
  const [doneTodos, setDoneTodos] = useState<TTodo[]>([]);
  const [input, setInput] = useState<string>("");

  const addTodo = () => {
    const text = input.trim();
    if (!text) return;

    const newTodo: TTodo = { id: Date.now(), text };
    setTodos((prev) => [...prev, newTodo]);
    setInput("");
  };

  const completeTodo = (todo: TTodo) => {
    setTodos((prev) => prev.filter((t) => t.id !== todo.id));
    setDoneTodos((prev) => [...prev, todo]);
  };

  const deleteTodo = (todo: TTodo) => {
    setDoneTodos((prev) => prev.filter((t) => t.id !== todo.id));
  };

  return (
    <TodoContext.Provider
      value={{
        todos,
        doneTodos,
        input,
        setInput,
        addTodo,
        completeTodo,
        deleteTodo,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};

export const useTodo = () => {
  const context = useContext(TodoContext);
  if (!context) throw new Error("useTodo must be used within TodoProvider");
  return context;
};
