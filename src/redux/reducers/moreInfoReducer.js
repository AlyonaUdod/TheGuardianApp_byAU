export default function moreInfo (state={}, action) {
    switch (action.type) {
        case 'MORE':
            return {...action.data};
        case 'CLEAR':
            return {};
        default: 
            return state;
    }
}