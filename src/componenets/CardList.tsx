import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import { cardsState, currentPageState, currentSectionState } from "../recoil/pagination";
import Card from "./Card";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;
const CardsDiv = styled.div`
    @media all and (max-width: 768px){
        //브라우저 창 width가 768px보다 작아지는 순간부터 적용
        //모바일
        width: 100%;
        row-count: 2;
    }
    @media all and (min-width: 768px){
        //브라우저 창 width가 1024px보다 커지는 순간부터 적용
        //데스크탑
        width: 60%;
        row-count: 3;
    }
    column-gap: 0px;
`;
const PaginationBarWrapper = styled.div`
    width: 100%;
    padding: 40px 0px;
    display: flex;
    justify-content: center;
    align-items: center;
`;
interface IButton{
    isCurrentPage: boolean;
    isValid: boolean;
}
const Button = styled.button<IButton>`
    background-color: white;
    width: 32px;
    height: 32px;
    color: ${(props)=>props.isValid ? "#000000" : "#BCBCBC"};
    border: 1px solid ${(props)=>props.isCurrentPage ? "#1b6699" : "#BCBCBC"};
    &:hover{
        border: 1px solid #1b6699;
    }
`;

interface ICardList{
    cardPerPage: number;
}
function CardList({cardPerPage}:ICardList){
    //recoil
    const [currentPage, setCurrentPage] = useRecoilState(currentPageState);
    const [currentSection, setCurrentSection] = useRecoilState(currentSectionState);
    const cards = useRecoilValue(cardsState);
    const [isLoading, setIsLoading] = useState(true);
    const [arr, setArr] = useState<number[]>([]);
    useEffect(()=>{
        //let tmp : number[] = [];
        setArr([]);
        for(let i=1;i<=Math.ceil(cards.length/cardPerPage);i++){
            setArr((cur:number[])=>[...cur,i]);
        }
        setIsLoading(false);
    },[cards]);

    const onBeforeSection = (e:React.MouseEvent<HTMLButtonElement>) => {
        setCurrentSection((cur:number)=>cur-1);
        setCurrentPage(10);
    }
    const onClick = (e:React.MouseEvent<HTMLButtonElement>) => {
        setCurrentPage(Number(e.currentTarget.value));
    }
    const onNextSection = (e:React.MouseEvent<HTMLButtonElement>) => {
        setCurrentSection((cur:number)=>cur+1);
        setCurrentPage(1);
    }
    
    return (<Container>
    <CardsDiv>
        {cards.slice((currentPage-1)*cardPerPage,(currentPage)*cardPerPage)?.map((card)=><Card key={card?.data[0]?.nasa_id} href={card?.links[0]?.href} title={card?.data[0]?.title} dateCreated={card?.data[0]?.date_created}/>)}
    </CardsDiv>
        <PaginationBarWrapper>
            {currentSection!==1 ? <Button onClick={onBeforeSection} isCurrentPage={false} isValid={true}>◁</Button>:<Button isCurrentPage={false} isValid={false}>◁</Button>}
            {[1,2,3,4,5,6,7,8,9,10].map((a,index)=>(arr.includes(a) ? <Button key={index} value={a} onClick={onClick} isCurrentPage={a===currentPage} isValid={true}>{a+(currentSection-1)*10}</Button>
            :<Button key={index} value={a} isCurrentPage={false} isValid={false}>{a+(currentSection-1)*10}</Button>))}
            {cards.length===cardPerPage*10 ? <Button onClick={onNextSection} isCurrentPage={false} isValid={true}>▷</Button>:<Button isCurrentPage={false} isValid={false}>▷</Button>}
        </PaginationBarWrapper>
    </Container>);
}

export default CardList;
