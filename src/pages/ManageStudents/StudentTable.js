/* eslint-disable no-undef */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchStudents, STATUSES } from "../../store/manageStudentsSlice";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { styled } from "@mui/material/styles";
import {
  Dialog,
  Fab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  Grid,
  Button
} from "@mui/material";

import { AddStudent } from "./AddStudent";
import { UpdateStudent } from "./UpdateStudent";
import RemoveStudent from "./RemoveStudent";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
    width: 450,
  },
}));

export const StudentTable = () => {
  // handle for pagination data
  const [page, setPage] = useState(0);

  //state for open add student  Dialog
  const [isAdd, setAdd] = useState(false);

  //state for open remove student ConfirmBox
  const [isRemove, setRemove] = useState(false);

  //state for open edit student  Dialog
  const [isEdit, setEdit] = useState(false);

  //student data
  const [student, setStudent] = useState([]);

  // handle for tables rows
  const [rowsPerPage, setRowsPerPage] = useState(5);


  // edit button hide show button
  const [show, setShow] = useState(false);

  const dispatch = useDispatch();
  const { students, status } = useSelector((state) => state.manageStudents);

  useEffect(() => {
    dispatch(fetchStudents());
    let roleName = localStorage.getItem('role');
    if (roleName === "Admin") {
      setShow(true);
    }
    else {
      setShow(false);
    }
  }, []);

  //on click of add student
  const openAddForm = () => {
    setAdd(true);
  };

  //close add new student  Dialog
  const onCloseForm = () => {
    setAdd(false);
  };

  //refresh table after save
  const onSaveUpdateTable = () => {
    setAdd(false);
    dispatch(fetchStudents());
  };

  //after edit refresh table
  const onEditUpdateTable = () => {
    setEdit(false);
    dispatch(fetchStudents());
  };

  //on click of remove student ConfirmBox open
  const openConfirmBox = (student) => {
    setRemove(true);
    setStudent(student);
  };

  //close ConfirmBox
  const onCloseConfirmBox = () => {
    setRemove(false);
  };

  //refresh table after Remove student
  const onRemoveStudent = () => {
    setRemove(false);
    dispatch(fetchStudents());
  };

  //on click of edit student
  const openEditForm = (student) => {
    setStudent(student);
    setEdit(true);
  };

  //close edit Dialog
  const onCloseEdit = () => {
    setEdit(false);
  };

  // pagination set new Page
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // handle Change Rows PerPage
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // date format
  function formatDate(timestamp) {
    const x = new Date(timestamp);
    const DD = x.getDate();
    const MM = x.getMonth() + 1;
    const YYYY = x.getFullYear();
    return DD + "/" + MM + "/" + YYYY;
  }

  if (status === STATUSES.LOADING) {
    return <h2>Loading....</h2>;
  }

  if (status === STATUSES.ERROR) {
    return <h2>Something went wrong!</h2>;
  }

  return (
    <>
      <div>
        <Grid
          container
          direction="row"
          justifyContent="flex-start"
          alignItems="center"
        >
           {show?  <Button
            sx={{ mt: "10px" }}
            variant="contained"
            onClick={openAddForm}
            color="primary"
            data-testid="addStudentBtn"
          >
            Add Student
          </Button> :null}
         
        </Grid>

        <BootstrapDialog
          onClose={onCloseForm}
          aria-labelledby="customized-dialog-title"
          open={isAdd}
        >
          <AddStudent
            onSaveUpdateTable={onSaveUpdateTable}
            onClose={onCloseForm}
          ></AddStudent>
        </BootstrapDialog>
        <BootstrapDialog
          onClose={onCloseEdit}
          aria-labelledby="customized-dialog-title"
          open={isEdit}
        >
          <UpdateStudent
            onEditUpdateTable={onEditUpdateTable}
            onClose={onCloseEdit}
            student={student}
          ></UpdateStudent>
        </BootstrapDialog>

        <Dialog
          open={isRemove}
          onClose={onCloseConfirmBox}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <RemoveStudent
            onRemoveStudent={onRemoveStudent}
            onClose={onCloseConfirmBox}
            student={student}
          ></RemoveStudent>
        </Dialog>

        <hr />
        {/* table */}
        <Paper sx={{ width: "100%", mb: 0 }}>
          <TableContainer component={Paper}>
            <Table
              sx={{ minWidth: 650 }}
              className="table table-striped table-hover"
              size="small"
              aria-label="simple table"
            >
              <TableHead>
                <TableRow>
                  <TableCell>First Name</TableCell>
                  <TableCell>Last Name</TableCell>
                  <TableCell>Class Name</TableCell>
                  <TableCell>DOB</TableCell>
                  <TableCell>Gender</TableCell>
                  <TableCell> About</TableCell>
                  {show ? <TableCell>Actions</TableCell>
                    : null}
                </TableRow>
              </TableHead>
              <TableBody>
                {students
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((student) => (
                    <TableRow
                      key={student.id}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell>{student.firstName}</TableCell>
                      <TableCell>{student.lastName}</TableCell>
                      <TableCell>{student.className} th</TableCell>
                      <TableCell>{formatDate(student.dob)}</TableCell>
                      <TableCell>{student.gender}</TableCell>

                      <TableCell>{student.student_about}</TableCell>
                      {show ? <TableCell>
                        <Fab size="small" color="secondary" aria-label="edit">
                          <EditIcon onClick={() => openEditForm(student)} />
                        </Fab>
                        {/* </IconButton> */}

                        <Fab size="small" color="error" aria-label="remove">
                          <DeleteIcon
                            onClick={() => openConfirmBox(student)}
                          />
                        </Fab>
                      </TableCell> : null}
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
          {/* table pagination */}
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={students.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </div>
    </>
  );
};


