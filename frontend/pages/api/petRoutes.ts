import axios from "axios"
import { store } from "../../store"

const DB_URL = 'https://pet-found.herokuapp.com/pets'

// const DB_URL = 'http://localhost:5000/pets' // test

const state: any = store.getState()
const userToken: string = state.currentUser.token ? state.currentUser.token : ''

interface petDataTypes {
    type: string,
    typeTranslated: string,
    name: string,
    age: number,
    breed: string,
    lastSeen: {
        state: string,
        county: string,
        street: string
    },
    hasReward: boolean,
    rewardAmount: number,
    moreInfo: string
}

interface queryTypes {

    type: any[] | null,
    state: string,
    county: string

}

const config = (route: string, body?: petDataTypes, query?: string) => {

    let methodUsedByRoute: string = "";
    let headerUsedByRoute: {};

    switch (route) {

        case '/all' || '/my-pets' || '/pet':

            methodUsedByRoute = "GET"

            headerUsedByRoute = {
                "Content-Type": "application/json"
            }

        case '/register':
            methodUsedByRoute = "POST"

            headerUsedByRoute = {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${userToken}`
            }

        case '/update-pet-status':
            methodUsedByRoute = "PUT"

            headerUsedByRoute = {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${userToken}`
            }

        case '/remove-pet':
            methodUsedByRoute = "DELETE"

            headerUsedByRoute = {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${userToken}`
            }

        default:
            methodUsedByRoute = "GET" //fix

            headerUsedByRoute = {
                "Content-Type": "application/json"
            }

    }

    return {
        method: methodUsedByRoute,
        url: `${DB_URL}${route}${query && query}`,
        headers: headerUsedByRoute,
        data: body
    }

}

// makes POST request to register a new lost pet post and relate it with his owner
export const createPetPost = async (info: petDataTypes) => {

    try {

        const data = await axios(
            config("/register", info)
        ).then(response => {

            if (response.status === 201) {

                return {
                    message: 'Success'
                }

            }

        })


    }
    catch (error: any) {

        console.log(error)

    }

}

export const getAllPetsByQuery = async (query?: queryTypes) => {

    let queryOnUrl: string = '';

    const animalTypes = query?.type || null
    console.log(query)

    // if has query, sets how will the query be on the url
    if (query) {

        // all inputs filled
        if (query.type != null && query.state != "" && query.county != "") {

            queryOnUrl = `?${query.type.map((type) => { return `type=${type}&` })}state=${query.state}&county=${query.county}`.replace(',', '')

        }

        // only state and county
        else {

            queryOnUrl = `?state=${query.state}&county=${query.county}`

        }

    }

    try {
        const { data } = await axios(
            config(`/all`, undefined, queryOnUrl && queryOnUrl)
        )

        return data;

    }
    catch (error: any) {

        return {
            message: error
        }

    }
}

// gets a pet info by getting its id and passing it through the url
export const getPetInfo = async (query: string) => {

    try {
        const { data } = await axios(
            config(`/pet`, undefined, `?id=${query}`)
        )

        return data;

    }
    catch (error: any) {

        return {
            message: error
        }

    }

}

// gets info of the pets registed by the user
export const getPetsRegisteredByUser = async () => {

    try {
        const { data } = await axios(
            config(`/my-pets`)
        )

        return data;

    }
    catch (error: any) {

        return {
            message: error
        }

    }

}

// sets pet status of wasFound previously from FALSE to TRUE
export const updatePetStatus = async () => {

    try {
        const { data } = await axios(
            config(`/update-pet-status`)
        )

        return data;

    }
    catch (error: any) {

        return {
            message: error
        }

    }

}

// removes pet info from Database
export const removePetFromDB = async () => {

    try {
        const { data } = await axios(
            config('/remove-pet')
        )

        return data;

    }
    catch (error: any) {

        return {
            message: error
        }

    }

}