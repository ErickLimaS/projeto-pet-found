import { ADD_USER_FAIL, ADD_USER_REQUEST, ADD_USER_SUCCESS, REMOVE_USER_FAIL, REMOVE_USER_REQUEST, REMOVE_USER_SUCCESS } from "../constants/userConstants";

export const currentUserReducer = (state = {}, action: any) => {

    switch (action.type) {
        case ADD_USER_REQUEST:

            return { loading: true }

        case ADD_USER_SUCCESS:

            return {
                ...state,
                name: action.payload.name,
                token: action.payload.token,
                loading: false,
                success: true
            }

        case ADD_USER_FAIL:

            return { loading: false, success: true }

        case REMOVE_USER_REQUEST:

            return { loading: true }

        case REMOVE_USER_SUCCESS:

            localStorage.removeItem("name")
            localStorage.removeItem("token")

            return { loading: false, success: true }

        case REMOVE_USER_FAIL:

            return { loading: false, success: false }

        default:
            return state;

    }

}