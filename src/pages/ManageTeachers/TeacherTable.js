/* eslint-disable no-undef */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTeachers, STATUSES} from "../../store/manageTeachersSlice";
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
import { AddTeacher } from "./AddTeacher";
import { UpdateTeacher } from "./UpdateTeacher";
import RemoveTeacher from "./RemoveTeacher";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
    width: 450,
  },
}));

export const TeacherTable = () => {
  // handle for pagination data
  const [page, setPage] = useState(0);

  //state for open add teacher  Dialog
  const [isAdd, setAdd] = useState(false);


  //student data
  const [teacher, setTeacher] = useState([]);

  //state for open remove teacher ConfirmBox
  const [isRemove, setRemove] = useState(false);

  //state for open edit teacher  Dialog
  const [isEdit, setEdit] = useState(false);

  // handle for tables rows
  const [rowsPerPage, setRowsPerPage] = useState(5);


  // edit button hide show button
  const [show, setShow] = useState(false);

  const dispatch = useDispatch();
  const { teachers, status } = useSelector((state) => state.manageTeachers);

  useEffect(() => {
    dispatch(fetchTeachers());
    let roleName = localStorage.getItem('role');
    if(roleName === "Admin"){
      setShow(true);
    }
    else{
      setShow(false);
    }
  }, []);

  //on click of add teacher
  const openAddForm = () => {
    setAdd(true);
  };

  //close add new teacher  Dialog
  const onCloseForm = () => {
    setAdd(false);
  };

  //refresh table after save
  const onSaveUpdateTable = () => {
    setAdd(false);
    dispatch(fetchTeachers());
  };

  //after edit refresh table
  const onEditUpdateTable = () => {
    setEdit(false);
    dispatch(fetchTeachers());
  };

  //on click of remove teacher ConfirmBox open
  const openConfirmBox = (teacher) => {
    setRemove(true);
    setTeacher(teacher);
  };

  //close ConfirmBox
  const onCloseConfirmBox = () => {
    setRemove(false);
  };

  //refresh table after Remove teacher
  const onRemoveTeacher = () => {
    setRemove(false);
    dispatch(fetchTeachers());
  };

  //on click of edit teacher
  const openEditForm = (teacher) => {
    setTeacher(teacher);
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
           {show? <Button
            sx={{ mt: "10px" }}
            variant="contained"
            onClick={openAddForm}
            color="primary"
            data-testid="addTeacherBtn"
          >
            Add Teacher
          </Button> :null}
         
        </Grid>

        <BootstrapDialog
          onClose={onCloseForm}
          aria-labelledby="customized-dialog-title"
          open={isAdd}
        >
          <AddTeacher
            onSaveUpdateTable={onSaveUpdateTable}
            onClose={onCloseForm}
          ></AddTeacher>
        </BootstrapDialog>
        <BootstrapDialog
          onClose={onCloseEdit}
          aria-labelledby="customized-dialog-title"
          open={isEdit}
        >
          <UpdateTeacher
            onEditUpdateTable={onEditUpdateTable}
            onClose={onCloseEdit}
            teacher={teacher}
          ></UpdateTeacher>
        </BootstrapDialog>

        <Dialog
          open={isRemove}
          onClose={onCloseConfirmBox}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <RemoveTeacher
            onRemoveTeacher={onRemoveTeacher}
            onClose={onCloseConfirmBox}
            teacher={teacher}
          ></RemoveTeacher>
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
                  <TableCell>Subject</TableCell>
                  <TableCell> Address</TableCell>
                  {show ? <TableCell>Actions</TableCell>
                    : null}
                </TableRow>
              </TableHead>
              <TableBody>
                {teachers
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((teacher) => (
                    <TableRow
                      key={teacher.id}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell>{teacher.firstName}</TableCell>
                      <TableCell>{teacher.lastName}</TableCell>
                      <TableCell>{teacher.subject}</TableCell>
                      
                      <TableCell>{teacher.address}</TableCell>
                      {show?<TableCell>
                        <Fab size="small" color="secondary" aria-label="edit">
                          <EditIcon onClick={() => openEditForm(teacher)} />
                        </Fab>
                        <Fab size="small" color="error" aria-label="remove">
                          <DeleteIcon
                            onClick={() => openConfirmBox(teacher)}
                          />
                        </Fab>
                      </TableCell>:null}
                      
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
          {/* table pagination */}
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={teachers.length}
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


