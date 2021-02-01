import createDataContext from "./createDataContext";
import jsonServer from "../api/jsonServer";

const reducer = (state, action) => {
  switch (action.type) {
    case "get_blogposts":
      return action.payload;

    case "delete_blogpost":
      return state.filter((blog) => blog.id !== action.payload);
    case "edit_blogpost":
      return state.map((blogPost) => {
        return blogPost.id === action.payload.id ? action.payload : blogPost;
      });
    default:
      return state;
  }
};

const getBlogPosts = (dispatch) => {
  return async () => {
    const response = await jsonServer.get("/blogposts");

    dispatch({ type: "get_blogposts", payload: response.data });
  };
};

// Where is the id for this resource going to be created. In the reducer or in the action function
const addBlogPost = (dispatch) => {
  return async (title, content, cb) => {
    await jsonServer.post(`/blogposts`, { title, content });

    if (cb) {
      cb();
    }
  };
};

const deleteBlogPost = (dispatch) => {
  return async (id) => {
    await jsonServer.delete(`/blogposts/${id}`);

    dispatch({ type: "delete_blogpost", payload: id });
  };
};

const editBlogPost = (dispatch) => {
  return async (id, title, content, cb) => {
    await jsonServer.put(`/blogposts/${id}`, { title, content });
    dispatch({ type: "edit_blogpost", payload: { id, content, title } });
    if (cb) {
      cb();
    }
  };
};

export const { Context, Provider } = createDataContext(
  reducer,
  { addBlogPost, deleteBlogPost, editBlogPost, getBlogPosts },
  []
);
