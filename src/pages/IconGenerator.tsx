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
import {
  convertSvgToComponent,
  convertToCamel,
  parseCSSString,
} from "../utils";
import styled from "@emotion/styled";
import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs";
import SyntaxHighlighter from "react-syntax-highlighter/dist/esm/default-highlight";
import Layout from "../components/Layout";

interface IconGeneratorProps {}

const IconGenerator: React.FC<IconGeneratorProps> = () => {
  const [svgString, setSvgString] = useState<string>();
  const [componentString, setComponentString] = useState<string>();
  return (
    <Layout>
      <Flex align="center" justify="center" w="full" h="90vh">
        <Stack w="full" align="center">
          <Flex as="form" p={5} w="full" maxW="1000px" gap={10}>
            <FormControl w="50%">
              <FormLabel>SVG</FormLabel>
              <Textarea
                h="500"
                value={svgString}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                  setSvgString(e.target.value);
                  setComponentString(
                    convertSvgToComponent(
                      e.target.value,
                      convertToCamel("poop poop")
                    )
                  );
                }}
              />
            </FormControl>
            <FormControl w="50%">
              <FormLabel>Component</FormLabel>
              <StyledPre>
                <SyntaxHighlighter language="javascript" style={docco}>
                  {componentString as string}
                </SyntaxHighlighter>
              </StyledPre>
            </FormControl>
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

export default IconGenerator;
