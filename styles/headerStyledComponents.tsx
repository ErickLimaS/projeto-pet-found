import styled from 'styled-components';

interface Props {

    mobileMenu: Boolean

}

export const mobileList  = styled.ul<Props>`

    display: ${props => props.mobileMenu === true ? 'flex!important' : 'none!important'};
    flex-direction: column;

    right: 0;
    top: 12vh;
    position: absolute;

    padding: 2rem 0;
    width: 100%;

    background-color: var(--brand-color);
    box-shadow: 20px 0px 20px 0px #5f5f5f;

    li{
        margin: 0.5rem 1rem;
        padding: 0.5rem 0;
    }


`