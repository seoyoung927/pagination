import { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import CardList from '../componenets/CardList';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { cardsState, currentSectionState } from '../recoil/pagination';

//styled-components
const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    column-gap: 0px;
`;
const Title = styled.div`
    font-size: 28px;
    font-weight: 600;
    width: 100px;
    height: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
`;

function HomePage() {
    const currentSection = useRecoilValue(currentSectionState);
    const setCards = useSetRecoilState(cardsState);
    const cardPerPage = 30;
    const [isLoading, setIsLoading] = useState(true);

    useEffect(()=>{
        let page_start = Math.floor((cardPerPage*(currentSection-1)*10)/100)+1;
        let start_ = (cardPerPage*(currentSection-1)*10)%100;
        let page_end = Math.floor((cardPerPage*currentSection*10)/100)+1;
        let end_ = (cardPerPage*currentSection*10)%100;

        for(let i=page_start;i<=page_end;i++){
            axios.get(`https://images-api.nasa.gov/search?q=apollo&page=${i}&media_type=image`)
                .then((res)=>{
                    if(i===page_start){
                        setCards(res.data.collection.items.filter((c:any)=>c.data).filter((c:any)=>c.links).slice(start_,100));
                    }else if(i===page_end){
                        setCards((cur)=>[...cur, ...res.data.collection.items.filter((c:any)=>c.data).filter((c:any)=>c.links).slice(0,end_)]);
                    }else{
                        setCards((cur)=>[...cur,...res.data.collection.items.filter((c:any)=>c.data).filter((c:any)=>c.links)]);
                    }
            }).catch((err)=>{
                console.log(err);
            });
        }
        
        setIsLoading(false);
    },[currentSection]);
  
    return (
        <Container>
            <Title>
                Pagination
            </Title>
            {isLoading?"Loading":<CardList cardPerPage={cardPerPage}/>}
        </Container>
    );
}

export default HomePage;
