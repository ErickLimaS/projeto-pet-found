import Axios from 'axios'
import { currentUser } from '../../redux/actions/userActions'
import { store } from '../../store'

const DB_URL = 'http://localhost:9123/user'
// const DB_URL = 'https://pet-found.onrender.com/user'

interface UpdateAccountTypes {

    email?: string,
    newPassword?: string,
    currentPassword?: string,
    firstName?: string,
    surname?: string,
    street?: string,
    county?: string,
    state?: string,
    tel1?: object,
    tel2?: object,
    facebook?: string,
    instagram?: string

}

// sets the route and config used for the intended page purpose (DISABLED)
function reqConfig(route: string, body?: unknown, query?: string) {

    // gets token of the user already logged in
    const state = store.getState()
    const userStoredData: any = state.currentUser

    let methodUsedByRoute: string = "";
    let headerUsedByRoute: {};

    switch (route) {

        case '/profile-info':

            methodUsedByRoute = "GET"

            headerUsedByRoute = {
                "Content-Type": "application/json"
            }

            break;

        case '/info':

            methodUsedByRoute = "GET"

            headerUsedByRoute = {
                "Authorization": `Bearer ${userStoredData.token}`,
                "Content-Type": "application/json"
            }

            break;


        case '/notifications':

            methodUsedByRoute = "GET"

            headerUsedByRoute = {
                "Authorization": `Bearer ${userStoredData.token}`,
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

        case '/update-profile':

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

            methodUsedByRoute = "GET" //fix

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

export const registerUser = async (info: UserRegisterTypes) => {

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

export const loginUser = async (info: UserLoginTypes) => {

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

        const { data } = await Axios(reqConfig(`/info`))

        return { status: 200, data: data };

    }
    catch (error: any) {

        return {
            status: error.response.status,
            message: error.response.data.message
        };

    }

}

export const getAnotherUserInfo = async (id: string) => {

    try {

        const { data } = await Axios(reqConfig('/profile-info', undefined, `?id=${id}`))

        return data;

    }
    catch (error: any) {

        return {
            status: error.response.status,
            message: error.response.data.message
        };

    }

}

export const updateAccountData = async (method: string, info: UpdateAccountTypes) => {

    try {

        let dataToBeSend: {}
        switch (method) {

            case 'EMAIL_OR_PASSWORD':

                dataToBeSend = {

                    email: info.email || null,
                    newPassword: info.newPassword || null,
                    currentPassword: info.currentPassword

                }
                break;

            case 'CHANGE_NAME':

                dataToBeSend = {

                    firstName: info.firstName,
                    surname: info.surname,
                    currentPassword: info.currentPassword

                }
                break;

            case 'CHANGE_NAME_AND_ADDRESS':

                dataToBeSend = {

                    firstName: info.firstName,
                    surname: info.surname,
                    street: info.street,
                    county: info.county,
                    state: info.state,
                    currentPassword: info.currentPassword

                }
                break;

            case 'CHANGE_ADDRESS':

                dataToBeSend = {

                    street: info.street,
                    county: info.county,
                    state: info.state,
                    currentPassword: info.currentPassword

                }
                break;

            case 'CHANGE_CONTACTS':

                dataToBeSend = {

                    contacts: {
                        tel1: info.tel1,
                        tel2: info.tel2,
                        facebook: info.facebook,
                        instagram: info.instagram
                    }
                }
                break;

            default:
                return
        }

        const res = await Axios(reqConfig('/update-profile', dataToBeSend))

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

    store.dispatch(currentUser("REMOVE_USER"))

}

export const getNotifications = async (token: string, query?: string) => {

    try {
        const { data } = await Axios(
            reqConfig('/notifications', undefined, query ? `?q=${query}` : '')
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
            reqConfig('/set-notifications-read')
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
            reqConfig(`/another-user-contacts`, undefined, `?id=${id}`)
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
            reqConfig(`/delete-notification`, {
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