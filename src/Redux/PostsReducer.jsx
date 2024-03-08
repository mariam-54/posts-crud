import {
  REQ_GETALL_FAIL,
  REQ_GETALL_SUCC,
  MAKE_REQ,
  REQ_ADD_SUCC,
  OPEN_FORM,
  REQ_GETBYCODE_SUCC,
  REQ_UPDATE_SUCC,
  REQ_DELETE_SUCC,
} from "./ActionStatus";

export const initialstate = {
  isloading: false,
  postlist: [],
  postobj: {},
  errormessage: "",
};

export const PostReducer = (state = initialstate, action) => {
  switch (action.type) {
    case MAKE_REQ:
      return {
        ...state,
        isloading: true,
      };
    case REQ_GETALL_SUCC:
      return {
        ...state,
        isloading: false,
        postlist: action.payload,
      };
    case REQ_GETBYCODE_SUCC:
      return {
        ...state,
        postobj: action.payload,
      };
    case REQ_GETALL_FAIL:
      return {
        ...state,
        isloading: false,
        postlist: [],
        errormessage: action.payload,
      };
    case OPEN_FORM:
      return {
        ...state,
        postobj: {},
      };

    case REQ_ADD_SUCC:
      const _inputdata = { ...action.payload };
      const _maxid = Math.max(...state.postlist.map((o) => o.id));
      _inputdata.id = _maxid + 1;
      return {
        ...state,
        postlist: [...state.postlist, _inputdata],
      };

    case REQ_UPDATE_SUCC:
      const _data = { ...action.payload };
      const _finaldata = state.postlist.map((item) => {
        return item.id === _data.id ? _data : item;
      });
      return {
        ...state,
        postlist: _finaldata,
      };

    case REQ_DELETE_SUCC:
      const _filterdata = state.postlist.filter((data) => {
        return data.id != action.payload;
      });
      return {
        ...state,
        postlist: _filterdata,
      };
    default:
      return state;
  }
};
