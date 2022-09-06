import React from "react";
import { CAT_PET_CHOSE, COMPLETE_CREATING_POST, DOG_PET_CHOSE, ERROR_PET_CHOSE, OTHER_PET_CHOSE, REINICIATE_CREATING_POST, STEP_1_CREATING_POST, STEP_2_CREATING_POST, STEP_3_CREATING_POST } from "../constants/lostPetPostStepsContants";

export const changeCreateLostPetPostStepsReducer = (state = {}, action: any) => {

    switch (action.type) {

        case STEP_1_CREATING_POST:
            return { ...state, currentStep: action.payload }
        case STEP_2_CREATING_POST:
            return { ...state, currentStep: action.payload }
        case STEP_3_CREATING_POST:
            return { ...state, currentStep: action.payload }
        case COMPLETE_CREATING_POST:
            return { ...state, currentStep: action.payload, success: true }
        case REINICIATE_CREATING_POST:
            return { ...state, currentStep: action.payload, error: true }
        default:
            return state
    }

}

export const chooseWhichAnimalReducer = (state = {}, action: any) => {

    switch (action.type) {

        case DOG_PET_CHOSE:
            return { ...state, animal: action.payload }
        case CAT_PET_CHOSE:
            return { ...state, animal: action.payload }
        case OTHER_PET_CHOSE:
            return { ...state, animal: action.payload, success: true }
        case ERROR_PET_CHOSE:
            return { ...state, animal: action.payload, error: true }
        default:
            return state
    }

}