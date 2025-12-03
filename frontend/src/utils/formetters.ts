export default function formatDate(date: number) {
  const created = new Date(date);
  const formatedDate = `${created.getDate()}.${created.getMonth()}.${created.getUTCFullYear().toString().slice(2)}`;
  return formatedDate;
}
