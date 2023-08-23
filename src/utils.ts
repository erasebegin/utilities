export function parseCSSString(
  css: string,
  sortAlphabetically = false
): string {
  const cssArray = css.split(";").filter((x) => x);
  const cssObject: { [key: string]: string } = {};

  cssArray.forEach((pair) => {
    const [key, value] = pair.split(":").map((x) => x.trim());
    cssObject[key] = value;
  });

  if (sortAlphabetically) {
    const sortedObject: { [key: string]: string } = {};
    Object.keys(cssObject)
      .sort()
      .forEach(function (key) {
        sortedObject[key] = cssObject[key];
      });
    return JSON.stringify(sortedObject, null, 2);
  }

  return JSON.stringify(cssObject, null, 2);
}

export function convertSvgToComponent(
  svgString: string,
  componentName: string
) {
  const svgXml = new DOMParser().parseFromString(svgString, "text/xml");
  const svgPath = svgXml.getElementsByTagName("path")[0];
  const svgContainer = svgXml.getElementsByTagName("svg")[0]

  if (!svgPath) return;

  return `
  import React from 'react';
  import { Icon } from '@chakra-ui/react';

  const ${componentName} = (props: any) => (
    <Icon viewBox={'${svgContainer.getAttribute("viewBox")}'} {...props}>
        <title>${componentName}</title>
        <path
          fill={props.color}
          d='${svgPath.getAttribute("d")}'
        />
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

export function convertToPascal(str: string) {
  return str
    .split(" ")
    .map(function (word: string) {
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join("");
}
