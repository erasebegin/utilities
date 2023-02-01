import { List, ListItem, Heading, Box } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import Layout from "../components/Layout";

const Menu: React.FC = () => {
  return (
    <div>
      <Layout>
        <Box w="full" h="80vh" p="10" pt="20%">
          <List
            spacing={10}
            p={3}
            border="1px"
            borderColor="gray.400"
            borderRadius="md"
            maxW="300px"
            margin="auto"
          >
            <ListItem>
              <Link to="/css-converter">
                <Heading size="md" _hover={{ textDecoration: "underline" }}>
                  CSS Converter
                </Heading>
              </Link>
            </ListItem>
            <ListItem>
              <Link to="/icon-generator">
                <Heading size="md" _hover={{ textDecoration: "underline" }}>
                  Icon Generator
                </Heading>
              </Link>
            </ListItem>
          </List>
        </Box>
      </Layout>
    </div>
  );
};

export default Menu;
