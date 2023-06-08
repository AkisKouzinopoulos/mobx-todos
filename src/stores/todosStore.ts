import { makeAutoObservable, observable, makeObservable, action } from "mobx";

// Standard interface and functions
export interface Todo {
  id: number;
  text: string;
  done: boolean;
}

const addTodo = (todos: Todo[], text: string): Todo[] => [
  ...todos,
  {
    id: Math.max(0, Math.max(...todos.map(({ id }) => id))) + 1,
    text,
    done: false,
  },
];

const removeTodo = (todos: Todo[], id: number): Todo[] =>
  todos.filter((todo) => todo.id !== id);

const editTodoText = (todos: Todo[], id: number, text: string): Todo[] =>
  todos.map((todo) => ({
    ...todo,
    text: todo.id === id ? text : todo.text,
  }));

const toggleTodoDone = (todos: Todo[], id: number): Todo[] =>
  todos.map((todo) => ({
    ...todo,
    done: todo.id === id ? !todo.done : todo.done,
  }));

const filterDoneTasks = (todos: Todo[]) => todos.filter((todo) => todo.done);

//MobX
class TodosStore {
  todos: Todo[] = [];
  newTodo: string = "";
  searchResults: Todo[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  // Alternative is just using "makeObservable" instead of "makeAutoObservable" using annotations
  // constructor() {
  //   makeObservable(this, {
  //     todos: observable,
  //     newTodo: observable,
  //     loadToDos: action,
  //     addTodo: action,
  //     removeTodo: action,
  //     editTodo: action,
  //     toggleTodoDone: action,
  //     deleteAll: action,
  //   });
  // }

  loadToDos(url: string) {
    fetch(url)
      .then((res) => res.json())
      .then((data) => (this.todos = data));
  }

  addTodo() {
    this.todos = addTodo(this.todos, this.newTodo);
    this.newTodo = "";
  }

  // addTodo(text: string) {
  //   this.newTodo = "";
  //   return (this.todos = [
  //     ...this.todos,
  //     {
  //       id: Math.max(0, Math.max(...this.todos.map(({ id }) => id))) + 1,
  //       text,
  //       done: false,
  //     },
  //   ]);
  // }

  removeTodo(id: number) {
    this.todos = removeTodo(this.todos, id);
  }

  editTodo(id: number, text: string) {
    this.todos = editTodoText(this.todos, id, text);
    // this.todos = this.todos.map((todo) => ({
    //   ...todo,
    //   text: todo.id === id ? text : todo.text,
    // }));
  }

  toggleTodoDone(id: number) {
    this.todos = toggleTodoDone(this.todos, id);
    // this.todos = this.todos.map((todo) => ({
    //   ...todo,
    //   done: todo.id === id ? !todo.done : todo.done,
    // }));
  }

  // toggleSelectAllTodos() {
  //   this.todos.map((todo) => (todo.done = true));
  // }

  toggleSelectAllTodos() {
    const areAllSelected = this.areAllTodosSelected();
    this.todos = this.todos.map((todo) => ({
      ...todo,
      done: !areAllSelected ? true : false,
    }));
  }

  areAllTodosSelected() {
    return this.todos.every((todo) => todo.done);
  }

  deleteAll() {
    this.todos = [];
  }

  filterDoneTasks() {
    const filteredTodos = filterDoneTasks(this.todos);
    // const listWithDoneIsEmpty = !filteredTodos.length;
    // console.log("is empty:", listWithDoneIsEmpty);
    return filteredTodos;
  }

  searchTodos(searchTerm: string): void {
    const searchText = searchTerm.toLowerCase();

    this.searchResults = this.todos.filter((todo) =>
      todo.text.toLowerCase().includes(searchText)
    );
  }
}

const todosStore = new TodosStore();
export default todosStore;
