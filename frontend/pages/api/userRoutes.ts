import Axios from 'axios'
import { currentUser } from '../../redux/actions/userActions'
import { store } from '../../store'

const DB_URL = 'https://pet-found.onrender.com/user'

// testes
// const DB_URL = 'http://localhost:9123/user'

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

// sets the route and config used for the intended page purpose (DISABLED)
const config = (route: string, body?: any, query?: string, token?: string) => {

    let methodUsedByRoute: string = "";
    let headerUsedByRoute: {};

    switch (route) {

        case '/profile-info':

            methodUsedByRoute = "GET"

            headerUsedByRoute = {
                "Content-Type": "application/json"
            }

            break;


        case '/notifications':

            methodUsedByRoute = "GET"

            headerUsedByRoute = {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            }

            break;

        case '/set-notifications-read':

            methodUsedByRoute = "PUT"

            headerUsedByRoute = {
                "Authorization": `Bearer ${userStoredData.token}`,
                "Content-Type": "application/json"
            }

            break;

        case '/another-user-contacts':

            methodUsedByRoute = "GET"

            headerUsedByRoute = {
                "Authorization": `Bearer ${userStoredData.token}`,
                "Content-Type": "application/json"
            }

            break;

        case '/delete-notification':

            methodUsedByRoute = "DELETE"

            headerUsedByRoute = {
                "Authorization": `Bearer ${userStoredData.token}`,
                "Content-Type": "application/json"
            }

            break;

        default:

            methodUsedByRoute = "PUT" //fix

            headerUsedByRoute = {
                "Content-Type": "application/json"
            }

            break;

    }

    return {
        method: methodUsedByRoute,
        url: `${DB_URL}${route}${query ? query : ''}`,
        headers: headerUsedByRoute,
        data: body
    }

}

export const registerUser = async (info: userRegisterTypes) => {

    try {

        const data: any = await Axios(
            {
                url: `${DB_URL}/register`,
                method: 'POST',
                headers: {

                    'Content-Type': 'application/json'

                },
                data: info
            }
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
            {
                url: `${DB_URL}/login`,
                method: 'POST',
                headers: {

                    'Content-Type': 'application/json'

                },
                data: info
            }
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

export const getAccountInfo = async () => {

    try {

        const { data } = await Axios({
            url: `${DB_URL}/info`,
            method: 'GET',
            headers: {

                'Content-Type': 'application/json',
                'Authorization': `Bearer ${userStoredData.token}`

            }
        })

        return { status: 200, data: data };

    }
    catch (error: any) {

        return { status: error.response.status, message: error.response.data.message };

    }

}

export const getAnotherUserInfo = async (id: string) => {

    try {

        const { data } = await Axios(
            config('/profile-info', undefined, `?id=${id}`)
        )

        return data;

    }
    catch (error: any) {

        return { status: error.response.status, message: error.response.data.message };

    }

}

export const updateAccountData = async (method: string, email?: string, newPassword?: string, currentPassword?: string, name?: string, street?: string, county?: string, state?: string, tel1?: object, tel2?: object, facebook?: string, instagram?: string) => {

    try {

        let dataToBeSend: {}
        switch (method) {

            case 'EMAIL_OR_PASSWORD':

                dataToBeSend = {

                    updateMethod: email && 'CHANGE_EMAIL' || newPassword && 'CHANGE_PASSWORD',
                    email: email || null,
                    newPassword: newPassword || null,
                    currentPassword: currentPassword

                }
                break;

            case 'CHANGE_NAME':

                dataToBeSend = {

                    updateMethod: 'CHANGE_NAME',
                    name: name,
                    currentPassword: currentPassword

                }
                break;

            case 'CHANGE_NAME_AND_ADDRESS':

                dataToBeSend = {

                    updateMethod: 'CHANGE_NAME_AND_ADDRESS',
                    name: name,
                    street: street,
                    county: county,
                    state: state,
                    currentPassword: currentPassword

                }
                break;

            case 'CHANGE_ADDRESS':

                dataToBeSend = {

                    updateMethod: 'CHANGE_ADDRESS',
                    street: street,
                    county: county,
                    state: state,
                    currentPassword: currentPassword

                }
                break;

            case 'CHANGE_CONTACTS':

                dataToBeSend = {

                    updateMethod: 'CHANGE_CONTACTS',
                    contacts: {
                        tel1: tel1,
                        tel2: tel2,
                        facebook: facebook,
                        instagram: instagram
                    }
                }
                break;

            default:
                return
        }

        const res = await Axios({
            url: `${DB_URL}/update-profile`,
            method: 'PUT',
            headers: {

                'Content-Type': 'application/json',
                'Authorization': `Bearer ${userStoredData.token}`

            },
            data: dataToBeSend

        })

        return { success: true, status: res.status, data: res.data };
    }
    catch (error: any) {

        return {
            success: false,
            status: error.response.status,
            message: error.response.data.message
        };

    }

}

export const logoutUser = async () => {

    // redux dispatch
    store.dispatch(currentUser("REMOVE_USER"))

}

export const getNotifications = async (token: string, query?: string) => {

    try {
        const { data } = await Axios(
            config('/notifications', undefined, query ? `?q=${query}` : '', token)
        )

        return data
    }
    catch (error: any) {

        if (error.response.status === 401 /*UNAUTHORIZED */) {

            localStorage.removeItem('name')
            localStorage.removeItem('token')

            location.reload()

        }

        return { status: error.response.status, message: error.response.data.message }

    }

}

// NOTIFICATIONS IDENTIFIES IF USER HAS A STILL VALID TOKEN. 
// IF NOT, ITS DELETED FROM LOCAL STORAGE, FORCING A NEW LOGIN.
export const setNotificationsToRead = async () => {

    try {

        const { data } = await Axios(
            config('/set-notifications-read')
        )

        return data

    }
    catch (error: any) {

        return { status: error.response.status, message: error.response.data.message }

    }

}

export const getContactInfoFromUser = async (id: string) => {

    try {

        const { data } = await Axios(
            config(`/another-user-contacts`, undefined, `?id=${id}`)
        )

        return data
    }
    catch (error: any) {

        return { status: error.response.status, message: error.response.data.message }

    }
}

export const deleteNotification = async (id: string) => {

    try {

        const { data } = await Axios(
            config(`/delete-notification`, {
                notification: {
                    _id: id
                }
            })
        )

        return data

    }
    catch (error: any) {

        return { sucess: error.response.data.success, status: error.response.status, message: error.response.data.message }

    }

}