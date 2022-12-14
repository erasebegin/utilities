import {
  Textarea,
  FormControl,
  FormLabel,
  Heading,
  Flex,
  Box,
  Checkbox,
  Text,
  Stack,
} from "@chakra-ui/react";
import styled from "@emotion/styled";
import { useState } from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs";

import { parseCSSString } from "./utils";

function App() {
  const [cssString, setCssString] = useState<string>("");
  const [jsString, setJsString] = useState<string>("");
  const [sortAlphabetical, setSortAlphabetical] = useState<any>(false);

  return (
    <div className="App">
      <Box
        p={5}
        bg="green.400"
        shadow="
                2.8px 2.8px 2.2px rgba(0, 0, 0, 0.02),
                6.7px 6.7px 5.3px rgba(0, 0, 0, 0.028),
                12.5px 12.5px 10px rgba(0, 0, 0, 0.035),
                22.3px 22.3px 17.9px rgba(0, 0, 0, 0.042),
                41.8px 41.8px 33.4px rgba(0, 0, 0, 0.05),
                100px 100px 80px rgba(0, 0, 0, 0.07)
              ;"
      >
        <Heading color="white">Utilities</Heading>
      </Box>
      <Flex align="center" justify="center" w="full" h="90vh">
        <Stack w="full" align="center">
          <Flex as="form" p={5} w="full" maxW="1000px" gap={10}>
            <FormControl w="50%">
              <FormLabel>CSS</FormLabel>
              <Textarea
                h="500"
                value={cssString}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                  setCssString(e.target.value);
                  setJsString(parseCSSString(e.target.value, sortAlphabetical));
                }}
              />
            </FormControl>
            <FormControl w="50%">
              <FormLabel>Javascript</FormLabel>
              <StyledPre>
                <SyntaxHighlighter language="javascript" style={docco}>
                  {jsString}
                </SyntaxHighlighter>
              </StyledPre>
            </FormControl>
          </Flex>
          <Flex gap={3} w="full" maxW="1000px" p={5}>
            <Text>Sort alphabetical</Text>
            <Checkbox
              value={sortAlphabetical}
              onChange={() => setSortAlphabetical(!sortAlphabetical)}
            />
          </Flex>
        </Stack>
      </Flex>
    </div>
  );
}

const StyledPre = styled.div`
  pre {
    height: 500px;
  }

`

export default App;
