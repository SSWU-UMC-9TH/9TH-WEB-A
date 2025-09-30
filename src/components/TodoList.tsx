import TodoItem from "./TodoItem";
import type { TTodo } from "../types/todo";

type TodoListProps = {
  title: string;
  todos: TTodo[];
  onAction: (todo: TTodo) => void;
  actionLabel: string;
  actionColor: string;
};

const TodoList = ({
  title,
  todos,
  onAction,
  actionLabel,
  actionColor,
}: TodoListProps) => {
  return (
    <div className="render-container__section">
      <h2 className="render-container__title">{title}</h2>
      <ul className="render-container__list">
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onAction={onAction}
            actionLabel={actionLabel}
            actionColor={actionColor}
          />
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
