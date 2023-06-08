import React from 'react';
import { observer } from "mobx-react";
import { Input, Flex, Checkbox, IconButton } from "@chakra-ui/react";
import { FaTrash } from "react-icons/fa"

import { Todo } from "../stores/todosStore";
import { useStores } from '../stores/rootStore';

interface ToDoListItemProps {
  todo: Todo;
}

function TodoListItem({ todo: { id, done, text } }: ToDoListItemProps) {
  const { todosStore } = useStores();

  // const handleToggleDone = () => {
  //   store.toggleTodoDone(id);
  // };    

  return (
    <Flex pt={2} key={id} align="center" className="todo-item">
      {/* <Checkbox onClick={() => (done = !done)} /> */}
      <Checkbox isChecked={done} onChange={() => (todosStore.toggleTodoDone(id))} value={text} data-testid="todo-checkbox" />
      {/* <Checkbox checked={done} onChange={handleToggleDone} /> */}
      <Input
        mx={2}
        value={text}
        // onChange={(e) => (text = e.target.value)}
        onChange={(e) => (todosStore.editTodo(id, e.target.value))}
        background={done ? 'orange' : ''}
      />
      <span hidden className="todo-item-input-hidden" data-testid="todo-item">{text}</span>
      <div>Is done: {done ? 'Yes' : 'No'}</div>
      {/* <Button onClick={() => todosStore.removeTodo(id)}>Delete</Button> */}
      <IconButton
        size="md"
        fontSize="lg"
        color={'red.300'}
        variant="ghost"
        onClick={() => todosStore.removeTodo(id)}
        icon={<FaTrash />}
        aria-label={`Delete "${text}" todo`}
      />
    </Flex>
  );
}

export default observer(TodoListItem);
