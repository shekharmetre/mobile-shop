import axios from "axios";

export async function checkUserLoggedIn() {
  try {
    const response = await axios.get('/api/auth/check');

    if (response.status === 200 && response.data.loggedIn) {
      return { loggedIn: true, user: response.data.user };
    }
    return { loggedIn: false };
  } catch (error) {
    return { loggedIn: false, error: error || 'Unknown error' };
  }
}
