import TodoForm from "./TodoForm";
import TodoList from "./TodoList";
import { useTodo } from "../context/TodoContext";

const Todo = () => {
  const { todos, doneTodos, completeTodo, deleteTodo } = useTodo();

  return (
    <div className="todo-container">
      <h1 className="todo-container__header">BAKA TODO</h1>
      <TodoForm />
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
          actionLabel="삭제"
          actionColor="#dc3545"
        />
      </div>
    </div>
  );
};

export default Todo;
