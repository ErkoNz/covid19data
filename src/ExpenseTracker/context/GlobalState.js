import React, { createContext, useReducer } from 'react'
import AppReducer from './AppReducer'

const LOCAL_STORAGE_KEY = 'ExpenseTracker'

const localVar = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
const initialState = {
    transactions: localVar
}





export const GlobalContext = createContext(initialState)

export const GlobalProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AppReducer, initialState)

    function deleteTransaction(id) {
        dispatch({
            type: 'DELETE_TRANSACTION',
            payload: id
        })
    }

    function addTransaction(transaction) {
        dispatch({
            type: 'ADD_TRANSACTION',
            payload: transaction
        })
    }

    return (
        <GlobalContext.Provider value={{
            transactions: state.transactions,
            deleteTransaction,
            addTransaction
        }}>
            {children}
        </GlobalContext.Provider>
    )
}