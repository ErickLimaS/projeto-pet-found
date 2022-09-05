import React from "react";
import { COMPLETE_CREATING_POST, REINICIATE_CREATING_POST, STEP_1_CREATING_POST, STEP_2_CREATING_POST, STEP_3_CREATING_POST } from "../constants/lostPetPostStepsContants";

export const changeCreateLostPetPostStepsReducer = (state = {}, action: any) => {

    switch (action.type) {

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