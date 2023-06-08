import * as React from "react";
import { observer } from "mobx-react";
import { ChakraProvider, Box, theme, Heading, Button } from "@chakra-ui/react";
import TopBar from "./components/TopBar";
import TodoList from "./components/TodoList";
import TodoAdd from "./components/TodoAdd";
import DeleteAllBtn from "./components/DeleteAllBtn";

import { useStores } from "./stores/rootStore";

import FilterDone from "./components/FilterDone";
import Search from "./components/Search";

const App = () => {

  const { todosStore } = useStores();

  return (
    <ChakraProvider theme={theme}>
      <Box maxWidth="8xl" margin="auto" p={5}>
        <TopBar />
        <Heading>Todo List</Heading>
        <Search />
        <TodoList />
        <Box display="flex" mt={2} justifyContent="space-between">
          <Button onClick={() => todosStore.toggleSelectAllTodos()}>
            {todosStore.areAllTodosSelected() ? "Deselect all" : "All done!"}
          </Button>
          <DeleteAllBtn />
        </Box>
        <TodoAdd />
        <Box display="flex" mt={6} justifyContent="center">
          <FilterDone />
        </Box>

      </Box>
    </ChakraProvider>
  );
}

export default observer(App);
