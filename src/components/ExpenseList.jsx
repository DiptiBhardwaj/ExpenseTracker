import {React, useEffect, useState} from 'react'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, Box} from '@mui/material';
import ViewsDatePicker from './yearPicker';
import ExpenseRow from './ExpenseRow';
import {useSelector} from "react-redux";

const ExpenseList = () => {
    const expenses = useSelector(state=> state.expenses);
    const [filteredExpenses, setfilteredExpenses] = useState(expenses || []);
    filteredExpenses.sort(function (a, b) {
        var dateA = new Date(a.date), dateB = new Date(b.date)
        return dateA - dateB
    });

	useEffect(() => {
		setfilteredExpenses(expenses);
    }, [expenses]);
    
    const handleChange = (event) => {
		const searchResults = expenses.filter((filteredExpense) =>
			filteredExpense.title.toLowerCase().includes(event.target.value)
		).sort(function (a, b) {
            var dateA = new Date(a.date), dateB = new Date(b.date)
            return dateA - dateB
        });
    ;
		setfilteredExpenses(searchResults);
    };
    const handleYearChange = (year) => {
		const FilteredResults = expenses.filter((filteredExpense) =>
			filteredExpense.date.split('-')[0].includes(year)
		).sort(function (a, b) {
            var dateA = new Date(a.date), dateB = new Date(b.date)
            return dateA - dateB
        });
    ;
		setfilteredExpenses(FilteredResults);
	};

    return (
        <>
       
        <TextField sx={{ my: 3 }} id="standard-basic" fullWidth variant="standard" type='text'
            className='form-control mb-2 mr-sm-2' placeholder='Type to search Title' 
            onChange={handleChange}/>
        <Box sx={{ width: 400, my: 3 }}>
            <ViewsDatePicker sx={{ paddingX: 5, my: 3 }} onYearChange={handleYearChange}/>
        </Box>
                        
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell align="right">TITLE</TableCell>
                        <TableCell align="right">EXPENSES</TableCell>
                        <TableCell align="right">DATE</TableCell>
                        <TableCell align="right">EDIT</TableCell>
                        <TableCell align="right">DELETE</TableCell>

                    </TableRow>
                </TableHead>
                <TableBody>
                {filteredExpenses.map((expense) => (
                    <ExpenseRow expense={expense} key={expense.id}/>
                ))}
                </TableBody>
            </Table>
        </TableContainer>
        </>
    )
}

export default ExpenseList