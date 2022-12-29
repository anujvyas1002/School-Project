import React from "react";
import PropTypes from "prop-types";
import CloseIcon from "@mui/icons-material/Close";
import {
  Button,
  TextField,
  Grid,
  IconButton,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { useForm } from "react-hook-form";

import { useDispatch, useSelector } from "react-redux";
import { updateClass, STATUSES } from "../../store/manageClassesSlice";

const BootstrapDialogTitle = (props) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

export const UpdateClass = (props) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isDirty, isValid },
  } = useForm({
    mode: "onTouched",
  });



  const dispatch = useDispatch();
  const { status } = useSelector(
    (state) => state.manageClasses
  );

  
  //data send for object
  let req;

  //from data
  const onSubmit = (data) => {
    req = {
      id: props.class.id,
      classTeacher: data.classTeacher,
      totalStudent: data.totalStudent,
      className: data.className,
      roomNumber: data.roomNumber,
    };
    dispatch(updateClass(req));
    props.onEditUpdateTable();
  };

  // SetValue for input filed
  setValue("id", props.class.id);
  setValue("classTeacher", props.class.classTeacher);
  setValue("totalStudent", props.class.totalStudent);
  setValue("className", props.class.className);
  setValue("roomNumber", props.class.roomNumber);

  if (status === STATUSES.LOADING) {
    return <h2>Loading....</h2>;
  }

  if (status === STATUSES.ERROR) {
    return <h2>Something went wrong!</h2>;
  }

  // close Dialog
  const onClose = () => {
    props.onClose();
  };



  return (
    <div>
      <BootstrapDialogTitle id="customized-dialog-title" onClose={onClose}>
       {props.class.classTeacher} Update
      </BootstrapDialogTitle>
      <DialogContent dividers>
        <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={1}>
            <Grid item xs={6}>
              <label htmlFor="classTeacher">Class Teacher</label>
              <div className="form-group">
                <TextField
                  type="text"
                  className="form-control"
                  id="classTeacher"
                  placeholder="Enter Your Class Teacher Name"
                  {...register("classTeacher", {
                    required: "Class Teacher Name is Required",
                    pattern: {
                      value: /^[A-Za-z]+$/i,
                      message: "Teacher name is invaild",
                    },
                    minLength: {
                      value: 3,
                      message: "Enter your Minimum 3 characters",
                    },
                    maxLength: {
                      value: 20,
                      message: "Enter your Maximum 20 characters",
                    },
                  })}
                />
                {errors.classTeacher && (
                  <Grid container alignItems="flex-start">
                    <small style={{ color: "red" }}>
                      {errors.classTeacher.message}
                    </small>
                  </Grid>
                )}
              </div>
            </Grid>
            <Grid item xs={6}>
              <label htmlFor="totalStudent">Total Student</label>
              <div className="form-group">
                <TextField
                  type="number"
                  className="form-control"
                  id="totalStudent"
                  placeholder="Enter Your total Student"
                  {...register("totalStudent", {
                    required: "total Studentis Required",
                    minLength: {
                      value: 1,
                      message: "Enter your Minimum 1 characters",
                    },
                    maxLength: {
                      value: 4,
                      message: "Enter your Maximum 4 characters",
                    },
                  })}
                />
                {errors.totalStudent && (
                  <Grid container alignItems="flex-start">
                    <small style={{ color: "red" }}>
                      {errors.totalStudent.message}
                    </small>{" "}
                  </Grid>
                )}
              </div>
            </Grid>
          </Grid>
          <Grid container spacing={1}>
            <Grid item xs={6}>
              <label htmlFor="className">Class Name</label>
              <div className="form-group">
                <TextField
                  type="number"
                  className="form-control"
                  id="className"
                  placeholder="Example- 1, 2"
                  {...register("className", {
                    required: "Class Name is Required",
                    minLength: {
                      value: 1,
                      message: "Enter your Minimum 1 characters",
                    },
                    maxLength: {
                      value: 2,
                      message: "Enter your Maximum 2 characters",
                    },
                  })}
                />
                {errors.className && (
                  <Grid container alignItems="flex-start">
                    <small style={{ color: "red" }}>
                      {errors.className.message}
                    </small>
                  </Grid>
                )}
              </div>
            </Grid>
            <Grid item xs={6}>
              <label htmlFor="roomNumber">Room Number</label>
              <div className="form-group">
                <TextField
                  type="number"
                  className="form-control"
                  id="roomNumber"
                  placeholder="Enter Your Room Number"
                  {...register("roomNumber", {
                    required: "Room Number is Required",
                    minLength: {
                      value: 1,
                      message: "Enter your Minimum 1 characters",
                    },
                    maxLength: {
                      value: 4,
                      message: "Enter your Maximum 4 characters",
                    },
                  })}
                />
                {errors.roomNumber && (
                  <Grid container alignItems="flex-start">
                    <small style={{ color: "red" }}>
                      {errors.roomNumber.message}
                    </small>{" "}
                  </Grid>
                )}
              </div>
            </Grid>
          </Grid>

       

          <hr />
          <Grid
            container
            direction="row"
            justifyContent="flex-end"
            alignItems="flex-start"
            spacing={0.5}
          >
            <Grid item>
              <Button
                variant="contained"
                className="float-end mt-2"
                color="primary"
                disabled={!isDirty || !isValid}
                type="submit"
              >
                Update
              </Button>
            </Grid>
            <Grid item>
              <Button
                className="me-2 float-end mt-2"
                variant="outlined"
                onClick={onClose}
              >
                Close
              </Button>
            </Grid>
          </Grid>
        </form>
      </DialogContent>
    </div>
  );
};
