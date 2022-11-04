import Axios from 'axios'
import { currentUser } from '../../redux/actions/userActions'
import { store } from '../../store'

const DB_URL = 'https://pet-found.up.railway.app/user'

// testes
// const DB_URL = 'http://localhost:5000/user'

interface userRegisterTypes {
    email: string,
    password: string,
    name: string, 
    address: {
        state: string,
        county: string,
        street: string | null // null is for the optional inputs
    },
    contacts: {
        tel1: {
            ddd: string | null,
            tel: string | null
        },
        tel2: {
            ddd: string | null,
            tel: string | null
        },
        facebook: string | null,
        instagram: string | null
    }
}

interface userLoginTypes {
    email: string,
    password: string
}

// gets token of the user already logged in
const reduxState = store.getState()
const userStoredData: any = reduxState.currentUser

// sets the route and config used for the intended page purpose 
const config = (route: string, userInfo: userRegisterTypes | userLoginTypes) => {

    // gets the needed headers configs for each route
    let headersToThisRoute;
    switch (route) {
        // case '/change-password':
        //     headersToThisRoute = {

        //         'Content-Type': 'application/json',
        //         'Authorization': `Bearer ${userStoredData.token}`

        //     }
        case '/register' || '/login':
            headersToThisRoute = {

                'Content-Type': 'application/json'

            }
    }

    return {

        method: 'POST',
        url: `${DB_URL}${route}`,
        headers: headersToThisRoute,
        data: userInfo

    }

}

export const registerUser = async (info: userRegisterTypes) => {

    try {

        const data: any = await Axios(

            config('/register', info)

        ).then(response => {

            if (response.status == 201) {

                // redux dispatch
                store.dispatch(currentUser('ADD_USER', response.data))

            }

        })

        return data.message;

    }
    catch (error) {

        return { message: 'Error with front fetch.' };

    }
}

export const loginUser = async (info: userLoginTypes) => {

    try {

        const data = await Axios(
            config('/login', info)
        ).then(response => {

            if (response.status == 202) {

                // redux dispatch
                store.dispatch(currentUser('ADD_USER', response.data))

            }

        })

        return;

    }
    catch (error: any) {

        return { status: error.response.status, message: error.response.data.message };

    }

}

export const logoutUser = async () => {

    // redux dispatch
    store.dispatch(currentUser("REMOVE_USER"))

} 