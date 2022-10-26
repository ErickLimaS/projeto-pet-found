import Axios from 'axios'

const DB_URL = 'https://pet-found.herokuapp.com/user'

const config = (route: string, userInfo: {
    email: string,
    password: string,
    name: string | null,
    address: {
        state: string | null,
        county: string | null,
        street: string | null
    },
    contacts: {
        tel1: string | null,
        tel2: string | null,
        facebook: string | null,
        instagram: string | null
    }
}) => {

    return {
        method: 'POST',
        url: `${DB_URL}${route}`,
        headers: {
            'Content-Type': 'application/json'
            // 'Authorization': `Bearer ${}`
        },
        data: userInfo

    }

}

export const registerUser = async (info: any) => {

    console.log(info)

    const { data } = await Axios(
        config('/register', info)
    )

    return data;

}

export const loginUser = () => {

}