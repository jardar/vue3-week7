export function ToSimpleDate(ts, sep = "/") {
  if (typeof ts !== "number") {
    return ts;
  }
  const d = new Date(ts);
  const month = d.getMonth() + 1;
  const day = d.getDate();

  return `${d.getFullYear()}${sep}${month < 10 ? "0" + month : month}${sep}${
    day < 10 ? "0" + day : day
  }`;
}
