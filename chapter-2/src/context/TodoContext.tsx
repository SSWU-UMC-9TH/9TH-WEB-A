import { createContext, useContext, useState, type PropsWithChildren } from "react";
import type { TTodo } from "../types/todo";

interface ITodoContext {
  todos: TTodo[];
  doneTodos: TTodo[];
  addTodo: (text: string) => void;
  completeTodo: (todo: TTodo) => void;
  deleteTodo: (todo: TTodo) => void;
}

export const TodoContext = createContext<ITodoContext | undefined>(undefined);

export const TodoProvider = ({ children }: PropsWithChildren) => {
  const [todos, setTodos] = useState<TTodo[]>([]);
  const [doneTodos, setDoneTodos] = useState<TTodo[]>([]);

  const addTodo = (text: string) => {
    const newTodo: TTodo = { id: Date.now(), text };
    setTodos((prevTodos) => [...prevTodos, newTodo]);
  };

  const completeTodo = (todo: TTodo) => {
    setTodos((prevTodos) => prevTodos.filter((t) => t.id !== todo.id));
    setDoneTodos((prevDoneTodos) => [...prevDoneTodos, todo]);
  }
  
  const deleteTodo = (todo: TTodo) => {
    setDoneTodos((prevDoneTodos) => prevDoneTodos.filter((t) => t.id !== todo.id));
  };

  return (
    <TodoContext.Provider value={{ todos, doneTodos, addTodo, completeTodo, deleteTodo }}>
      {children}
    </TodoContext.Provider>
  )
};

// context 값이 undefined 인 경우 에러 처리
export const useTodo = () => {
  // context 값이 undefined 인 경우 에러 처리
  const context = useContext(TodoContext);
  if (!context) { 
    throw new Error('useTodo must be used within a TodoProvider');
  }

  // context 값이 undefined 가 아닌 경우 context 반환
  return context;
}