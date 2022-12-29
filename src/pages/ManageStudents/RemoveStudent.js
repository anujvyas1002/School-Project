import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  DialogActions,
  DialogContent,
  DialogContentText,
  Button,
} from "@mui/material";
import { removeStudent, STATUSES } from "../../store/manageStudentsSlice";

const RemoveStudent = (props) => {
  const dispatch = useDispatch();
  const { status } = useSelector((state) => state.manageStudents);

  // Delete student Delete Api Call
  const deleteStudent = (id) => {
    dispatch(removeStudent(id));
    props.onRemoveStudent();
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
            {props.student.firstName} {props.student.lastName} ?
          </b>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button
          variant="contained"
          color="primary"
          onClick={()=>deleteStudent(props.student.id)}
          autoFocus
        >
          Ok
        </Button>
      </DialogActions>
    </div>
  );
};

export default RemoveStudent;
