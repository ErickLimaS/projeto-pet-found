import { AnyAction, Dispatch } from "@reduxjs/toolkit";
import { ADD_USER } from "../constants/userConstants";

export const currentUser = (action: string, userInfo: { name: string, token: string }) => async (dispatch: Dispatch<AnyAction>) => {

    switch (action) {
        case 'ADD_USER':
            dispatch({
                type: ADD_USER,
                payload: userInfo
            })
        default:
            console.log('erro redux')
    }

}
