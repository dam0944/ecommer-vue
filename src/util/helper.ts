export function formatDateClient(
  input: string | Date,
  locale = 'th-TH',
  timeZone = 'Asia/Bangkok'
): string {
  const date = typeof input === 'string' ? new Date(input) : input;
  return date.toLocaleString(locale, {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    timeZone,
  });
}

export function formatDateServer(input: string | Date): string {
  const date = typeof input === 'string' ? new Date(input) : input;
  const pad = (n: number) => n.toString().padStart(2, '0');
  return (
    `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())} ` +
    `${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`
  );
}