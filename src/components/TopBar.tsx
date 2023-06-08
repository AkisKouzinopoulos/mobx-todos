import React, { useEffect } from "react";
import { Button, Grid } from "@chakra-ui/react";
import { ColorModeSwitcher } from "./ColorModeSwitcher";
import { useStores } from "../stores/rootStore";

/*
JSON source: https://raw.githubusercontent.com/jherr/todos-four-ways/master/data/todos.json
*/

function TopBar() {
  const { todosStore } = useStores();

  const onLoad = () => {
    todosStore.loadToDos('https://raw.githubusercontent.com/jherr/todos-four-ways/master/data/todos.json')
  }

  useEffect(() => {
    onLoad();
  }, [])

  return (
    <Grid pt={2} templateColumns="1fr 1fr" columnGap="3">
      <ColorModeSwitcher />
      {/*Refresh below is totally optional, playground */}
      <Button onClick={onLoad}>Get todos</Button>
    </Grid>
  );
}

export default TopBar;
