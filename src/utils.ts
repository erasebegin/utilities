export function parseCSSString(
  str: string,
  sortAlphabetical: boolean = true
): string {
  let cssArr = [];
  if (sortAlphabetical) {
    cssArr = str
      .trim()
      .split(";")
      .slice(0, -1)
      .sort((a: any, b: any) => {
        if (a < b) {
          return -1;
        }
        if (a > b) {
          return 1;
        }
        return 0;
      });
  } else {
    cssArr = str.trim().split(";").slice(0, -1);
  }

  const cssArrSplit = cssArr.map((cssLine: string) => cssLine.split(":"));

  const formatSides = cssArrSplit.map((cssLineArr: string[]) => {
    const leftSide = cssLineArr[0]
      // remove empty space (new lines and spaces),
      .replace(/\s/g, "")
      // then change kebab-case to camelCase
      .replace(/-([a-z])/g, (match, char) => char.toUpperCase());

    // regex is to fine all white-space characters and replace them with a single space
    const rightSide = `"${cssLineArr[1].trim().replace(/\s+/g, " ")}"`;

    return [leftSide, rightSide];
  });
  const joinSides = formatSides.map((cssLineArr: string[]) => {
    return `${cssLineArr[0]}: ${cssLineArr[1]}`;
  });

  let outputString = "{";

  joinSides.forEach((line: string, index) => {
    if (index < joinSides.length - 1) {
      outputString += `\n    ${line},`;
    }

    if (index === joinSides.length - 1) {
      outputString += `\n    ${line}\n}`;
    }
  });

  console.log({
    str,
    cssArr,
    cssArrSplit,
    formatSides,
    joinSides,
    outputString,
  });

  return outputString;
}

export function convertSvgToComponent(
  svgString: string,
  componentName: string
) {
  const svgXml = new DOMParser().parseFromString(svgString, "text/xml");
  const svgPath = svgXml.getElementsByTagName("path")[0];

  return `
  import React from 'react';
  import { Icon } from '@chakra-ui/react';

  const ${componentName} = (props) => (
    <Icon viewBox={'0 0 48 48'} {...props}>
      <svg xmlns='http://www.w3.org/2000/svg' height={props.height} width={props.width}>
        <path
          fill={props.color}
          d='${svgPath.getAttribute("d")}'
        />
      </svg>
    </Icon>
  );

  export default ${componentName};
  `;
}

export function convertToCamel(str: string) {
  let result = str.replace(
    /[^a-zA-Z0-9]+(.)/g,
    function (match: string, char: string) {
      return char.toUpperCase();
    }
  );
  return result;
}
