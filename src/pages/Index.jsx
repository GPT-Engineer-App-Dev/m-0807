import React, { useState } from "react";
import { Box, Heading, Input, Button, List, ListItem, ListIcon, VStack, HStack, IconButton, useToast, Checkbox } from "@chakra-ui/react";
import { FaPlus, FaTrash } from "react-icons/fa";

const Index = () => {
  const [todos, setTodos] = useState([]);
  const [isChecked, setIsChecked] = useState({});
  const [inputValue, setInputValue] = useState("");
  const toast = useToast();

  const handleInputChange = (e) => setInputValue(e.target.value);

  const addTodo = () => {
    if (inputValue.trim() === "") {
      toast({
        title: "No content",
        description: "Todo can't be empty",
        status: "warning",
        duration: 2000,
        isClosable: true,
      });
      return;
    }
    setTodos([...todos, inputValue]);
    setInputValue("");
  };

  const deleteTodo = (index) => {
    const newTodos = todos.filter((_, i) => i !== index);
    setTodos(newTodos);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      addTodo();
    }
  };

  return (
    <VStack p={8}>
      <Heading mb="8">Todo App</Heading>
      <HStack>
        <Input value={inputValue} onChange={handleInputChange} onKeyPress={handleKeyPress} placeholder="Add a new task..." />
        <IconButton icon={<FaPlus />} onClick={addTodo} colorScheme="blue" aria-label="Add todo" />
      </HStack>
      <Heading mb="4">Active Tasks</Heading>
      <List spacing={3} my={5} w="100%">
        {todos
          .filter((_, index) => !isChecked[index])
          .map((todo, index) => (
            <ListItem key={index} p={2} bg="gray.100" borderRadius="md">
              <HStack justify="space-between">
                <Checkbox colorScheme="green" mr={2} isChecked={isChecked[index]} onChange={() => setIsChecked({ ...isChecked, [index]: !isChecked[index] })}>
                  {todo}
                </Checkbox>
                <IconButton icon={<FaTrash />} onClick={() => deleteTodo(index)} colorScheme="red" aria-label="Delete todo" />
              </HStack>
            </ListItem>
          ))}
      </List>
      <Heading mb="4">Completed Tasks</Heading>
      <List spacing={3} my={5} w="100%">
        {todos
          .filter((_, index) => isChecked[index])
          .map((todo, index) => (
            <ListItem key={index} p={2} bg="gray.100" borderRadius="md" style={{ textDecoration: "line-through", opacity: 0.5 }}>
              <HStack justify="space-between">
                <Checkbox colorScheme="green" mr={2} isChecked={isChecked[index]} onChange={() => setIsChecked({ ...isChecked, [index]: !isChecked[index] })}>
                  {todo}
                </Checkbox>
                <IconButton icon={<FaTrash />} onClick={() => deleteTodo(index)} colorScheme="red" aria-label="Delete todo" />
              </HStack>
            </ListItem>
          ))}
      </List>
    </VStack>
  );
};

export default Index;
