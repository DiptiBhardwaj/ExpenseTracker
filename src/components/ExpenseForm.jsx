import React from 'react';
import { useState } from 'react';
import { Box, Button, Input} from '@mui/material';
import {useDispatch, useSelector} from "react-redux";
import { v4 as uuidv4 } from 'uuid';

function ExpenseForm({onClose}) {
  const [inputs, setInputs] = useState({});
  const dispatch = useDispatch();


  const expenses = useSelector(state=> state.expenses);
  const editExpenseID = useSelector(state=> state.editExpenseID);
  let expense = expenses.filter(
    (expense) => expense.id === editExpenseID
  )[0];


  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs(values => ({...values, [name]: value}))
  }

  const handleSubmit = (event) => {
    event.preventDefault();
      const updated_expense = {
        id: editExpenseID? expense.id: uuidv4(),
        ...inputs
    };
    dispatch({
        type: editExpenseID? 'EDIT_EXPENSE': 'ADD_EXPENSE',
        payload: updated_expense,
    });
    onClose();
  }

  return (
    <Box onSubmit={handleSubmit}
        component="form"
        autoComplete="off"
        sx={{ p: 2, mt: 2}}
    >
        <Input fullWidth required type="text" id="title" name="title"  placeholder="Expense Title" defaultValue={expense?.title || ''} onChange={handleChange}/>
        <Input fullWidth sx={{pt: 2}}  required type="number" id="amount" name="amount" placeholder="Expense Amount" defaultValue={expense?.amount|| ''} onChange={handleChange}/>
        <Input fullWidth sx={{pt: 2, mb:2}}  required type="date" id="date" name="date" placeholder="Expense Date" defaultValue={expense?.date||''} onChange={handleChange}/>
        <Button type="submit" variant="contained" color="primary">Save</Button>
    </Box>
  )
}

export default ExpenseForm;