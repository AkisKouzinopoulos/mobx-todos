import * as React from "react";
import { observer } from "mobx-react";
import { IconButton, Input, Grid } from "@chakra-ui/react";
import { FaSearch } from "react-icons/fa";

import { useStores } from '../stores/rootStore';

function Search() {
  const { todosStore, searchStore } = useStores();

  return (
    <Grid py={6} templateColumns="11fr 1fr" columnGap="4">
      <Input
        placeholder="Search"
        value={searchStore.searchQuery}
        // onChange={(e) => (searchStore.searchQuery = e.target.value)}
        onChange={
          (e) => {
            searchStore.searchQuery = e.target.value;
            todosStore.searchTodos(searchStore.searchQuery)
          }
        }
        background={'teal.50'}
      />
      <IconButton
        size="md"
        fontSize="lg"
        color="teal"
        onClick={() => todosStore.searchTodos(searchStore.searchQuery)}
        icon={<FaSearch />}
        aria-label="Search"
      />
    </Grid>
  );
}

export default observer(Search);
