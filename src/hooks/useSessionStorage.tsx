export const useSessionStorage = () => {
  const setToken = (token: string) => {
    sessionStorage.setItem('accessToken', token);
  };

  const getToken = () => {
    return sessionStorage.getItem('accessToken');
  };

  const clear = () => {
    sessionStorage.clear();
  };

  return { getToken, setToken, clear };
};
