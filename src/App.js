import React, {useEffect} from "react";
import api from "./api/expenses";
import {createStore} from "redux";
import {Provider, useDispatch, useSelector} from "react-redux";
import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/Login";
import HomePage from "./pages/Home";
import ProfilePage from './pages/ProfilePage';
import AddEditModal from './components/modals/AddEditModal';

import { useLocation, Navigate} from "react-router-dom";
import {useAuth, AuthProvider} from "./hooks/useAuth";
import "./App.css";

const reducerMethod = (state = {
  budget: "",
  expenses: [],
  showModal: false,
  editExpenseID: null,
  isUserAuthenticated: false
}, action) => {
  switch(action.type){
      case("SET_EXPENSES"):
      return {
        ...state,
        expenses: action.payload
      }
      case 'ADD_EXPENSE':
			return {
				...state,
				expenses: [...state.expenses, action.payload],
      };
      case 'EDIT_EXPENSE':
        const index = state.expenses.findIndex(expense => expense.id === action.payload.id);
        const newArray = [...state.expenses];
        newArray[index] = (index > -1)?  {...newArray[index], ...action.payload}: {...newArray[index]};
			return {
				...state,
				expenses: newArray,
			};
      case("SET_SHOW_MODAL"):
      return {
        ...state,
        showModal: action.payload
      }
      case("SET_EDIT_EXPENSE_ID"):
      return {
        ...state,
        editExpenseID: action.payload
      }
      case("DELETE_EXPENSE"):
      return {
				...state,
				expenses: state.expenses.filter(
					(expense) => expense.id !== action.payload
				),
      };
      case("SET_USER_AUTHENTICATED"):
      return {
        ...state,
        isUserAuthenticated: action.payload
      }
      default: 
      return state;
  }
}
const store = createStore(reducerMethod);
function RequireAuth({ children }) {
  const isUserAuthenticated= useSelector(state=>state.isUserAuthenticated)
  const { authed } = useAuth();
  const location = useLocation();
  return isUserAuthenticated === true ? (
    children
  ) : (
    <Navigate to="/login" replace state={{ path: location.pathname }} />
  );
}

const App =() => {
  const dispatch = useDispatch();
    useEffect(()=> {
      api.get("/expenses")
      .then((resp) => dispatch({
        type: "SET_EXPENSES", 
        payload: resp.data}))
      .catch(error => console.log("ERROR IN GETTING EXPENSES DATA:: ",error));
    },[]);

  return (
  <AuthProvider>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/profile"
        element={
          <RequireAuth>
            <ProfilePage />
          </RequireAuth>
        }
      />
      <Route exact path="/ExpenseTracker" element={<Navigate replace to="/" />}></Route>
      {/* <Route path="*" element={<HomePage />} /> */}
      <Route exact path="/add" element={ 
        <RequireAuth>
          <AddEditModal onClose={()=>dispatch({
              type: 'SET_SHOW_MODAL',
              payload: false,
          })} />
          </RequireAuth>}/>
        <Route exact path="/edit" element={ 
          <RequireAuth>
            <AddEditModal onClose={()=>dispatch({
                type: 'SET_SHOW_MODAL',
                payload: false,
            })} />
            </RequireAuth>}/>

    </Routes>
  </AuthProvider>
  )
}
export default ()=><Provider store={store}><App/></Provider>;
