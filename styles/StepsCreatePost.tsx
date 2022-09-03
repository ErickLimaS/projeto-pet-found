import styled from "styled-components";

export const Container = styled.div`

    ol {

        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;

        @media(max-width: 620px){

            flex-direction: column;
            align-items: flex-start;

        }

    }

    ol li {

        margin: 1rem;

    }

    ol li:last-child {

        margin-right: 0;

    }



`