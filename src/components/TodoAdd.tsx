import * as React from "react";
import { observer } from "mobx-react";
import { Button, Input, Grid } from "@chakra-ui/react";

import { useStores } from '../stores/rootStore';

function TodoAdd() {
  const { todosStore } = useStores();

  return (
    <Grid pt={2} templateColumns="5fr 1fr" columnGap="3">
      <Input
        placeholder="New todo"
        value={todosStore.newTodo}
        onChange={(e) => (todosStore.newTodo = e.target.value)}
      />
      <Button onClick={() => todosStore.addTodo()}>Add Todo</Button>
    </Grid>
  );
}

export default observer(TodoAdd);
