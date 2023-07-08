import {
  Flex,
  Box,
  Stack,
  Heading,
  Text,
  useColorModeValue,
  Th,
  Tr,
  Td,
  Tbody,
  TableContainer,
  Table,
  Thead,
  Spinner,
  Image,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";

export default function UserList() {
  const { REACT_APP_API_URL } = process.env;
  const [data, setData] = useState([]);
  let [page, setPage] = useState(1);
  useEffect(() => {
    fetchData(page);
  }, [page]);
  function fetchData(page) {
    fetch(`${REACT_APP_API_URL}?_page=${page}&_limit=20`)
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return Promise.reject({
            status: res.status,
            statusText: res.statusText,
          });
        }
      })
      .then((res) => {
        if (page > 1) {
          let resultAr = [...data, ...res];
          setData(resultAr);
        } else {
          setData(res);
        }
      })
      .catch((err) => console.log("Error, with message:", err.statusText));
  }
  const loadMoreHandle = (i) => {
    let bottom =
      i.target.scrollHeight - i.target.clientHeight - i.target.scrollTop < 50;
    if (bottom) {
      setTimeout(() => {
        let page_num = page + 1;
        fetchData(page_num);
        setPage(page_num);
      }, 1000);
    }
  };
  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"}>User List</Heading>
          <Text fontSize={"lg"} color={"gray.600"}></Text>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"dark-lg"}
          p={4}
        >
          <TableContainer
            onScroll={loadMoreHandle}
            style={{ overflowY: "auto", height: "500px", width: "400px" }}
          >
            <Table variant="striped" colorScheme="teal">
              <Thead position={"sticky"} top={0} zIndex={"1"} bg={"white"}>
                <Tr>
                  <Th>#</Th>
                  <Th>Name</Th>
                  <Th>Avatar</Th>
                </Tr>
              </Thead>
              <Tbody>
                {data ? (
                  data.map((itm, i) => {
                    return (
                      <Tr key={i}>
                        <Td className="text-start align-middle">{i + 1}</Td>
                        <Td className="text-start align-middle">
                          {itm.username}
                        </Td>
                        <Td>
                          <Image
                            borderRadius={"full"}
                            border={"1px solid black"}
                            src={itm.avatar}
                            alt={`${itm.username}s avtar`}
                          />
                        </Td>
                      </Tr>
                    );
                  })
                ) : (
                  <Text> No Users to show</Text>
                )}
              </Tbody>
            </Table>
            <Stack
              display={"flex"}
              justifyContent={"center"}
              alignContent={"center"}
              alignItems={"center"}
              textAlign={"center"}
              align={"center"}
              margin={"auto"}
            >
              {page <= 10 ? (
                <Spinner
                  thickness="4px"
                  speed="0.65s"
                  emptyColor="gray.200"
                  color="blue.500"
                  size="xl"
                />
              ) : (
                <Text> No Users to show</Text>
              )}
            </Stack>
          </TableContainer>
        </Box>
      </Stack>
    </Flex>
  );
}
