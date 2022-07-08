import React from 'react';
import { Modal, Box, Typography } from '@mui/material';
import {useSelector, useDispatch} from "react-redux";
import ExpenseForm from '../ExpenseForm';
import { useNavigate } from "react-router-dom";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const AddEditModal = ()=>{
    const dispatch = useDispatch();
    let showModal = useSelector(state=> state.showModal);
    const editExpenseID = useSelector(state=> state.editExpenseID);
    const navigate = useNavigate();
    if (!showModal) {
        return navigate(`/profile`, { replace: true });
    }
    const handleCloseModal = ()=>{
        dispatch({
            type: 'SET_SHOW_MODAL',
            payload: false,
        });
        dispatch({
          type: 'SET_EDIT_EXPENSE_ID',
          payload: null,
        });
        // onClose()
        navigate(`/profile`, { replace: true });
    }
    return (
        <Modal
            open={showModal}
            onClose={handleCloseModal}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            >
            <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                {editExpenseID? 'EDIT': 'Add New'} Expense
                </Typography>
                <ExpenseForm onClose={handleCloseModal}/>
            </Box>
        </Modal>
    );
};
export default AddEditModal;