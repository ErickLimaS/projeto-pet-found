import { AnyAction, Dispatch } from "@reduxjs/toolkit";
import { CAT_PET_CHOSE, COMPLETE_CREATING_POST, DOG_PET_CHOSE, ERROR_PET_CHOSE, OTHER_PET_CHOSE, REINICIATE_CREATING_POST, SET_CARACTERISTICAS_PET, SET_PET_INFO_ERROR, SET_PET_INFO_REQUEST, SET_PET_INFO_SUCCESS, STEP_1_CREATING_POST, STEP_2_CREATING_POST, STEP_3_CREATING_POST } from "../constants/lostPetPostStepsContants";

export const changeCreateLostPetPostSteps = (currentStep: number, nextStep: number, direction: string) => async (dispatch: Dispatch<AnyAction>) => {

    switch (currentStep) {

        case 0: //currentStep
            dispatch({
                type: STEP_1_CREATING_POST,
                payload: nextStep
            })
            break;

        case 1: //currentStep
            if (direction === 'next') {
                dispatch({
                    type: STEP_2_CREATING_POST, // it will be 2, next page
                    payload: nextStep
                })
                break;
            }
            else {
                dispatch({
                    type: STEP_1_CREATING_POST, // it will be 1, previous page
                    payload: nextStep
                })
                break;
            }

        case 2: //currentStep
            if (direction === 'next') {
                dispatch({
                    type: STEP_3_CREATING_POST, // it will be 3, next page
                    payload: nextStep
                })
                break;
            }
            else {
                dispatch({
                    type: STEP_1_CREATING_POST, // it will be 2, previous page
                    payload: nextStep
                })
                break;
            }

        case 3: //currentStep
            if (direction === 'next') {
                dispatch({
                    type: COMPLETE_CREATING_POST,
                    payload: nextStep // it will be 4, which means it is completed
                })
                break;
            }
            else {
                dispatch({
                    type: STEP_2_CREATING_POST,
                    payload: nextStep // it will be 2, previous page
                })
                break;
            }
        default:
            dispatch({
                type: REINICIATE_CREATING_POST,
                payload: 0 // from the beginning
            })
            break;
    }

}

export const chooseWhichAnimal = (animal: string) => async (dispatch: Dispatch<AnyAction>) => {

    switch (animal) {

        case 'DOG':
            dispatch({
                type: DOG_PET_CHOSE,
                payload: "DOG"
            })
            break
        case 'CAT':
            dispatch({
                type: CAT_PET_CHOSE,
                payload: "CAT"
            })
            break
        case 'OTHER':
            dispatch({
                type: OTHER_PET_CHOSE,
                payload: "OTHER"
            })
            break
        default:
            dispatch({
                type: ERROR_PET_CHOSE,
                payload: "ERROR"
            })
            break

    }

}

export const setCaracteristicasPet = (particulars: any) => async (dispatch: Dispatch<AnyAction>) => {

    dispatch({
        type: SET_CARACTERISTICAS_PET,
        payload: particulars
    })

}

export const setPetInfo = (info: any) => async (dispatch: Dispatch<AnyAction>) => {

    try {

        dispatch({
            type: SET_PET_INFO_REQUEST,
            payload: info
        })

        dispatch({
            type: SET_PET_INFO_SUCCESS,
            payload: info
        })

    }
    catch (error: any) {

        dispatch({
            type: SET_PET_INFO_ERROR,
            payload: info
        })

        console.log(error)

    }
}
