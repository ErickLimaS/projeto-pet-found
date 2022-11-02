import styled from "styled-components";

interface Props {

    currentStep: number

}

export const Container = styled.div<Props>`

    @media(max-width: 1024px){
        margin: 16px 0;
        width: 100%;
    }

    ol {

        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;

        border: 2px solid var(--black-10);
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

        fill: var(--black-50);

    }

    ol li {
        transition: all ease-in-out 70ms;
        margin: 16px;

        border-bottom: 2px solid transparent;

        font-weight: 600;
        color: var(--black-50);

        transform: scale(0.9);

    }

    li#step1{

        transform: ${props => props.currentStep === 1 && 'scale(1)'};
        border-bottom: ${props => props.currentStep === 1 && '2px solid var(--primary)'};
        color: ${props => props.currentStep === 1 && 'var(--black)'};

    }
    li#step2{
        
        transform: ${props => props.currentStep === 2 && 'scale(1)'};
        border-bottom: ${props => props.currentStep === 2 && '2px solid var(--primary)'};
        color: ${props => props.currentStep === 2 && 'var(--black)'};

    }
    li#step3{
        
        transform: ${props => props.currentStep === 3 && 'scale(1)'};
        border-bottom: ${props => props.currentStep === 3 && '2px solid var(--primary)'};
        color: ${props => props.currentStep === 3 && 'var(--black)'};

    }


`