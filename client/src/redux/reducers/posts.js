import {
  DELETE,
  FETCH_ALL,
  CREATE,
  UPDATE,
  LIKE,
  SEARCH,
  START_LOADING,
  END_LOADING,
  FETCH_POST,
  FETCH_BY_CREATOR,
  COMMENT,
} from "../constants/actionTypes";

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = { isLoading: true, posts: [] }, action) {
  switch (action.type) {
    case START_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case END_LOADING:
      return {
        ...state,
        isLoading: false,
      };
    case FETCH_ALL:
      return {
        ...state,
        posts: action.payload.data,
        currentPage: action.payload.currentPage,
        numberOfPage: action.payload.numberOfPage,
      };
    case SEARCH:
    case FETCH_BY_CREATOR:
      return {
        ...state,
        posts: action.payload.data,
      };
      case COMMENT:
        return {
          ...state,
          posts: state.posts.map((post) => {
            if (post._id === +action.payload._id) {
              return action.payload;
            }
            return post;
          }),
        };
    case FETCH_POST:
      return {
        ...state,
        post: action.payload,
      };
    case DELETE:
      return {
        ...state,
        posts: state.posts.filter((post) => post._id !== action.payload),
      };
    case UPDATE:
    case LIKE:
      return {
        ...state,
        posts: state.posts.map((post) =>
          post._id === action.payload._id ? action.payload : post
        ),
      };
    case CREATE:
      return { ...state, posts: [...state.posts, action.payload] };
    default:
      return state;
  }
}
