import styled from "styled-components";

//styled-components
const Container = styled.div`
    background-color: #DFDFDF;
    border-radius: 10px;
    border: 1px solid #DDDDDD;
    display: inline-block;
    @media all and (max-width: 768px){
        //브라우저 창 width가 768px보다 작아지는 순간부터 적용
        //모바일
        width: calc(100%/2);
    }
    @media all and (min-width: 768px){
        //브라우저 창 width가 1024px보다 커지는 순간부터 적용
        //데스크탑
        width: calc(100%/3);
    }
`;
const Img = styled.img`
    width: 100%;
    @media all and (max-width: 768px){
        //브라우저 창 width가 768px보다 작아지는 순간부터 적용
        //모바일
        height: 30vw;
    }
    @media all and (min-width: 768px){
        //브라우저 창 width가 1024px보다 커지는 순간부터 적용
        //데스크탑
        height: 20vw;
    }
`;
const Title = styled.div`
    width: 100%;
    height: 20px;
    overflow: hidden;
    font-size: 16px;
    font-weight: 600;
    padding: 2px 4px;
`;
const DateCreated = styled.div`
    width: 100%;
    height: 18px;
    font-size: 14px;
    padding: 2px 4px;
`;
interface ICard{
    href: string;
    title: string;
    dateCreated: string;
}
function Card({href, title, dateCreated}:ICard){
    return <Container>
        <Img src={href} alt="사진없음"/>
        <Title>{title}</Title>
        <DateCreated>{dateCreated}</DateCreated>
    </Container>;
}

export default Card;
