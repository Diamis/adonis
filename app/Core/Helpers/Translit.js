const ru = {
  а: "a",
  б: "b",
  в: "v",
  г: "g",
  д: "d",
  е: "e",
  ё: "e",
  ж: "j",
  з: "z",
  и: "i",
  к: "k",
  л: "l",
  м: "m",
  н: "n",
  о: "o",
  п: "p",
  р: "r",
  с: "s",
  т: "t",
  у: "u",
  ф: "f",
  х: "h",
  ц: "c",
  ч: "ch",
  ш: "sh",
  щ: "shch",
  ы: "y",
  э: "e",
  ю: "u",
  я: "ya",
};

const toLatin = (str) => {
  if (!str) return "";

  str = str.trim();
  str = str.toLowerCase();
  str = str.replace(/\./g, "");
  str = str.replace(/\,/g, "");
  str = str.replace(/[ъь]+/g, "");
  str = str.replace(/\s{2,}/g, " ");
  str = str.replace(/й/g, "i").replace(/\s/g, "-");

  const res = [];
  for (let i = 0; i < str.length; i++) {
    res.push(ru[str[i]] || (ru[str[i]] === undefined && str[i]));
  }
  return res.join("");
};

module.exports = {
  toLatin,
};
