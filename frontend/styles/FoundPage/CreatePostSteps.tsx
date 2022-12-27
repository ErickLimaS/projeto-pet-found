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
        flex-direction: column;
        align-items: flex-start;
        justify-content: center;

        border: 2px solid var(--black-10);
        border-radius: 4px;

        svg{

            display: none;

        }

        @media(min-width: 620px){

            flex-direction: row;
            align-items: center;

            svg{

                display: block;

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

        font-size: var(--small-2);
        font-weight: 600;
        color: var(--black-50);

        @media(min-width: 620px){

            transform: scale(0.9);
            
        }

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