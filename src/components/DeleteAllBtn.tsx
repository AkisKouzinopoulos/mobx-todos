import React from 'react';
import { Button } from "@chakra-ui/react";
import store from "../stores/todosStore";

function DeleteAllBtn() {
  return (
    <Button colorScheme='teal' onClick={() => store.deleteAll()}>Delete all</Button>
  )
}

export default DeleteAllBtn;
