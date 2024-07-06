import axios from 'axios';

export const getApiResource = async (url, headers = {}) => {
  try {
    const res = await axios.get(url, headers);

    if (!res.status === 200) {
      console.error('Could not fetch.', res.status);
      return false;
    }

    return res.data;
  } catch (error) {
    console.error('Could not fetch.', error.message);
    return false;
  }
};

export const postApiResource = async (url, options = {}) => {
  try {
    const res = await axios.post(url, options.body);
    console.log(res, res.status, res.statusText);

    if (res.status !== 200 && res.status !== 201) {
      console.error('Could not post', res.status);
      return false;
    }

    return res.data;
  } catch (error) {
    console.error('Could not post.', error.message);
    return false;
  }
};

export const patchApiResource = async (url, body, headers = {}) => {
  try {
    const res = await axios.patch(url, body, { headers });
    console.log(res, res.status, res.statusText);

    if (res.status !== 200 && res.status !== 201) {
      console.error('Could not post', res.status);
      return false;
    }

    return res.data;
  } catch (error) {
    console.error('Could not post.', error.message);
    return false;
  }
};
