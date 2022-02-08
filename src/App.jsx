import "./App.css";
import React, { useState, useEffect } from "react";
import {
  Button,
  Stack,
  Box,
  Input,
  Modal,
  Text,
  useToast,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  useDisclosure,
  Heading,
} from "@chakra-ui/react";

function App() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const [items, setItems] = useState([]);
  const [nombreLista, setNombreLista] = useState("");

  function manejarLista() {
    if (nombreLista === "") {
      toast({
        title: "ingrese un producto.",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    } else {
      setItems((items) => {
        return items.concat({
          nombre: nombreLista,
          id: +new Date(),
        });
      });
      setNombreLista("");
    }
  }

  function handleDelete(id) {
    const listaFiltrada = items.filter((item) => item.id !== id);
    setItems(listaFiltrada);
  }

  useEffect(() => {
    const data = localStorage.getItem("super");
    if (data) {
      setItems(JSON.parse(data));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("super", JSON.stringify(items));
  }, [items]);
  return (
    <Stack className="App">
      <Box mt={40} display="flex" justifyContent="center">
        <Stack direction="column">
          <Heading fontWeight={500} mb={4}>
            Supermarket List
          </Heading>
          <Text textAlign="center" fontWeight={700}>
            {items.length} item(s)
          </Text>
        </Stack>
      </Box>
      <Stack alignItems="center">
        <Box background="gray.100" m={3}>
          {items.map((item) => {
            return (
              <Stack
                direction="row"
                alignItems="center"
                display="flex"
                justifyContent="space-around"
                w={550}
                m={3}
              >
                <Text>{item.nombre}</Text>
                <Button onClick={() => handleDelete(item.id)} colorScheme="red">
                  delete
                </Button>
              </Stack>
            );
          })}
        </Box>
      </Stack>
      <Stack direction="row" justifyContent="center">
        <Button onClick={onOpen} colorScheme="blue">
          Add Item
        </Button>

        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader textAlign="center">Add item</ModalHeader>

            <ModalBody>
              <Stack>
                <Input
                  value={nombreLista}
                  onChange={(event) => {
                    setNombreLista(event.target.value);
                  }}
                ></Input>
              </Stack>
            </ModalBody>

            <ModalFooter
              direction="row"
              justifyContent="center"
              alignContent="center"
            >
              <Button colorScheme="gray" onClick={onClose} m={2}>
                Close
              </Button>
              <Button colorScheme="blue" onClick={manejarLista}>
                Add
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Stack>
    </Stack>
  );
}

export default App;
