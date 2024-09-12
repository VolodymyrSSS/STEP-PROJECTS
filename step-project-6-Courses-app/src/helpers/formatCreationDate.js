// Creation date format should be: dd.mm.yyyy

export const formatCreationDate = (creationDay) =>
  creationDay.split('/').join('.');
