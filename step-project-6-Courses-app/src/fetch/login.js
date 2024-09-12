export const login = async (newUser) => {
  try {
    const response = await fetch('http://localhost:4000/login', {
      method: 'POST',
      body: JSON.stringify(newUser),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const { result, successful, user } = await response.json();

    // The keys and values of the object in a localStorage must be strings
    localStorage.setItem('token', JSON.stringify(result));
    localStorage.setItem('successful', JSON.stringify(successful));
    localStorage.setItem('user', JSON.stringify(user));
  } catch (error) {
    console.error('Error:', error);
  }
};
