const camelToSnakeCase = (str) => {
  return str.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);
};

const snakeToCamelCase = (s) => {
  return s.replace(/([-_][a-z])/gi, ($1) => {
    return $1.toUpperCase().replace("-", "").replace("_", "");
  });
};

const objectToSnakeCase = (data) => {
  return Object.keys(data).reduce((prev, curr) => {
    const key = camelToSnakeCase(curr);
    prev[key] = data[curr];
    return prev;
  }, {});
};

module.exports = {
  camelToSnakeCase,
  snakeToCamelCase,
  objectToSnakeCase,
};
