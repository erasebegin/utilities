export function parseCSSString(cssText: string): string {
  const cssTxt = cssText.replace(/\/\*(.|\s)*?\*\//g, " ").replace(/\s+/g, " ");
  const style = {},
    [, ruleName, rule] = cssTxt.match(/ ?(.*?) ?{([^}]*)}/) || [, , cssTxt];
  const cssToJs = (s: string) =>
    s.replace(/\W+\w/g, (match: string) => match.slice(-1).toUpperCase());
  const properties = rule
    .split(";")
    .map((o) => o.split(":").map((x) => x && x.trim()));
  for (const [property, value] of properties) style[cssToJs(property)] = value;
  console.log({style})
  return objectToString(style);
}

export function objectToString(object: {}): string {
  let str = "";
  for (let i in object) {
    str += "    " + i + ": " + object[i] + ", \n";
  }
  str = str.substring(0, str.length - 2);

  if (str.length > 1) {
    return "{\n" + str + "\n}";
  }

  return "{ }";
}
