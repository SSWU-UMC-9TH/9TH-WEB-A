"use strict";

const todoInput = document.getElementById("todo-input") as HTMLInputElement;
const todoForm = document.getElementById("todo-form") as HTMLFormElement;
const todoList = document.getElementById("todo-list") as HTMLUListElement;
const doneList = document.getElementById("done-list") as HTMLUListElement;

type Todo = {
  id: number;
  text: string;
};

class TodoManager {
  private todos: Todo[] = [];
  private doneTasks: Todo[] = [];
  private storageKey = "todos_app_data";

  constructor() {
    this.loadFromLocalStorage();
    this.renderTasks();
  }

  private loadFromLocalStorage(): void {
    const data = localStorage.getItem(this.storageKey);
    if (data) {
      const { todos, doneTasks } = JSON.parse(data);
      this.todos = todos;
      this.doneTasks = doneTasks;
    }
  }

  private saveToLocalStorage(): void {
    const data = {
      todos: this.todos,
      doneTasks: this.doneTasks,
    };
    localStorage.setItem(this.storageKey, JSON.stringify(data));
  }

  private renderTasks(): void {
    todoList.innerHTML = "";
    doneList.innerHTML = "";

    this.todos.forEach((todo) => {
      const li = this.createTodoElement(todo, false);
      todoList.appendChild(li);
    });

    this.doneTasks.forEach((todo) => {
      const li = this.createTodoElement(todo, true);
      doneList.appendChild(li);
    });
  }

  private createTodoElement(todo: Todo, isDone: boolean): HTMLLIElement {
    const li = document.createElement("li");
    li.classList.add("render-container__item");
    li.textContent = todo.text;

    const button = document.createElement("button");
    button.classList.add("render-container__item-button");

    if (isDone) {
      button.textContent = "삭제";
      button.style.backgroundColor = "#dc3545";
      button.addEventListener("click", () => this.deleteTodo(todo));
    } else {
      button.textContent = "완료";
      button.style.backgroundColor = "#28a745";
      button.addEventListener("click", () => this.completeTodo(todo));
    }

    li.appendChild(button);
    return li;
  }

  public addTodo(text: string): void {
    if (text.trim()) {
      this.todos.push({ id: Date.now(), text });
      todoInput.value = "";
      this.saveToLocalStorage();
      this.renderTasks();
    }
  }

  public completeTodo(todo: Todo): void {
    this.todos = this.todos.filter((t) => t.id !== todo.id);
    this.doneTasks.push(todo);
    this.saveToLocalStorage();
    this.renderTasks();
  }

  public deleteTodo(todo: Todo): void {
    this.doneTasks = this.doneTasks.filter((t) => t.id !== todo.id);
    this.saveToLocalStorage();
    this.renderTasks();
  }
}

const manager = new TodoManager();

todoForm.addEventListener("submit", (event: Event): void => {
  event.preventDefault();
  manager.addTodo(todoInput.value);
});
