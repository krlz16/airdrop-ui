
export const formatDate = (date: Date) => {
  const newDate = date.toUTCString().split(':');
  return newDate[0].concat(`:${newDate[1]} GMT`);
}