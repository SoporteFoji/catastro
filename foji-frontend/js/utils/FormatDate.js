
function FormatDate(date) {
  const d = Date.parse(date);
  const nd = new Date(d);
  return nd.getDate() + '/' + (nd.getMonth() + 1 ) + '/' + nd.getFullYear();
}

export default FormatDate;
