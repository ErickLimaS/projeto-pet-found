import styled from 'styled-components';

interface Props {

    mobileMenu: Boolean

}

export const MobileList  = styled.ul<Props>`

    z-index: 10;

    transition: all ease-in-out 100ms;

    top: 0vh;
    position: absolute;

    left: ${props => props.mobileMenu === true ? '0vw!important' : '-100vw!important'};
    flex-direction: column;

    padding-top: 3rem;
    padding-bottom: 1rem;
    width: 100%;

    background-color: var(--brand-color);

    >div{

        height: inherit;

        display: flex;
        justify-content: flex-end;

    }

    svg{
        transform: scale(1);
        width: 2.4rem;
        height: 2.4rem;

    }

    li{
        margin: 1rem 1rem;
        padding: 0.5rem 0;
    }

    a{

        display: flex;

        :hover{

            border-bottom: none!important;

        }

    }


`