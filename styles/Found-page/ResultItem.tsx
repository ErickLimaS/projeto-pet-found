import styled from "styled-components";

export const Container = styled.a`

    display: flex;
    flex-direction: row;
    align-items: stretch;
    justify-content: center;

    min-width: 300px;
    width: 760px;

    border-radius: 8px;

    background-color: var(--black-10);
    
    @media(max-width: 1240px){

        width: 650px;

    }
    
    @media(max-width: 1240px){

        width: 540px;

    }

    @media(max-width: 960px){

        width: 460px;

    }
    
    @media(max-width: 820px){

        width: 100%;

    }

    :hover{
        transition: all ease-in-out 100ms;

        transform: scale(1.01);

        box-shadow: 3px 3px 5px 0px var(--black-25);

    }

    .image_container{

        padding: 24px;
        width: 30%!important;
        
        @media((min-width: 476px) and (max-width: 960px)){
            
            padding: 12px;

            display: flex;
            flex-direction: column;
            justify-content: center;

        }
        
        @media(max-width: 475px){

            width: 40%!important;
            padding: 8px;

            display: flex;
            flex-direction: column;
            justify-content: center;

        }

        img{
            border-radius: 16px;
        }

    }

    .item_info{

        position: relative;
        top: 0;

        height: inherit;
        width: 70%;

        display: flex;
        flex-direction: row;
        align-items: stretch;
        justify-content: flex-start;

        overflow: hidden;
        border-radius: 8px;
        
        @media(max-width: 475px){

            width: 60%;

        }

        .pet_details{

            margin: 24px 0;
            width: 100%;
            
            h3{

                font-size: 1.777rem;
                font-weight: 600;

                
                @media(max-width: 480px){
                    
                    font-size: 1.333rem;

                }
                
            }

            p{

                font-size: 0.8rem;

            }
            

        }

    }


`

export const ItemRewardIcon = styled.div`

    position: absolute;
    top: -40px;
    right: -70px;

    height: 105px;
    width: 185px;

    transform: rotate(45deg);

    background-color: var(--secondary);
    
    @media(max-width: 425px){

        top: -35px;
        right: -40px;

        height: 72px;
        width: 92px;

    }

    svg{
        transform: scale(0.8)  rotate(-45deg);

        fill: var(--white);

        position: relative;
        top: 50%;
        left: 42%;

        @media(max-width: 425px){

            transform: scale(0.6)  rotate(-45deg);

            top: 48%;
            left: 34%;

        }

    }

`