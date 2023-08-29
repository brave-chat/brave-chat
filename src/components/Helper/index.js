const componentColors = [
  "amber",
  "brown",
  "orange",
  "purple",
  "primary",
  "red",
  "green",
  "blue",
  "grey",
  "yellow",
  "secondary",
];

const isValidEmail = (value) => {
  return value && /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,8}$/i.test(value);
};

const checkHtml = (value) => {
  return value && /<([A-Za-z][A-Za-z0-9]*)\b[^>]*>(.*?)<\/\1>/.test(value);
};

export { componentColors, isValidEmail, checkHtml };
