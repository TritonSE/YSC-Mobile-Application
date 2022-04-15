export const reverseFenString = (fen: string) => {
  const reverseString = (str) => str.split("").reverse().join("");
  const trailingText = fen.split("/").slice(-1)[0].split(" ").slice(1).join(" ");
  const splitArray = fen
    .split("/")
    .slice(0, -1)
    .concat([fen.split("/").slice(-1)[0].split(" ")[0]]);
  for (let i = 0; i < splitArray.length; i++) {
    splitArray[i] = reverseString(splitArray[i].split()[0]);
  }
  return splitArray
    .reverse()
    .slice(0, -1)
    .concat(splitArray.slice(-1) + " " + trailingText)
    .join("/");
};
