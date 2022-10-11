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

    width: 100%;

    background-color: var(--primary);

    >div{

        height: inherit;

        display: flex;
        justify-content: flex-end;

    }

    div.button-container{

        padding: 16px;

    }
    
    div.button-container button{
            
        display: flex;
        align-items: center;
        justify-content: center;

    }

    li.login {

        padding: 0 8px;

        font-size: 1.1rem;

        svg{
            margin-right: 16px;
            transform: scale(1.6);
            width: 16px;
            height: 16px;
        }

    }

    li{
        margin: 16px;
    }

    a{

        display: flex;
        align-items: center;

        :hover{

            border-bottom: none!important;

        }

    }


`