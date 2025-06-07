import {createContext, useState} from 'react';

export const SnackBarContext = createContext(null);

export const SnackBarProvider = ({children}) => {
    const [snackbar, setSnackbar] = useState({
        open: false,
        message: '',
        severity: 'success'
    });


    return (
        <SnackBarContext.Provider value={{snackbar, setSnackbar}}>
            {children}
        </SnackBarContext.Provider>
    );
};