import React, { useState } from 'react'
import { observer } from 'mobx-react';
import { Button, List, ListItem, Box } from "@chakra-ui/react";
import { FaCheck } from "react-icons/fa";

import todosStore, { Todo } from "../stores/todosStore";

const FilterDone = () => {

  const [toggleShowList, setToggleShowList] = useState(todosStore.filterDoneTasks().length > 0);

  return (
    <Box maxWidth="8xl" margin="auto" mt={5}>
      {todosStore.filterDoneTasks().length > 0 &&
        <Button onClick={() => setToggleShowList(!toggleShowList)}>
          {!toggleShowList ? 'Hide done tasks' : 'Show done tasks'}
        </Button>
      }

      {!toggleShowList && <List spacing={2} my={4}>
        {todosStore.filterDoneTasks().map((todo: Todo) => {
          return (
            <ListItem display="flex" align="center" alignItems="center" key={todo.id}>
              <Box mr='2'>
                <FaCheck color="teal" />
              </Box>
              {todo.text}
            </ListItem>
          )
        })}
      </List>}

    </Box>
  )
}

export default observer(FilterDone);