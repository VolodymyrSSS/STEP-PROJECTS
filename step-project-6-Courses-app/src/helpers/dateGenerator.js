// generate date should be a string in format: "08/06/2021"

export const dateGenerator = (creationDay) => {
  const dd = String(creationDay.getDate()).padStart(2, '0');
  const mm = String(creationDay.getMonth() + 1).padStart(2, '0'); //January is 0!
  const yyyy = creationDay.getFullYear();
  creationDay = dd + '/' + mm + '/' + yyyy;
  // alternative way if creationDay = new Date() will be:
  // toJSON().slice(0,10).replace(/-/g,'/') or toLocaleDateString()
  return creationDay.split('/').join('.');
};
