import {atom} from "recoil";

interface IData{
    center: string;
    date_created: string;
    description: string;
    description_508: string;
    keywords: string[];
    media_type: string;
    nasa_id: string;
    title: string;
}
interface ILinks{
    href: string;
    rel: string;
    render: string;
}
interface ICards{
    data: IData[];
    links: ILinks[];
}

export const currentSectionState = atom<number>({
    key: "currentSection",
    default: 1,
})
export const currentPageState = atom<number>({
    key: "currentPage",
    default: 1
})
export const cardsState = atom<ICards[]>({
    key: "cards",
    default: []
});
