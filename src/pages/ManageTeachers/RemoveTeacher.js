import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  DialogActions,
  DialogContent,
  DialogContentText,
  Button,
} from "@mui/material";
import { removeTeacher, STATUSES } from "../../store/manageTeachersSlice";

const RemoveTeacher = (props) => {
  const dispatch = useDispatch();
  const { status } = useSelector((state) => state.manageTeachers);

  // Delete teacher Delete Api Call
  const deleteTeacher = (id) => {
    dispatch(removeTeacher(id));
    props.onRemoveTeacher();
  };

  if (status === STATUSES.LOADING) {
    return <h2>Loading....</h2>;
  }

  if (status === STATUSES.ERROR) {
    return <h2>Something went wrong!</h2>;
  }

  //close ConfirmBox
  const onClose = () => {
    props.onClose();
  };

  return (
    <div>
      {/* conformation Box */}
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Are you sure want to delete{" "}
          <b>
            {props.teacher.firstName} {props.teacher.lastName} ?
          </b>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button
          variant="contained"
          color="primary"
          onClick={()=>deleteTeacher(props.teacher.id)}
          autoFocus
        >
          Ok
        </Button>
      </DialogActions>
    </div>
  );
};

export default RemoveTeacher;
