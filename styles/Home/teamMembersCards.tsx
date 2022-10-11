import styled from "styled-components";

interface Props{

    showingMemberIndex: string

}

export const MemberCardsSection = styled.section<Props>`

    // its applied ONLY ON MEDIA 425PX OR LESS

    width: 100%;

    margin: 0;
    padding: 2rem 0;

    position: relative;
    z-index: 10;

    display: flex;

    @media(min-width: 426px){

        display: none;

    }
    
    flex-direction: column;
    align-items: center;

    ::before {

        top: 0;
        left: 0;

        min-height: 120%;
        max-height: 130vh;
        width: 100%;

        content: '';

        overflow: hidden;
        position: absolute;
        z-index: -1;

        background-image: url('/imgs/home/background-2-mobile.png');
        background-repeat: no-repeat;
        background-position: top;
        background-size: 100% 100%;

    }

    h2 {

        margin-bottom: 96px;

        color: var(--white);

    }

    ul.grid {

        margin: 0 56px;

        display: grid;
        grid-template-columns: repeat(1, 280px);
        justify-content: space-evenly;
        align-items: center;
        gap: 0 20px;

    }
    
    li.grid_item {

        max-width: 280px;
        max-width: 280px;

        min-height: 480px;
        max-height: 520px;

        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        background-color: var(--white);

        border-radius: 12px;

        box-shadow: 3px 3px 4px 4px var(--black-25);

    }

    li.grid_item img {

        min-width: 120px;
        min-height: 120px;

        margin-top: 48px;
        border-bottom: 32px;

        border-radius: 50%;

        background-color: rgb(255, 145, 145);

    }

    li.grid_item h3 {

        margin-top: 1rem;

        color: var(--black);

    }

    li.grid_item p {

        height: 200px;

        margin-top: 24px;
        margin-bottom: 40px;
        margin-left: 20px;
        margin-right: 20px;

        text-align: center;

        color: var(--black-75);

    }

    // show only the card with same index of spans dots

    li.grid_item:not([data-member-index='${props => props.showingMemberIndex}']){

        display: none;

    }

    .progress_dots {

        display: flex;
        gap: 32px;

        margin-top: 32px;

    }

    .progress_dots span {

        height: 20px;
        width: 20px;

        background: var(--brand-gradient);

        border-radius: 50%;

        box-shadow: 3px 3px 0px 0px var(--black-25);

    }

    .progress_dots span[data-card-index='${props => props.showingMemberIndex}'] {

        transition: all ease-in 150ms;

        background: var(--secondary);

        transform: scale(1.3);

    }

`