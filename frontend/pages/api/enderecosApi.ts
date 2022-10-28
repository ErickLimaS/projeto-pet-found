/* eslint-disable import/no-anonymous-default-export */
import Axios from "axios"

const IBGE_API = "https://servicodados.ibge.gov.br/api/v1/localidades"

const headers: any = {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json'
    }
}

export default {

    getBrazilianStates: async () => {

        try {

            const { data } = await Axios({
                headers,
                url: `${IBGE_API}/estados?orderBy=nome`
            })

            return data

        }
        catch (error: any) {

            console.log(error)

        }

    },

    getBrazilianMunicipies: async (uf: string) => {

        try {

            const { data } = await Axios({
                headers,
                url: `${IBGE_API}/estados/${uf}/municipios?orderBy=nome`
            })

            return data

        }
        catch (error: any) {

            console.log(error)

        }

    }

}