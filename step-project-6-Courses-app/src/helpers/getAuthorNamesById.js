export const getAuthorNamesById = (authors) => {
  return authors
    .map((id) => [].find((author) => author.id === id)?.name)
    .join(', ');
};
