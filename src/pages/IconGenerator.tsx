import {
  Flex,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Textarea,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { convertSvgToComponent, convertToPascal } from "../utils";
import styled from "@emotion/styled";
import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs";
import SyntaxHighlighter from "react-syntax-highlighter/dist/esm/default-highlight";
import Layout from "../components/Layout";

interface IconGeneratorProps {}

const IconGenerator: React.FC<IconGeneratorProps> = () => {
  const [svgString, setSvgString] = useState<string>();
  const [componentString, setComponentString] = useState<string>();
  const [title, setTitle] = useState<string>();

  useEffect(() => {
    if (!svgString) return;

    setComponentString(
      convertSvgToComponent(
        svgString as string,
        convertToPascal(title || "Title")
      )
    );
  }, [svgString, title]);

  return (
    <Layout>
      <Flex align="center" justify="center" w="full" h="90vh">
        <Stack w="full" align="center">
          <FormControl maxW="1000px" p={5}>
            <FormLabel>Title</FormLabel>
            <Input
              placeholder="Give the component a name :)"
              value={title}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setTitle(e.target.value)
              }
            />
          </FormControl>
          <Flex as="form" p={5} w="full" maxW="1000px" gap={10}>
            <FormControl w="50%">
              <FormLabel>SVG</FormLabel>
              <Textarea
                h="500"
                value={svgString}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                  setSvgString(e.target.value);
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
