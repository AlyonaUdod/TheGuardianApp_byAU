export default function news (state={}, action) {
    switch (action.type) {
        case 'DOWNLOADED':
            return {...action.data};
        case 'CLEAR_NEWS':
            return {}
        default: 
            return state;
    }
}