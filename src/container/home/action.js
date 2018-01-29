import request from 'xhr-request';

export const UPDATE_USER_LIST = 'UPDATE_USER_LIST';

export const THROW_ERR = 'THROW_ERR';

export const getList = () => (dispath, getState) => {
  request('http://localhost:8388/user/list', {
    json: true,
    method: 'post',
  }, function (err, data) {
    if (err) {
      dispath({
        type: THROW_ERR,
        payload: err,
      });
      reject(err);
    } else {
      dispath({
        type: UPDATE_USER_LIST,
        payload: data.list,
      });
      resolve(data);
    }
  });
}
