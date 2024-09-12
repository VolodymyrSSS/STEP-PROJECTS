export const register = async (newUser) => {
  const response = await fetch('http://localhost:4000/register', {
    method: 'POST',
    body: JSON.stringify(newUser),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  await response.json();
};
