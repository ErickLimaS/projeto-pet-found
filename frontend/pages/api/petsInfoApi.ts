/* eslint-disable import/no-anonymous-default-export */
import Axios from 'axios'

const CATS_API = 'https://api.thecatapi.com/v1'
const DOGS_API = 'https://api.thedogapi.com/v1'

function reqConfig(route: string) {

    return {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        url: route
    }

}

export default {

    getCatsBreed: async () => {

        try {

            const { data } = await Axios(reqConfig(`${CATS_API}/breeds?limit=10000&page=0`))

            return data

        }
        catch (error: any) {

            console.log(error)

            return error

        }

    },

    getDogsBreed: async () => {

        try {

            const { data } = await Axios(reqConfig(`${DOGS_API}/breeds?limit=10000&page=0`))

            return data

        }
        catch (error: any) {

            console.log(error)

            return error

        }

    }

}