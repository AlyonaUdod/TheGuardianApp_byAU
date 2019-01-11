import { getFirstNews, getMoreAboutNew } from '../api/api'

///////////////////////////////////////////////////////////////////////////////

// First Fetch

export const fetchFirstNews = (num) => dispatch => {
    return getFirstNews(num)
    // .then(data => console.log(data))
    .then(data => dispatch(addFirstNewsToStorage(data.data.response)))
    .catch(() => dispatch(addErrorToStorage()))
    // .catch(() => this.setState({ error: 'Sorry, we coudn\'t find news for you. Try later, please.'}))
}
export function addFirstNewsToStorage(response) {
    return {
        type: 'DOWNLOADED',
        data: response,
    }
}
export function addErrorToStorage() {
    return {
        type: 'ERROR',
    }
}
export function clearStorage() {
    return {
        type: 'CLEAR_NEWS',
    }
}
export function addObjToStorage(response) {
    return {
        type: 'DOWN',
        data: response,
    }
}





/////////////////////////////////////////////////////////////////////////////////

// Get Info About New

export const fetchMoreAboutNew = (url) => dispatch => {
    return getMoreAboutNew(url)
    // .then(res => res.json())
    // .then(data => console.log(data))
    .then(data => dispatch(addMoreInfoToStorage(data.data.response.content.blocks.body[0])))
    .catch(() => dispatch(addMoreInfoToStorage('Sorry, problem with connection, try later.')))
}
export function addMoreInfoToStorage(data) {
    return {
        type: 'MORE',
        data,
    }
}
export function clearMoreInfo() {
    return {
        type: 'CLEAR',
    }
}