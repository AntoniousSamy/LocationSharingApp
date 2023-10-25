import { SET_USER_NAME, SET_USER_ID, SET_USER_IMAGE,SET_USER_EMAIL } from "./actions";

const initialState = {
  name: " ",
  uid: null,
  image: null,
  email:null
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_NAME:
      return { ...state, name: action.payload };
    case SET_USER_ID:
      return { ...state, uid: action.payload };
    case SET_USER_IMAGE:
      return { ...state, image: action.payload }; 
      case SET_USER_EMAIL:
        return { ...state, email: action.payload }; 
    default:
      return state;
  }
};

export default userReducer;
