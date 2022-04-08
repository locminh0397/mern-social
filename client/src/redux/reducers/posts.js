import {DELETE, FETCH_ALL, CREATE, UPDATE, LIKE} from '../constants/actionTypes'

// eslint-disable-next-line import/no-anonymous-default-export
export default function (posts = [], action) {
  switch (action.type) {
    case FETCH_ALL:
      return action.payload;
    case DELETE:
      return posts.filter((post) => post._id !== action.payload);
    case UPDATE:
    case LIKE:
      return posts.map((post) =>
        post._id === action.payload._id ? action.payload : post
      );
    case CREATE:
      return [...posts, action.payload];
    default:
      return posts;
  }
}
