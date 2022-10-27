import { configureStore } from '@reduxjs/toolkit'
import { changeCreateLostPetPostStepsReducer, chooseWhichAnimalReducer, setCaracteristicasPetReducer, setOwnerAndPetInfoTogetherReducer, setPetGenreReducer, setPetInfoReducer, setPetMoreInfoReducer, setPetNameReducer, setPetRaceReducer } from './redux/reducers/lostPetPostStepsReducer'
import { currentUserReducer } from './redux/reducers/userReducer'

const initialState: any = {
    currentUser: {
        name: typeof window !== "undefined" &&
            localStorage.getItem('name') ? localStorage.getItem('name') : null,
        token: typeof window !== "undefined" &&
            localStorage.getItem('token') ? localStorage.getItem('token') : null
    },
    changeCreateLostPetPostSteps: {
        currentStep: 0
    }
}

export const store = configureStore({
    reducer: {

        //user related
        currentUser: currentUserReducer,

        // pets related
        changeCreateLostPetPostSteps: changeCreateLostPetPostStepsReducer,
        chooseWhichAnimal: chooseWhichAnimalReducer,
        setPetName: setPetNameReducer,
        setPetGenre: setPetGenreReducer,
        setPetRace: setPetRaceReducer,
        setCaracteristicasPet: setCaracteristicasPetReducer,
        setPetMoreInfo: setPetMoreInfoReducer,
        setPetInfo: setPetInfoReducer,
        setOwnerAndPetInfoTogether: setOwnerAndPetInfoTogetherReducer

    },
    preloadedState: initialState
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch