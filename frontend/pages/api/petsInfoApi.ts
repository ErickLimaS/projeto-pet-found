/* eslint-disable import/no-anonymous-default-export */
import Axios from 'axios'

const CATS_API = 'https://api.thecatapi.com/v1'
const DOGS_API = 'https://api.thedogapi.com/v1'
const CORS = 'https://cors-anywhere.herokuapp.com/'

const headers: any = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }

}

export default {

    getCatsBreed: async () => {

        try {

            const { data } = await Axios(
                {
                    headers,
                    url: `${CATS_API}/breeds?limit=10000&page=0`
                })

            return data

        }
        catch (error: any) {

            return { 'name': 'Erro Test' }

        }

    },

    getDogsBreed: async () => {

        try {

            const { data } = await Axios(
                {
                    headers,
                    url: `${CORS}${DOGS_API}/breeds?limit=10000&page=0`
                })

            return data

        }
        catch (error: any) {

            return [{ 'name': 'Erro Test' }]
            
        }

    }

}