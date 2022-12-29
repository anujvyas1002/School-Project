import React, { useState } from "react";
import PropTypes from "prop-types";
import CloseIcon from "@mui/icons-material/Close";
import {
  Button,
  DialogContent,
  DialogTitle,
  Stack,
  IconButton,
  TextField,
  Grid,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { useDispatch, useSelector } from "react-redux";
import { addStudent, STATUSES } from "../../store/manageStudentsSlice";

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

export const AddStudent = (props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
  });

  // SelectedDate mantain
  const [selectedDate, setSelectedDate] = useState();

  const dispatch = useDispatch();
  const {  status } = useSelector(
    (state) => state.manageStudents
  );

  if (status === STATUSES.LOADING) {
    return <h2>Loading....</h2>;
  }

  if (status === STATUSES.ERROR) {
    return <h2>Something went wrong!</h2>;
  }

  // date format
  function formatDate(timestamp) {
    let x = new Date(timestamp);
    let DD = x.getDate();
    let MM = x.getMonth() + 1;
    let YYYY = x.getFullYear();
    return YYYY + "/" + MM + "/" + DD;
  }

  //data send for object
  let req;

  //from data
  const onSubmit = (data) => {
    req = {
      id: Date.now(),
      firstName: data.firstName,
      lastName: data.lastName,
      className:data.className,
      dob: formatDate(selectedDate),
      student_about: data.student_about,
      gender: data.gender,
    };
    dispatch(addStudent(req));
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
        Create New Empoyee
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

          <div className="form-group">
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <label htmlFor="dob">Date of Birth</label>
              <Stack spacing={3}>
                <DesktopDatePicker
                  // label="For desktop"
                  inputFormat="dd/MM/yyyy"
                  className="form-control"
                  value={selectedDate}
                  {...register("dob", { required: "DOB is Required" })}
                  onChange={(newValue) => {
                    setSelectedDate(newValue);
                  }}
                  maxDate={new Date()}
                  renderInput={(params) => <TextField {...params} />}
                />
              </Stack>
            </LocalizationProvider>

            {errors.dob && (
              <Grid container alignItems="flex-start">
                <small style={{ color: "red" }}> {errors.dob.message}</small>
              </Grid>
            )}
          </div>

          <Grid container spacing={1}>
            <Grid item xs={6}>
              <label htmlFor="student_about">Student About</label>
              <div className="form-group">
                <TextField
                  type="text"
                  className="form-control"
                  id="student_about"
                  multiline
                  rows={1}
                  maxRows={4}
                  placeholder="Enter Your student"
                  {...register("student_about", {
                    required: "Student About is Required",
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
                {errors.student_about && (
                  <Grid container alignItems="flex-start">
                    <small style={{ color: "red" }}>
                      {errors.student_about.message}
                    </small>
                  </Grid>
                )}
              </div>
            </Grid>
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
          </Grid>

          <Grid container spacing={1}>
            <Grid item >
              <label htmlFor="gender">Choose Your Gender</label>
              <div className="form-group">
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    id="male"
                    value="Male"
                    {...register("gender", {
                      required: "Gender is Required",
                    })}
                  />
                  <label className="form-check-label" htmlFor="male">
                    Male
                  </label>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    id="female"
                    value="Female"
                    name="gender"
                    {...register("gender", {
                      required: "Gender is Required",
                    })}
                  />
                  <label className="form-check-label" htmlFor="female">
                    Female
                  </label>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    id="other"
                    value="Other"
                    {...register("gender", {
                      required: "Gender is Required",
                    })}
                  />
                  <label className="form-check-label" htmlFor="other">
                    Other
                  </label>
                </div>

                {errors.gender && (
                  <Grid container alignItems="flex-start">
                    {" "}
                    <small style={{ color: "red" }}>
                      {errors.gender.message}
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
