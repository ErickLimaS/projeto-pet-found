import styled from 'styled-components';

interface Props {

    mobileMenu: Boolean

}

export const mobileList  = styled.ul<Props>`

    z-index: 10;

    display: ${props => props.mobileMenu === true ? 'flex!important' : 'none!important'};
    flex-direction: column;

    right: 0;
    top: 12vh;
    position: absolute;

    padding: 2rem 0;
    width: 100%;

    background-color: var(--brand-color);
    box-shadow: 0px 0px 10px 0px #8080809e;

    li{
        margin: 0.5rem 1rem;
        padding: 0.5rem 0;
    }


`