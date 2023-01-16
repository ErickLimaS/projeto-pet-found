/* eslint-disable import/no-anonymous-default-export */
import Axios from "axios"

const IBGE_API = "https://servicodados.ibge.gov.br/api/v1/localidades"

function reqConfig(route: string) {

    return {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        url: route
    }
}

export default {

    getBrazilianStates: async () => {

        try {

            const { data } = await Axios(reqConfig(`${IBGE_API}/estados?orderBy=nome`))

            return data

        }
        catch (error: any) {

            console.log(error)

            return error

        }

    },

    getBrazilianMunicipies: async (uf: string) => {

        try {

            const { data } = await Axios(reqConfig(`${IBGE_API}/estados/${uf}/municipios?orderBy=nome`))

            return data

        }
        catch (error: any) {

            console.log(error)
            
            return error

        }

    }

}
