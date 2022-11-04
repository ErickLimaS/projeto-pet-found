import React, { SetStateAction, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { setCaracteristicasPet } from '../../redux/actions/lostPetPostStepsActions'
import Step2FormStyles from '../../styles/FoundPage/steps/Step2Form.module.css'

function PetCaracteristicas() {

    const inputCaracteristicas = React.createRef<HTMLInputElement>()
    const [caracteristicasArray, setCaracteristicasArray] = useState<SetStateAction<any>>([])

    const dispatch: any = useDispatch()

    // store data to Redux store and useState each time user hits the add button
    const addCaracteristicasArray = () => {

        setCaracteristicasArray((oldArray: any) =>
            [...oldArray, inputCaracteristicas?.current?.value])

    }
    const removeItemFromCaracteristicasArray = () => {

        setCaracteristicasArray((oldArray: any) =>
            [...oldArray.slice(0, oldArray.length - 1)]
        )

    }

    useEffect(() => {

        dispatch(setCaracteristicasPet(caracteristicasArray))

    }, [caracteristicasArray])

    return (
        <div>
            <label htmlFor='caracteristicas'>
                Características relacionadas a essa raça

                <small>Uma característica por vez</small>

                <div className={Step2FormStyles.caracteristicas_input_button}>

                    <input type='text' id='caracteristicas' name='adicionar_caracteristicas_do_pet' ref={inputCaracteristicas} placeholder='Brincalhão, late muito...'></input>

                    <button type='button' name='enviar_atual_caracteristica'
                        onClick={() => addCaracteristicasArray()}>
                        Adicionar
                    </button>

                </div>

                {(caracteristicasArray?.length > 0) && (
                    <>

                        <ul className={Step2FormStyles.grid_list_caracteristicas}>
                            {caracteristicasArray.map((item: any) => (

                                <li key={item}>
                                    {item?.slice(0, 1).toUpperCase()}{item?.slice(1, item.length)}
                                </li>

                            ))}
                        </ul>

                        <button type='button' className={Step2FormStyles.reset_button}
                            onClick={() => removeItemFromCaracteristicasArray()}>
                            Apagar Última Característica
                        </button>

                    </>
                )}

            </label>
        </div>
    )
}

export default PetCaracteristicas