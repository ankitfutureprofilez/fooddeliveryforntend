export function formatDate(dateString) {
  const date = new Date(dateString);
  if (isNaN(date.getTime())) {
      return 'Invalid Date';
  }
  return date.toISOString().split("T")[0];
}
