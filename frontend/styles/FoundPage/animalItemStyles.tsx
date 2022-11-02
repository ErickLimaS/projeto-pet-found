import styled from "styled-components";

interface Props {
    animal: string
}

export const AnimalItem = styled.li<Props>`

    height: 100%;

    border: 2px solid var(--primary);

    border-radius: 4px;

    button#DOG, button#CAT, button#OTHER {

        transition: all ease-in-out 200ms;

        border-radius: 4px;
        
        height: inherit;

    }

    button#CAT {
        background: ${props => props.animal === 'CAT' && 'var(--brand-gradient)'};
        background-color: var(--white);
        
        transform: ${props => props.animal === 'CAT' && 'scale(1.03)'};

        color: ${props => props.animal === 'CAT' && 'var(--white)'};

        box-shadow: ${props => props.animal === 'CAT' && '20px 20px 15px 0px var(--black-50)'};

        h2{
            
            color: ${props => props.animal === 'CAT' ? 'var(--white)' : 'var(--black)'};

        }

    }
    
    button#DOG {
        background: ${props => props.animal === 'DOG' && 'var(--brand-gradient)'};
        background-color: var(--white);

        transform: ${props => props.animal === 'DOG' && 'scale(1.03)'};

        color: ${props => props.animal === 'DOG' && 'var(--white)'};

        box-shadow: ${props => props.animal === 'DOG' && '20px 20px 15px 0px var(--black-50)'};

        h2{
            
            color: ${props => props.animal === 'DOG' ? 'var(--white)' : 'var(--black)'};
        }

    }

    button#OTHER {
        background: ${props => props.animal === 'OTHER' && 'var(--brand-gradient)'};
        background-color: var(--white);
        
        transform: ${props => props.animal === 'OTHER' && 'scale(1.03)'};

        color: ${props => props.animal === 'OTHER' && 'var(--white)'};

        box-shadow: ${props => props.animal === 'OTHER' && '20px 20px 15px 0px var(--black-50)'};
        
        h2{
            
            color: ${props => props.animal === 'OTHER' ? 'var(--white)' : 'var(--black)'};

        }
    }

    button {

        padding: 32px 16px;

        @media(max-width: 768px){

            padding: 16px;

        }

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

        box-shadow: 20px 20px 15px 0px var(--black-25);

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

        margin-top: 16px;

        font-size: 24px;

        /* font-weight: 400; */

    }


`