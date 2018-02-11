import request from 'xhr-request';
import THROW_ERR from '../../components/error/action';

export const TOOGLE_BLANK_VISIBLE = 'TOOGLE_BLANK_VISIBLE';

export const UPDATE_USER_LIST = 'UPDATE_USER_LIST';

export const toogleBlankVisible = () => (dispatch, getState) => {
  const { blankVisible } = getState().home;

  dispatch({
    type: TOOGLE_BLANK_VISIBLE,
    payload: !blankVisible
  });
}

/**
 * return Promise
 * https://stackoverflow.com/questions/36189448/want-to-do-dispatch-then
 */
export const getUserList = () => dispath => {
  return new Promise((resolve, reject) => {
    request('http://localhost:8388/user/list', {
      json: true,
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
  })
}
