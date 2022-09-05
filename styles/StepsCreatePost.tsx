import styled from "styled-components";

interface Props {

    currentStep: number

}

export const Container = styled.div<Props>`

    ol {

        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;

        border: 2px solid var(--grey4);
        border-radius: 4px;

        @media(max-width: 620px){

            flex-direction: column;
            align-items: flex-start;

            svg{

                display: none;
                
            }

        }

    }

    ol svg{

        fill: gray;

    }

    ol li {
        transition: all ease-in-out 70ms;
        margin: 1rem;

        border-bottom: 2px solid transparent;

        font-weight: 600;
        color: var(--grey);

        transform: scale(0.9);

    }

    li#step1{

        transform: ${props => props.currentStep === 1 && 'scale(1)'};
        border-bottom: ${props => props.currentStep === 1 && '2px solid var(--brand-color)'};
        color: ${props => props.currentStep === 1 && 'var(--black3)'};

    }
    li#step2{
        
        transform: ${props => props.currentStep === 2 && 'scale(1)'};
        border-bottom: ${props => props.currentStep === 2 && '2px solid var(--brand-color)'};
        color: ${props => props.currentStep === 2 && 'var(--black3)'};

    }
    li#step3{
        
        transform: ${props => props.currentStep === 3 && 'scale(1)'};
        border-bottom: ${props => props.currentStep === 3 && '2px solid var(--brand-color)'};
        color: ${props => props.currentStep === 3 && 'var(--black3)'};

    }

    ol li:last-child {


    }



`