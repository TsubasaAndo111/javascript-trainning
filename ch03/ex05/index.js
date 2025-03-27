export function crlftolf(str) {
  return str.replace(/\r\n/g, "\n");
}

export function lftocrlf(str) {
  return str.replace(/\n/g, "\r\n");
}
