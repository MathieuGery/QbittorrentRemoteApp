import request from './APIKit';

async function login(data) {
  return request({
    url: '/auth/login',
    method: 'POST',
    data,
  });
}

const authServices = {
  login,
};

export default qbittorrentServices;
