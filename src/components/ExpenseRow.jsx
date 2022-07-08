import {React} from 'react';
import api from "../api/expenses";
import {TableCell, TableRow, Button} from '@mui/material';
import {useDispatch} from "react-redux";
import { Link} from "react-router-dom";
import {EditOutlined, DeleteOutlined} from '@mui/icons-material';

const ExpenseRow = ({expense}) => {
    const dispatch = useDispatch();
    let handleEditExpense = (e) => {
        // e.stopPropagation();
        dispatch({
          type: 'SET_SHOW_MODAL',
          payload: true,
         });
        dispatch({
          type: 'SET_EDIT_EXPENSE_ID',
          payload: expense.id,
      });
    }
    const handleDeleteExpense = () => {
      api.delete(`/expenses/${expense.id}`)
      dispatch({
        type: 'DELETE_EXPENSE',
        payload: expense.id,
      });
    };
    return (
        <>
            <TableRow
              key={expense.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
            <TableCell component="th" scope="row" >{expense.id}</TableCell>
              <TableCell component="th" scope="row" align="right">{expense.title}</TableCell>
              <TableCell align="right">Rs. {expense.amount}</TableCell>
              <TableCell align="right">{expense.date}</TableCell>
              <TableCell align="right">
              <Link to="/edit"> <Button variant="outlined" size="small" color="secondary" onClick={handleEditExpense}><EditOutlined />Edit Expense</Button></Link>
                  {/* <Button variant="outlined" size="small" color="secondary" onClick={handleEditExpense}><EditOutlined />Edit Expense</Button>  */}
                </TableCell>
              <TableCell align="right">
                  <Button variant="outlined" size="small" color="secondary" onClick={handleDeleteExpense}><DeleteOutlined />Delete Expense</Button>         
                </TableCell>
            </TableRow>
        </>
    )
}

export default ExpenseRow