import axios from 'axios';

export function getFirstNews(num) {
    return (axios.get(`https://content.guardianapis.com/search?page=${num}&api-key=e925cc03-ba11-420b-b705-4b2997398056`))
}

export function getMoreAboutNew(url) {
    return (axios.get(`https://cors.io/?${url}?show-blocks=body&api-key=e925cc03-ba11-420b-b705-4b2997398056`))
}