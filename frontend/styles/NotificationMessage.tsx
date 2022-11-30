import styled from 'styled-components';

interface Props {

    status?: number,
    success?: boolean

}

export const Container = styled.div<Props>`

    animation: disapear_after_5seconds forwards 5000ms;

    position: fixed;
    top: 2vh;
    right: 2vw;

    z-index: 100000;

    padding: 16px;                                                             

    background-color: var(--white);
    border: 2px solid ${props => props.success === true ? 'var(--success)' : 'var(--error)'};

    border-radius: 10px;

    h1{

        border-left: 2px solid ${props => props.success === true ? 'var(--success)' : 'var(--error)'};

        padding-left: 10px;
        margin-bottom: 16px;

        color: ${props => props.success === true ? 'var(--success)' : 'var(--error)'};

        font-size: var(--small-1);
        line-height: 1;

    }
    p{
        
        margin-left: 10px;
        font-size: var(--small-2);
        line-height: 1;

    }
    @keyframes disapear_after_5seconds {

        0%{
            opacity: 1;
        }
        75%{
            opacity: 1;
        }
        100%{
            opacity: 0;
        }

    }

`