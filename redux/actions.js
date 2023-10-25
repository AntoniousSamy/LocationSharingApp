export const SET_USER_NAME = "SET_USER_NAME";
export const SET_USER_ID = "SET_USER_ID";
export const SET_USER_IMAGE = "SET_USER_IMAGE";
export const SET_USER_EMAIL = "SET_USER_EMAIL";

export const setName = (name) => (dispatch) => {
  dispatch({
    type: SET_USER_NAME,
    payload: name,
  });
};

export const setId = (uid) => (dispatch) => {
  dispatch({
    type: SET_USER_ID,
    payload: uid,
  });
};

export const setImage = (imageUri) => (dispatch) => {
  dispatch({
    type: SET_USER_IMAGE,
    payload: imageUri,
  });
};

export const setEmail = (email) => (dispatch) => {
  dispatch({
    type: SET_USER_EMAIL,
    payload: email,
  });
};
