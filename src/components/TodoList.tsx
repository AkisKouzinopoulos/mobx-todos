import React from "react";
import { observer } from "mobx-react";
import ToDoListItem from "./ToDoListItem";

import { Todo } from "../stores/todosStore";
import { useStores } from "../stores/rootStore"; ////


// 
// EXAMPLE how to make observer and define it like in TodoListItemsObserver. 
// If TodoListItems wasn't component in separate file

// import { observer } from "mobx-react";

// import store, { Todo } from "../store";

// function TodoListItems() {
//   return (
//     <>
//       {store.todos.map((todo: Todo) => (
//         <Flex pt={2} key={todo.id}>
//           <Checkbox onClick={() => (todo.done = !todo.done)} />
//           <Input
//             mx={2}
//             value={todo.text}
//             onChange={(e) => (todo.text = e.target.value)}
//           />
//           <Button onClick={() => store.removeTodo(todo.id)}>Delete</Button>
//         </Flex>
//       ))}
//     </>
//   );
// }

// const TodoListItemsObserver = observer(TodoListItems);

const TodoList = () => {
  const { todosStore, searchStore } = useStores();
  // const todoListItems =
  //   todosStore.todos.map((todo: Todo) => {
  //     return <ToDoListItem key={todo.id} todo={todo} />
  //   })

  const todoListItems = (todosArray: Todo[]) =>
    todosArray.map((todo: Todo) => {
      return <ToDoListItem key={todo.id} todo={todo} />
    })

  return (
    <>
      {/* <TodoListItemsObserver /> */}
      <div className="todo-list" data-testid="todo-list">
        {/* {todoListItems} */}
        {
          !searchStore.searchQuery
            ? todoListItems(todosStore.todos)
            : todoListItems(todosStore.searchResults)
        }
      </div>
    </>
  );
}

export default observer(TodoList);
