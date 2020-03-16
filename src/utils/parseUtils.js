/*
 * Extract unique tokens from entry, removing special characters
 * and splitting on spaces/hyphens
 */
export const uniqueTokensFromEntry = entry => {
  return [...new Set(allTokensFromEntry(entry))];
};

/*
 * Extract all tokens from entry, removing special characters
 * and splitting on spaces/hyphens
 */
export const allTokensFromEntry = entry => {
  return entry
    .trim()
    .replace(/[.,\\/#!$%^&*;:{}=_`~()?]/g, "")
    .replace(/\s{2,}/g, " ")
    .split(/[\s-]/);
};
