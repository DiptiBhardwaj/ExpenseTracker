import React from 'react';
import { Modal, Box, Typography } from '@mui/material';
import {useSelector} from "react-redux";
import ExpenseForm from '../ExpenseForm';

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

const AddEditModal = ({onClose})=>{
    let showModal = useSelector(state=> state.showModal);
    const editExpenseID = useSelector(state=> state.editExpenseID);

    if (!showModal) {
        return null;
    }
    return (
        <Modal
            open={showModal}
            onClose={onClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            >
            <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                {editExpenseID? 'EDIT': 'Add New'} Expense
                </Typography>
                <ExpenseForm onClose={()=>onClose()}/>
            </Box>
        </Modal>
    );
};
export default AddEditModal;