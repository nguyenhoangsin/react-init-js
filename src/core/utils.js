import jwtDecode from 'jwt-decode';

const getDataToken = (token) => {
  if (token) {
    try {
      return jwtDecode(token);
    } catch (error) {
      return null;
    }
  } else {
    return null;
  }
};

export {
  getDataToken,
};
