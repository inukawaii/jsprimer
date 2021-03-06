import { element, render } from './view/html-util.js';
import { TodoListModel } from './model/TodoListModel.js';
import { TodoItemModel } from './model/TodoItemModel.js';
import { TodoListView } from './view/TodoListView.js';
export class App {
  constructor() {
    this.todoListModel = new TodoListModel();
    this.todoListView = new TodoListView();
    this.formElement = document.querySelector('#js-form');
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleAdd(title) {
    this.todoListModel.addTodo(new TodoItemModel({ title, completed: false }));
  }

  handleUpdate({ id, completed }) {
    this.todoListModel.updateTodo({ id, completed });
  }

  handleDelete({ id }) {
    this.todoListModel.deleteTodo({ id });
  }

  handleSubmit(event) {
    const inputElement = document.querySelector('#js-form-input');
    event.preventDefault();
    this.handleAdd(inputElement.value);
    inputElement.value = "";
  }

  handleChange() {
    const containerElement = document.querySelector('#js-todo-list');
    const todoItemCountElement = document.querySelector('#js-todo-count');

    const todoItems = this.todoListModel.getTodoItems();
    const todoListElement = this.todoListView.createElement(todoItems, {
      onUpdateTodo: ({ id, completed }) => {
        this.handleUpdate({ id, completed });
      },
      onDeleteTodo: ({ id }) => {
        this.handleDelete({ id });
      }
    })
    render(todoListElement, containerElement);
    todoItemCountElement.textContent = `Todoアイテム数: ${this.todoListModel.getTotalCount()}`;
  }

  mount() {
    this.todoListModel.onChange(this.handleChange);
    this.formElement.addEventListener('submit', this.handleSubmit);
  }

  unmount() {
    this.formElement.removeEventListener('submit', this.handleSubmit);
    this.todoListModel.offChange(this.handleChange);
  }
}