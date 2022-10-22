import styled from "styled-components";

interface Props {
    animal: string
}

export const AnimalItem = styled.li<Props>`

    height: 100%;

    border: 2px solid var(--brand-color2);

    border-radius: 4px;

    #DOG, #CAT, #OTHER {

        transition: all ease-in-out 200ms;

        border-radius: 4px;

    }

    #CAT {
        background-color: ${props => props.animal === 'CAT' && 'var(--brand-color)'};
        
        transform: ${props => props.animal === 'CAT' && 'scale(1.05)'};

        color: ${props => props.animal === 'CAT' && 'var(--white)'};

        box-shadow: ${props => props.animal === 'CAT' && '20px 20px 15px 0px rgb(151, 151, 151)'};
    }
    
    #DOG {
        background-color: ${props => props.animal === 'DOG' && 'var(--brand-color)'};
        
        transform: ${props => props.animal === 'DOG' && 'scale(1.05)'};

        color: ${props => props.animal === 'DOG' && 'var(--white)'};

        box-shadow: ${props => props.animal === 'DOG' && '20px 20px 15px 0px rgb(151, 151, 151)'};
    }

    #OTHER {
        background-color: ${props => props.animal === 'OTHER' && 'var(--brand-color)'};

        transform: ${props => props.animal === 'OTHER' && 'scale(1.05)'};

        color: ${props => props.animal === 'OTHER' && 'var(--white)'};

        box-shadow: ${props => props.animal === 'OTHER' && '20px 20px 15px 0px rgb(151, 151, 151)'};
    }

    button {

        padding: 4rem 1rem;

        width: 100%;

        background-color: transparent;

        border: 0;

    }

    button:hover{

        cursor: pointer;

    }

    a.center_img {

        display: flex;
        justify-content: center;
        align-items: center;

        height: 100%;
        width: 100%;

    }

    :hover {

        transition: all ease 200ms;
        top: 2vh !important;

        box-shadow: 20px 20px 15px 0px rgb(201, 201, 201);

    }

    img {

        border-radius: 4px;

    }

    :hover img {

        transition: all ease 200ms;

        top: -1vh !important;

        transform: scale(1.1);
        border-radius: 49px 49px 39px 39px;

    }

    h2 {

        margin-top: 1rem;

        font-size: 2rem;
        font-weight: 400;

    }


`