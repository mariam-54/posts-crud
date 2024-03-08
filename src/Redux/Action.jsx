import {
  MAKE_REQ,
  REQ_GETALL_FAIL,
  REQ_GETALL_SUCC,
  REQ_ADD_SUCC,
  OPEN_FORM,
  REQ_GETBYCODE_SUCC,
  REQ_UPDATE_SUCC,
  REQ_DELETE_SUCC,
} from "./ActionStatus";

export const makeRequest = () => {
  return {
    type: MAKE_REQ,
  };
};

export const getAllRequestSuccess = (data) => {
  return {
    type: REQ_GETALL_SUCC,
    payload: data,
  };
};

export const getAllRequestFail = (err) => {
  return {
    type: REQ_GETALL_FAIL,
    payload: err,
  };
};

export const OpenForm = () => {
  return {
    type: OPEN_FORM,
  };
};

export const AddRequest = (data) => {
  return {
    type: REQ_ADD_SUCC,
    payload: data,
  };
};
export const UpdateRequest = (data) => {
  return {
    type: REQ_UPDATE_SUCC,
    payload: data,
  };
};
export const RemoveRequest = (code) => {
  return {
    type: REQ_DELETE_SUCC,
    payload: code,
  };
};

export const getbycodeSuccess = (data) => {
  return {
    type: REQ_GETBYCODE_SUCC,
    payload: data,
  };
};
