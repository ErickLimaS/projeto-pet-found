import React, { SetStateAction, useState } from 'react'
import { useDispatch } from 'react-redux'
import { setCaracteristicasPet } from '../../redux/actions/lostPetPostStepsActions'
import Step2FormStyles from '../../styles/Step2Form.module.css'

function PetCaracteristicas() {

    const inputCaracteristics = React.createRef<HTMLInputElement>()
    const [caracteristicsArray, setCaracteristicsArray] = useState<SetStateAction<any>>([])

    const dispatch: any = useDispatch()

    // store data to Redux store and useState each time user hits the add button
    const addCaracteristicasListToStore = () => {

        setCaracteristicsArray((oldArray: any) =>
            [...oldArray, inputCaracteristics?.current?.value]
        )
        
        dispatch(setCaracteristicasPet(caracteristicsArray))

    }

    return (
        <div>
            <label htmlFor='caracteristicas'>
                Características relacionadas a essa raça

                <small>Uma característica por vez</small>

                <div className={Step2FormStyles.caracteristicas_input_button}>

                    <input type='text' id='caracteristicas' name='adicionar_caracteristicas_do_pet' ref={inputCaracteristics} placeholder='Brincalhão, late muito...'></input>

                    <button type='button' name='enviar_atual_caracteristica'
                        onClick={() => addCaracteristicasListToStore()}>
                        Adicionar
                    </button>

                </div>

                {(caracteristicsArray.length > 0) && (
                    <>

                        <ul className={Step2FormStyles.grid_list_caracteristicas}>
                            {caracteristicsArray.map((item: any) => (

                                <li key={item}>
                                    {item?.slice(0, 1).toUpperCase()}{item?.slice(1, item.length)}
                                </li>

                            ))}
                        </ul>

                        <button type='button' className={Step2FormStyles.reset_button}
                            onClick={() => setCaracteristicsArray((oldArray: any) =>
                                [oldArray.pop()])}>
                            Apagar Última Característica
                        </button>

                    </>
                )}

            </label>
        </div>
    )
}

export default PetCaracteristicas