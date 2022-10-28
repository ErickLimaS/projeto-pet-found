import { AnyAction, Dispatch } from "@reduxjs/toolkit";
import { ADD_USER_FAIL, ADD_USER_REQUEST, ADD_USER_SUCCESS, REMOVE_USER_FAIL, REMOVE_USER_REQUEST, REMOVE_USER_SUCCESS } from "../constants/userConstants";

export const currentUser = (action: string, userInfo?: { name: string, token: string }) => async (dispatch: Dispatch<AnyAction>) => {

    if (action === 'ADD_USER') {

        dispatch({
            type: ADD_USER_REQUEST,
            payload: userInfo
        })

        try {
            
            localStorage.setItem('name', userInfo?.name!)
            localStorage.setItem('token', userInfo?.token!)

            dispatch({
                type: ADD_USER_SUCCESS,
                payload: userInfo
            })

        }
        catch (err) {

            dispatch({
                type: ADD_USER_FAIL,
                payload: err
            })

        }


    }
    else if (action === 'REMOVE_USER') {

        dispatch({
            type: REMOVE_USER_REQUEST
        })

        try{

            dispatch({
                type: REMOVE_USER_SUCCESS
            })

        }
        catch(err){
            dispatch({
                type: REMOVE_USER_FAIL
            })
        }
        
    }

}
