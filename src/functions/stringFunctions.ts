export function formatDecimal(number: number, x: number, y: number): string {
  const result = number / 10 ** x;
  const formattedResult = parseFloat(result.toFixed(y)).toLocaleString();
  return formattedResult;
}

export function formatDate(inputDate: string) {
  const date = new Date(inputDate);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  return `${year}/${month}/${day} ${hours}:${minutes}`;
}

export const reduceString = (
  str: string,
  from: number,
  end: number
): string => {
  if (str.length <= from + end) {
    return str;
  }

  return str
    ? str.substring(0, from) + "..." + str.substring(str.length - end)
    : "-";
};

export const copy = (text: string) => {
  window.navigator.clipboard.writeText(text).then(() => {
    alert(`"${text}" Copied`);
  });
};

export const extractMessageName = (msg: string): string => {
  const match = msg.match(/\.([^.]*)$/);
  if (match) {
    return match[1];
  } else {
    return msg;
  }
};
