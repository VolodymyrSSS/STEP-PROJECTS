export const register = async (newUser) => {
  try {
    const response = await fetch('http://localhost:4000/register', {
      method: 'POST',
      body: JSON.stringify(newUser),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    await response.json();
  } catch (error) {
    throw error;
  }
};

export const login = async (registeredUser) => {
  try {
    const response = await fetch('http://localhost:4000/login', {
      method: 'POST',
      body: JSON.stringify(registeredUser), // data to send (request body)
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const userData = await response.json(); // converts the response to a JSON object
    const { result, successful, user } = userData;

    localStorage.setItem('token', JSON.stringify(result));
    localStorage.setItem('successful', JSON.stringify(successful));
    localStorage.setItem('user', JSON.stringify(user));
    return userData;
  } catch (error) {
    throw error;
  }
};

export const getUser = async () => {
  try {
    const token = localStorage.getItem('token').slice(1, -1); // The token has no quotes

    const response = await fetch('http://localhost:4000/users/me', {
      method: 'GET',
      headers: {
        Authorization: token,
        'Content-Type': 'application/json',
      },
    });
    const { result } = await response.json();
    return result;
  } catch (error) {
    throw error;
  }
};

export const fetchCourses = async () => {
  try {
    const response = await fetch('http://localhost:4000/courses/all', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(),
    });
    const { result } = await response.json();
    return result;
  } catch (error) {
    throw error;
  }
};

export const addNewCourse = async (addedCourse) => {
  try {
    const token = localStorage.getItem('token').slice(1, -1);

    const response = await fetch('http://localhost:4000/courses/add', {
      method: 'POST',
      headers: {
        Authorization: token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(addedCourse),
    });
    const { result } = await response.json();
    return result;
  } catch (error) {
    throw error;
  }
};

export const updateOneCourse = async (id, updatedCourseData) => {
  try {
    const token = localStorage.getItem('token').slice(1, -1);

    const response = await fetch('http://localhost:4000/courses/' + id, {
      method: 'PUT',
      headers: {
        Authorization: token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedCourseData),
    });
    if (!response.ok) throw Error('Did not receive expected course data');
    const { result } = await response.json();
    return result;
  } catch (error) {
    throw error.message;
  }
};

export const deleteOneCourse = async (id) => {
  try {
    const token = localStorage.getItem('token').slice(1, -1);

    const response = await fetch('http://localhost:4000/courses/' + id, {
      method: 'DELETE',
      headers: {
        Authorization: token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(),
    });
    return response.ok;
  } catch (error) {
    throw error;
  }
};

export const fetchAuthors = async () => {
  try {
    const response = await fetch('http://localhost:4000/authors/all', {
      method: 'GET',
      body: JSON.stringify(),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const { result } = await response.json();
    return result;
  } catch (error) {
    throw error;
  }
};

export const deleteOneAuthor = async (id) => {
  try {
    const token = localStorage.getItem('token').slice(1, -1);

    const response = await fetch('http://localhost:4000/authors/' + id, {
      method: 'DELETE',
      headers: {
        Authorization: token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(),
    });
    return response.ok;
  } catch (error) {
    throw error;
  }
};

export const addNewAuthor = async (addedAuthor) => {
  try {
    const token = localStorage.getItem('token').slice(1, -1);

    const response = await fetch('http://localhost:4000/authors/add', {
      method: 'POST',
      headers: {
        Authorization: token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(addedAuthor),
    });
    const { result } = await response.json();
    return result;
  } catch (error) {
    throw error;
  }
};

export const logout = async () => {
  try {
    const token = localStorage.getItem('token').slice(1, -1);

    const response = await fetch('http://localhost:4000/logout', {
      method: 'DELETE',
      headers: {
        Authorization: token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(),
    });
    return response.ok;
  } catch (error) {
    throw error;
  }
};
