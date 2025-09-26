import type { TTodo } from "../types/todo";

type TodoItemProps = {
  todo: TTodo;
  onAction: (todo: TTodo) => void;
  actionLabel: string;
  actionColor: string;
};

const TodoItem = ({
  todo,
  onAction,
  actionLabel,
  actionColor,
}: TodoItemProps) => {
  return (
    <li className="render-container__item">
      <span className="render-container__item-text">{todo.text}</span>
      <button
        onClick={() => onAction(todo)}
        style={{ backgroundColor: actionColor }}
        className="render-container__item-button"
      >
        {actionLabel}
      </button>
    </li>
  );
};

export default TodoItem;
