import React from "react";
import ExpenseList from './ExpenseList';
import AddEditModal from './modals/AddEditModal';
import {useDispatch} from "react-redux";
import {Button, Grid, Box} from '@mui/material';
import {HomeOutlined, Add} from '@mui/icons-material';
import { Link, useNavigate} from "react-router-dom";
import "../App.css";

const Profile =() => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let onButtonClick = () => {
      dispatch({
        type: 'SET_SHOW_MODAL',
        payload: true,
    });
  }
  let onModalClose = () => {
     dispatch({
        type: 'SET_SHOW_MODAL',
        payload: false,
    });
    dispatch({
      type: 'SET_EDIT_EXPENSE_ID',
      payload: null,
    });
    return navigate(`/profile`, { replace: true });
  }

  return (
    <>
      <Grid container justifyContent="left">
        <Box sx={{paddingX: 5, mt: 5, ml: 18}}>
        <nav className="navLink">
            <Link to="/"><Button variant="outlined" color="secondary"><HomeOutlined color="success" /> Back to Home</Button></Link>
          </nav>
        </Box>
      </Grid>
      <div className='App'>
        <h1>Expense Tracker</h1>
        <Link to="/add"><Button variant="contained" color="primary" onClick={onButtonClick}><Add/>Add Expense</Button></Link>
        {/* <Button variant="contained" color="primary" onClick={onButtonClick}><Add/>Add Expense</Button> */}
        <ExpenseList />
        <AddEditModal onClose={()=>onModalClose()} />
      </div>
    </>
  )
}
export default Profile;
