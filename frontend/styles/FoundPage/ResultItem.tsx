import styled from "styled-components";

interface Props {

    hasReward: boolean

}

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

        flex-direction: column;
        align-items: center;

        width: 100%;
        min-width: initial;
        
        >div:first-child{
            width: 80%!important;
        }
        >div:last-child{

            padding: 8px 16px;

            width: 100%!important;
        }

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

            .name_icon_container{

                margin-bottom: 16px;
                display: flex;
                
                @media(max-width: 820px){
                    

                    flex-direction: row;
                    align-items: center;
                    justify-content: center;

                }

                h3{

                    font-size: var(--fs-heading5);
                    font-weight: 600;

                    line-height: 1.2;
                    
                    @media(max-width: 820px){


                        text-align: center;

                    }

                    @media(max-width: 480px){
                        
                        font-size: var(--fs-paragraph);

                    }

                }

            }
            
            p{

                font-size: var(--small-2);

            }
            
        }

    }


`
// mobile icon
export const ItemRewardIconMobile = styled.div<Props>`

    @media(min-width: 820px){

        display: none;

    }

    position: relative;
    top: -0;
    right: -0;

    border-radius: 50%;

    margin-left: 10px;

    height: 40px;
    width: 40px;

    background-color: ${props => props.hasReward ? 'var(--secondary)' : 'var(--black-75)'};

    svg{

        display: block;
        
        transform: scale(0.8);
        fill: var(--white);

        position: relative;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;

    }

`
// desktop icon
export const ItemRewardIcon = styled.div<Props>`

    position: absolute;
    top: -70px;
    right: -70px;

    height: 105px;
    width: 185px;

    transform: rotate(45deg);

    background-color: ${props => props.hasReward ? 'var(--secondary)' : 'var(--black-75)'};

    
    @media(max-width: 820px){

        display: none;

    }
    

    svg{
        transform: scale(0.7)  rotate(-45deg);

        fill: var(--white);

        position: relative;
        top: 60%;
        left: 54%;

    }

`