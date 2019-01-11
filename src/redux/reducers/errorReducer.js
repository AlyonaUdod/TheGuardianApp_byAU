export default function error (state='', action) {
    switch (action.type) {
        case 'ERROR':
            return 'Sorry, we coudn\'t find news for you. Try later, please.';
        case 'CLEAR_NEWS':
            return ''
        default: 
            return state;
    }
}