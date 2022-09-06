import { configureStore } from '@reduxjs/toolkit'
import { changeCreateLostPetPostStepsReducer, chooseWhichAnimalReducer } from './redux/reducers/lostPetPostStepsReducer'

const initialState: any = {
    changeCreateLostPetPostSteps: {
        currentStep: 0
    }
}

export const store = configureStore({
    reducer: {

        changeCreateLostPetPostSteps: changeCreateLostPetPostStepsReducer,
        chooseWhichAnimal: chooseWhichAnimalReducer

    },
    preloadedState: initialState
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch