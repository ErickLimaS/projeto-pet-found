import { AnyAction, Dispatch } from "@reduxjs/toolkit";
import { CAT_PET_CHOSE, COMPLETE_CREATING_POST, DOG_PET_CHOSE, ERROR_PET_CHOSE, OTHER_PET_CHOSE, REINICIATE_CREATING_POST, STEP_1_CREATING_POST, STEP_2_CREATING_POST, STEP_3_CREATING_POST } from "../constants/lostPetPostStepsContants";

export const changeCreateLostPetPostSteps = (currentStep: number) => async (dispatch: Dispatch<AnyAction>) => {

    const nextStep: number = currentStep + 1

    switch (currentStep) {

        case 1: //currentStep
            //next step
            dispatch({
                type: STEP_2_CREATING_POST,
                payload: nextStep
            })
            break;
        case 2: //currentStep
            //next step
            dispatch({
                type: STEP_3_CREATING_POST,
                payload: nextStep
            })
            break;
        case 3: //currentStep
            //next step
            dispatch({
                type: COMPLETE_CREATING_POST,
                payload: nextStep // it will be 4, which means it is completed
            })
            break;
        default:
            dispatch({
                type: REINICIATE_CREATING_POST,
                payload: 1 // from the beginning
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