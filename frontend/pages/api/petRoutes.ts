import Axios from "axios"
import { store } from "../../store"

// testes
const DB_URL = 'http://localhost:9123/pets'
// const DB_URL = 'https://pet-found.onrender.com/pets'

const config = (route: string, body?: unknown, query?: string, token?: string) => {

    const state: any = store.getState()
    const userToken = state.currentUser.token ? state.currentUser.token : ''

    let methodUsedByRoute: string = "";
    let headerUsedByRoute: {};

    switch (route) {

        case '/all' || '/my-pets' || '/pet':

            methodUsedByRoute = "GET"

            headerUsedByRoute = {
                "Content-Type": "application/json"
            }

            break;

        case '/register':
            methodUsedByRoute = "POST"

            headerUsedByRoute = {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${userToken || token && token}`
            }

            break;

        case '/update-pet-status':
            methodUsedByRoute = "PUT"

            headerUsedByRoute = {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${userToken}`
            }

            break;

        case '/remove-pet':
            methodUsedByRoute = "DELETE"

            headerUsedByRoute = {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${userToken}`
            }

            break;

        case '/notify-owner':
            methodUsedByRoute = "PUT"

            headerUsedByRoute = {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${userToken}`
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

// makes POST request to register a new lost pet post and relate it with his owner
export const createPetPost = async (info: PetInfoTypes, token?: string) => {

    try {

        const res = await Axios(

            config('/register', info, undefined, token && token)

        )

        return {
            pet: res.data.pet,
            status: res.status,
            message: res.data.message,
            success: res.data.success
        }

    }

    catch (error: any) {

        return error.response.data

    }

}

export const getAllPetsByQuery = async (query?: QueryTypes) => {

    let queryOnUrl: string = '';

    // if has query, sets how will the query be on the url
    if (query) {

        // all inputs filled
        if (query.type != null && query.state != "" && query.county != "" && query.time_sort != null && query.hasDisability != null) {

            queryOnUrl = `?${query.type.map((type) => { return `type=${type}&` })}state_abbrev=${query.state}&county=${query.county}&time_sort=${query.time_sort}${query.hasDisability.map((value: boolean) => { return `&hasDisability=${value}` })}`.replace(',', '')

        }

        // type, state, county, time_sort filled
        else if (query.type != null && query.state != "" && query.county != "" && query.time_sort != null && query.hasDisability == null) {

            queryOnUrl = `?${query.type.map((type) => { return `type=${type}&` })}state_abbrev=${query.state}&county=${query.county}&time_sort=${query.time_sort}`.replace(',', '')

        }

        // type, state, county, hasDisability filled
        else if (query.type != null && query.state != "" && query.county != "" && query.time_sort == null && query.hasDisability != null) {

            queryOnUrl = `?${query.type.map((type) => { return `type=${type}&` })}state_abbrev=${query.state}&county=${query.county}${query.hasDisability.map((value: boolean) => { return `&hasDisability=${value}` })}`.replace(',', '')

        }

        // type, state, county filled
        else if (query.type != null && query.state != "" && query.county != "" && query.time_sort == null && query.hasDisability == null) {

            queryOnUrl = `?${query.type.map((type) => { return `type=${type}&` })}state_abbrev=${query.state}&county=${query.county}`.replace(',', '')

        }

        // only state and county filled
        else {

            queryOnUrl = `?state_abbrev=${query.state}&county=${query.county}`

        }

    }

    try {
        const { data } = await Axios(
            config(`/all`, undefined, queryOnUrl && queryOnUrl)
        )

        return data;

    }
    catch (error: any) {

        return { status: error.response.status, message: error.response.data.message }

    }
}

// gets a pet info by getting its id and passing it through the url
export const getPetInfo = async (id: string) => {

    try {
        const { data } = await Axios(
            config(`/pet`, undefined, `?id=${id}`)
        )

        return data;

    }
    catch (error: any) {

        return { status: error.response.status, message: error.response.data.message }

    }

}

// gets info of the pets registed by the user
export const getPetsRegisteredByUser = async () => {

    try {
        const { data } = await Axios(
            config(`/my-pets`)
        )

        return data;

    }
    catch (error: any) {

        return {
            status: error.response.status,
            message: error.response.data.message
        }

    }

}

// sets pet status of wasFound previously from FALSE to TRUE
export const updatePetStatus = async () => {

    try {
        const { data } = await Axios(
            config(`/update-pet-status`)
        )

        return data;

    }
    catch (error: any) {

        return {
            status: error.response.status,
            message: error.response.data.message
        }
    }

}

// removes pet info from Database
export const removePetFromDB = async () => {

    try {
        const { data } = await Axios(
            config('/remove-pet')
        )

        return data;

    }
    catch (error: any) {

        return {
            status: error.response.status,
            message: error.response.data.message
        }

    }

}

// sets a notification of pet found to owner / who found will be paired with post of the pet
export const notifyOwner = async (info: unknown) => {

    try {

        const { data } = await Axios(
            config('/notify-owner', info)
        )

        return data;
    }
    catch (error: any) {

        return {
            status: error.response.status,
            message: error.response.data.message
        }

    }

}