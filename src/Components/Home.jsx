import React, { useEffect, useState } from "react";
import Lottie from "react-lottie";
import loadingAnimation from "./loading.json";
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Checkbox,
  TablePagination,
} from "@mui/material";
import {
  CreatePost,
  GetAllPosts,
  GetPostsByCode,
  RemovePost,
  UpdatePost,
} from "../Redux/ActionCreater";
import { connect, useDispatch, useSelector } from "react-redux";
import { OpenForm } from "../Redux/Action";

const Home = (props) => {
  const columns = [
    { id: "id", name: "Id" },
    { id: "title", name: "Title" },
    { id: "body", name: "Content" },
    { id: "action", name: "Action" },
  ];

  const dispatch = useDispatch();

  const [id, idchange] = useState(0);
  const [title, titlechange] = useState("");
  const [body, bodychange] = useState("");
  const [open, openChange] = useState(false);
  const [agreeterm, agreetermchange] = useState(true);
  const [rowperpage, rowperpagechange] = useState(5);
  const [page, pagechange] = useState(0);

  const [isEdit, isEditChange] = useState(false);
  const [heading, headingChange] = useState("Create post");
  const editobj = useSelector((state) => state.post.postobj);
  useEffect(() => {
    if (Object.keys(editobj).length > 0) {
      idchange(editobj.id);
      titlechange(editobj.title);
      bodychange(editobj.body);
    } else {
      clearstate();
    }
  }, [editobj]);

  const handlepagechange = (event, newpage) => {
    pagechange(newpage);
  };

  const handlerowperpagechange = (event) => {
    rowperpagechange(+event.target.value);
    pagechange(0);
  };
  const addPost = () => {
    isEditChange(false);
    headingChange("Create post");
    openForm();
  };
  const closeForm = () => {
    openChange(false);
  };
  const openForm = () => {
    openChange(true);
    clearstate();
    dispatch(OpenForm);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const _obj = { id, title, body };
    if (isEdit) {
      dispatch(UpdatePost(_obj));
    } else {
      dispatch(CreatePost(_obj));
    }

    closeForm();
  };

  const handleEdit = (code) => {
    isEditChange(true);
    headingChange("Update post");
    openChange(true);
    dispatch(GetPostsByCode(code));
  };

  const handleRemove = (code) => {
    if (window.confirm("Do you want to remove")) {
      dispatch(RemovePost(code));
    }
  };

  const clearstate = () => {
    idchange(0);
    titlechange("");
    bodychange("");
  };
  useEffect(() => {
    props.loadpost();
  }, []);

  return (
    <div>
      {props.poststate.isloading ? (
        <Lottie
          options={{
            loop: true,
            autoplay: true,
            animationData: loadingAnimation,
            rendererSettings: {
              preserveAspectRatio: "xMidYMid slice",
            },
          }}
          height={500}
          width={500}
        />
      ) : props.poststate.errormessage ? (
        <div>
          <h2>{props.poststate.errormessage}</h2>
        </div>
      ) : (
        <div>
          <Paper sx={{ margin: "1%" }}>
            <div style={{ margin: "1%" }}>
              <Button
                onClick={addPost}
                variant="contained"
                style={{ background: "#2BBBAD" }}
              >
                Add New Post (+)
              </Button>
            </div>
            <div style={{ margin: "1%" }}>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow style={{ backgroundColor: "midnightblue" }}>
                      {columns.map((column) => (
                        <TableCell
                          key={column.id}
                          style={{ color: "white", fontSize: "18px" }}
                        >
                          {column.name}
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {Array.isArray(props.poststate.postlist) &&
                      props.poststate.postlist
                        .slice(
                          page * rowperpage,
                          page * rowperpage + rowperpage
                        )
                        .map((row, i) => {
                          return (
                            <TableRow key={i}>
                              <TableCell style={{ width: "8%" }}>
                                {row.id}
                              </TableCell>
                              <TableCell style={{ width: "28%" }}>
                                {row.title}
                              </TableCell>
                              <TableCell style={{ width: "45%" }}>
                                {row.body}
                              </TableCell>
                              <TableCell style={{ width: "35%" }}>
                                <Button
                                  variant="contained"
                                  style={{ background: "#2BBBAD" }}
                                  onClick={(e) => {
                                    handleEdit(row.id);
                                  }}
                                >
                                  Edit
                                </Button>
                                <Button
                                  variant="contained"
                                  color="error"
                                  onClick={(e) => {
                                    handleRemove(row.id);
                                  }}
                                >
                                  Delete
                                </Button>
                              </TableCell>
                            </TableRow>
                          );
                        })}
                  </TableBody>
                </Table>
              </TableContainer>

              <TablePagination
                rowsPerPageOptions={[5, 10, 20]}
                rowsPerPage={rowperpage}
                page={page}
                count={props.poststate.postlist.length}
                component={"div"}
                onPageChange={handlepagechange}
                onRowsPerPageChange={handlerowperpagechange}
              ></TablePagination>
            </div>
          </Paper>
          <Dialog open={open} onClose={closeForm} fullWidth maxWidth="sm">
            <DialogTitle>
              <span>{heading}</span>
              <Button
                onClick={closeForm}
                style={{ position: "absolute", right: 8, top: 8 }}
              >
                &#10006;
              </Button>
            </DialogTitle>
            <DialogContent>
              <form onSubmit={handleSubmit}>
                <Stack spacing={2} margin={2}>
                  <TextField
                    required
                    error={title.length === 0}
                    value={title}
                    onChange={(e) => {
                      titlechange(e.target.value);
                    }}
                    variant="outlined"
                    label="Title"
                  ></TextField>
                  <TextField
                    required
                    error={body.length === 0}
                    value={body}
                    onChange={(e) => {
                      bodychange(e.target.value);
                    }}
                    variant="outlined"
                    label="Content"
                  ></TextField>

                  <FormControlLabel
                    checked={agreeterm}
                    onChange={(e) => {
                      agreetermchange(e.target.checked);
                    }}
                    control={<Checkbox></Checkbox>}
                    label="Agree Terms & Conditions"
                  ></FormControlLabel>
                  <Button
                    disabled={!agreeterm}
                    variant="contained"
                    type="submit"
                  >
                    Submit
                  </Button>
                </Stack>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      )}
    </div>
  );
};

const mapStatetoProps = (state) => {
  return {
    poststate: state.post,
  };
};
const mapDispatchtoProps = (dispatch) => {
  return {
    loadpost: () => dispatch(GetAllPosts()),
  };
};
export default connect(mapStatetoProps, mapDispatchtoProps)(Home);
