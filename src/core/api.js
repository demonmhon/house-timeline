import axios from 'axios';
import { getConfig } from './config';

const getBaseURL = () => {
  const { api } = getConfig();
  const { baseURL, version } = api;
  const v = version ? `/${version}` : '';

  return `${baseURL}${v}`;
};

export default {
  async getHealth() {
    return await axios
      .request({
        baseURL: getBaseURL(),
        method: 'get',
        url: '/health',
      })
      .then((response) => response.data)
      .catch(() => null);
  },
};
