export let getSuccessStatus = () => {
  try {
    return JSON.parse(localStorage.getItem('successful'));
  } catch (err) {
    alert(err.message);
    return false;
  }
};
