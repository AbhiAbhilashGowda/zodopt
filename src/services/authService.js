const API_URL = 'http://example.com/api'; // Replace with your API URL

export const login = async (credentials) => {
  const response = await fetch(`${API_URL}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials),
  });
  const data = await response.json();
  if (response.ok) {
    return data;
  }
  throw new Error(data.message || 'Login failed');
};

export const register = async (userData) => {
  const response = await fetch(`${API_URL}/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData),
  });
  const data = await response.json();
  if (response.ok) {
    return data;
  }
  throw new Error(data.message || 'Registration failed');
};

export const logout = () => {
  // Clear user session or token if applicable
};
