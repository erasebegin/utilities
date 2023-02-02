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

  if (!svgPath) return;

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

export function convertToPascal(str: string) {
  return str
    .split(" ")
    .map(function (word: string) {
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join("");
}
