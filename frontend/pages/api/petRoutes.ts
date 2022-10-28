import axios from "axios"
import { store } from "../../store"

const DB_URL = 'https://pet-found.herokuapp.com/pets'

const state: any = store.getState()
const userToken: string = state.currentUser.token

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

const config = (route: string, petInfo: petDataTypes) => {

    return {
        method: "POST",
        url: `${DB_URL}${route}`,
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${userToken}`
        },
        data: petInfo
    }

}

// makes POST request to register a new lost pet post and relate it with his owner
export const createPetPost = async (info: petDataTypes) => {

    try {

        const data = await axios(
            config("/register", info)
        ).then(response => {

            if (response.status === 201) {

                

            }

        })

    }
    catch (error: any) {

        console.log(error)

    }

}