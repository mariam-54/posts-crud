import axios from "axios";
import {
  AddRequest,
  RemoveRequest,
  UpdateRequest,
  getAllRequestFail,
  getAllRequestSuccess,
  getbycodeSuccess,
  makeRequest,
} from "./Action";
import { toast } from "react-toastify";

export const GetAllPosts = () => {
  return (dispatch) => {
    dispatch(makeRequest());
    setTimeout(() => {
      axios
        .get("https://jsonplaceholder.typicode.com/posts")
        .then((res) => {
          dispatch(getAllRequestSuccess(res.data));
        })
        .catch((error) => {
          dispatch(getAllRequestFail(error.message));
        });
    }, 2000);
  };
};

export const GetPostsByCode = (code) => {
  return (dispatch) => {
    // dispatch(makeRequest());
    axios
      .get("https://jsonplaceholder.typicode.com/posts/" + code)
      .then((res) => {
        const _obj = res.data;
        dispatch(getbycodeSuccess(_obj));
      })
      .catch((err) => {
        toast.error("Failed to fetch the data");
      });
  };
};

export const CreatePost = (data) => {
  return (dispatch) => {
    axios
      .post("https://jsonplaceholder.typicode.com/posts", data)
      .then((res) => {
        dispatch(AddRequest(data));
        toast.success("Post Created Successfully.");
      })
      .catch((error) => {
        toast.error("Failed to create post due to :" + error.message);
      });
  };
};

export const UpdatePost = (data) => {
  return (dispatch) => {
    axios
      .put("https://jsonplaceholder.typicode.com/posts/" + data.id, data)
      .then((res) => {
        dispatch(UpdateRequest(data));
        toast.success("Post Updated Successfully.");
      })
      .catch((error) => {
        toast.error("Failed to update post due to :" + error.message);
      });
  };
};

export const RemovePost = (code) => {
  return (dispatch) => {
    axios
      .delete("https://jsonplaceholder.typicode.com/posts/" + code)
      .then((res) => {
        dispatch(RemoveRequest(code));
        toast.success("Post Removed Successfully.");
      })
      .catch((error) => {
        toast.error("Failed to remove post due to :" + error.message);
      });
  };
};
