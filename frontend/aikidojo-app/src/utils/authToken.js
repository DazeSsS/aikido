export const getToken = () => localStorage.getItem('token');

export const setToken = (token) => localStorage.setItem('token', token);

export const deleteToken = () => localStorage.removeItem('token');

export const getUserId = () => localStorage.getItem('id');

export const setUserId = (id) => localStorage.setItem('id', id);

export const deleteUserId = () => localStorage.removeItem('id');

export const setUserRole = (role) => localStorage.setItem('userrole', role);

export const getUserRole = () => localStorage.getItem('userrole');

export const deleteUserRole = () => localStorage.removeItem('userrole');
