/* eslint-disable no-undef */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchClasses, STATUSES } from "../../store/manageClassesSlice";
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

import { AddClass } from "./AddClass";
import { UpdateClass } from "./UpdateClass";
import RemoveClass from "./RemoveClass";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
    width: 450,
  },
}));

export const ClassTable = () => {
  // handle for pagination data
  const [page, setPage] = useState(0);

  //state for open add Class  Dialog
  const [isAdd, setAdd] = useState(false);

  //state for open remove Class ConfirmBox
  const [isRemove, setRemove] = useState(false);

  //state for open edit Class  Dialog
  const [isEdit, setEdit] = useState(false);

  //Class data
  const [cls, setCls] = useState([]);

  // handle for tables rows
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // edit button hide show button
  const [show, setShow] = useState(false);


  
  const dispatch = useDispatch();
  const { classes, status } = useSelector((state) => state.manageClasses);

  useEffect(() => {
    dispatch(fetchClasses());
    let roleName = localStorage.getItem('role');
    if(roleName === "Admin"){
      setShow(true);
    }
    else{
      setShow(false);
    }
  }, []);

  //on click of add Class
  const openAddForm = () => {
    setAdd(true);
  };

  //close add new Class  Dialog
  const onCloseForm = () => {
    setAdd(false);
  };

  //refresh table after save
  const onSaveUpdateTable = () => {
    setAdd(false);
    dispatch(fetchClasses());
  };

  //after edit refresh table
  const onEditUpdateTable = () => {
    setEdit(false);
    dispatch(fetchClasses());
  };

  //on click of remove Class ConfirmBox open
  const openConfirmBox = (cls) => {
    setRemove(true);
    setCls(cls);
  };

  //close ConfirmBox
  const onCloseConfirmBox = () => {
    setRemove(false);
  };

  //refresh table after Remove Class
  const onRemoveClass = () => {
    setRemove(false);
    dispatch(fetchClasses());
  };

  //on click of edit Class
  const openEditForm = (cls) => {
    setCls(cls);
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
         
          {show?  <Button
            sx={{ mt: "10px" }}
            variant="contained"
            onClick={openAddForm}
            color="primary"
            data-testid="addClassBtn"
          >
            Add Class
          </Button>:null}
         
        </Grid>

        <BootstrapDialog
          onClose={onCloseForm}
          aria-labelledby="customized-dialog-title"
          open={isAdd}
        >
          <AddClass
            onSaveUpdateTable={onSaveUpdateTable}
            onClose={onCloseForm}
          ></AddClass>
        </BootstrapDialog>
        <BootstrapDialog
          onClose={onCloseEdit}
          aria-labelledby="customized-dialog-title"
          open={isEdit}
        >
          <UpdateClass
            onEditUpdateTable={onEditUpdateTable}
            onClose={onCloseEdit}
            class={cls}
          ></UpdateClass>
        </BootstrapDialog>

        <Dialog
          open={isRemove}
          onClose={onCloseConfirmBox}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <RemoveClass
            onRemoveClass={onRemoveClass}
            onClose={onCloseConfirmBox}
            class={cls}
          ></RemoveClass>
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
                  <TableCell>Class Teacher</TableCell>
                  <TableCell>Total Student</TableCell>
                  <TableCell>Class Name</TableCell>
                  <TableCell> Room Number</TableCell>
                  {show ? <TableCell>Actions</TableCell>
                    : null}
                </TableRow>
              </TableHead>
              <TableBody>
                {classes
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((cls) => (
                    <TableRow
                      key={cls.id}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell>{cls.classTeacher} </TableCell>
                      <TableCell>{cls.totalStudent} </TableCell>
                      <TableCell>{cls.className} th</TableCell>
                      <TableCell>{cls.roomNumber}</TableCell>
                     { show ? <TableCell>
                        <Fab size="small" color="secondary" aria-label="edit">
                          <EditIcon onClick={() => openEditForm(cls)} />
                        </Fab>
                        {/* </IconButton> */}

                        <Fab size="small" color="error" aria-label="remove">
                          <DeleteIcon
                            onClick={() => openConfirmBox(cls)}
                          />
                        </Fab>
                      </TableCell> : null
                      }
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
          {/* table pagination */}
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={classes.length}
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


