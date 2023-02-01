import {
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  Stack,
  Text,
  Textarea,
} from "@chakra-ui/react";
import { useState } from "react";
import { parseCSSString } from "../utils";
import styled from "@emotion/styled";
import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs";
import SyntaxHighlighter from "react-syntax-highlighter/dist/esm/default-highlight";
import Layout from "../components/Layout";

const CssConverter: React.FC = () => {
  const [cssString, setCssString] = useState<string>("");
  const [jsString, setJsString] = useState<string>("");
  const [sortAlphabetical, setSortAlphabetical] = useState<any>(false);
  
  return (
    <Layout>
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
    </Layout>
  );
};

const StyledPre = styled.div`
  pre {
    height: 500px;
  }
`;

export default CssConverter;
