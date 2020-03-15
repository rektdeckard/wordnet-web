export const uniqueTokensFromEntry = entry => {
  return [...new Set(allTokensFromEntry(entry))];
};

export const allTokensFromEntry = entry => {
  return entry
    .trim()
    .replace(/[.,\\/#!$%^&*;:{}=_`~()?]/g, "")
    .replace(/\s{2,}/g, " ")
    .split(/[\s-]/);
};
