import React from "react";
import PropTypes from "prop-types";
import CloseIcon from "@mui/icons-material/Close";
import {
  Button,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField,
  Grid,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { addTeacher, STATUSES } from "../../store/manageTeachersSlice";

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

export const AddTeacher = (props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
  });


  const dispatch = useDispatch();
  const { status } = useSelector(
    (state) => state.manageTeachers
  );

  if (status === STATUSES.LOADING) {
    return <h2>Loading....</h2>;
  }

  if (status === STATUSES.ERROR) {
    return <h2>Something went wrong!</h2>;
  }

  //data send for object
  let req;

  //from data
  const onSubmit = (data) => {
    req = {
      id: Date.now(),
      firstName: data.firstName,
      lastName: data.lastName,
      subject: data.subject,
      address: data.address,
    };
    dispatch(addTeacher(req));
    props.onSaveUpdateTable();
  };

  // Dialog close
  const onClose = () => {
    props.onClose();
  };



  return (
    <div>
      {/* <ToasterMessage/> */}
      {/* <Loader/> */}
      <BootstrapDialogTitle id="customized-dialog-title" onClose={onClose}>
        Create New Teacher
      </BootstrapDialogTitle>
      <DialogContent dividers>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={1}>
            <Grid item xs={6}>
              <label htmlFor="firstName">First Name</label>
              <div className="form-group">
                <TextField
                  type="text"
                  className="form-control"
                  id="firstName"
                  placeholder="Enter Your First  Name"
                  {...register("firstName", {
                    required: "First Name is Required",
                    pattern: {
                      value: /^[A-Za-z]+$/i,
                      message: "Frist name is invaild",
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
                {errors.firstName && (
                  <Grid container alignItems="flex-start">
                    <small style={{ color: "red" }}>
                      {errors.firstName.message}
                    </small>
                  </Grid>
                )}
              </div>
            </Grid>
            <Grid item xs={6}>
              <label htmlFor="lastName">Last Name</label>
              <div className="form-group">
                <TextField
                  type="text"
                  className="form-control"
                  id="lastName"
                  placeholder="Enter Your Last Name"
                  {...register("lastName", {
                    required: "Last Name is Required",
                    pattern: {
                      value: /^[A-Za-z]+$/i,
                      message: "Last name is invaild",
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
                {errors.lastName && (
                  <Grid container alignItems="flex-start">
                    <small style={{ color: "red" }}>
                      {errors.lastName.message}
                    </small>{" "}
                  </Grid>
                )}
              </div>
            </Grid>
          </Grid>

        

          <Grid container spacing={1}>
            <Grid item xs={6}>
            <label htmlFor="subject">Subject</label>
              <div className="form-group">
                <TextField
                  type="text"
                  className="form-control"
                  id="subject"
                  placeholder="Enter Your Subject"
                  {...register("subject", {
                    required: "Subject is Required",
                    pattern: {
                      value: /^[A-Za-z]+$/i,
                      message: "Subject is invaild",
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
                {errors.subject && (
                  <Grid container alignItems="flex-start">
                    <small style={{ color: "red" }}>
                      {errors.subject.message}
                    </small>{" "}
                  </Grid>
                )}
              </div>
            </Grid>
            <Grid item xs={6}>
            <label htmlFor="address"> Address</label>
              <div className="form-group">
                <TextField
                  type="text"
                  className="form-control"
                  id="address"
                  multiline
                  rows={1}
                  maxRows={4}
                  placeholder="Enter Your Address"
                  {...register("address", {
                    required: "address is Required",
                    minLength: {
                      value: 3,
                      message: "Enter your Minimum 3 characters",
                    },
                    maxLength: {
                      value: 300,
                      message: "Enter your Maximum 300 characters",
                    },
                  })}
                />
                {errors.address && (
                  <Grid container alignItems="flex-start">
                    <small style={{ color: "red" }}>
                      {errors.address.message}
                    </small>
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
              <Button variant="contained" color="primary" type="submit">
                Create
              </Button>
            </Grid>
            <Grid item>
              <Button variant="outlined" onClick={onClose}>
                Close
              </Button>
            </Grid>
          </Grid>
        </form>
      </DialogContent>
    </div>
  );
};
