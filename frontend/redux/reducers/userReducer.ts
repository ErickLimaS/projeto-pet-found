import { ADD_USER, REMOVE_USER } from "../constants/userConstants";

export const currentUserReducer = (state = {}, action: any) => {

    switch (action.type) {
        case ADD_USER:

            localStorage.setItem('name', action.payload.name)
            localStorage.setItem('token', action.payload.token)

            return {
                ...state,
                name: action.payload.name,
                token: action.payload.token
            }

        case REMOVE_USER:

            localStorage.removeItem("name")
            localStorage.removeItem("token")

        default:
            return state;

    }

}