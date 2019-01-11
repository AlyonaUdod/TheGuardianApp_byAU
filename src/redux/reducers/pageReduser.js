export default function page (state = 1, action) {
    switch (action.type) {
        case 'plus' : 
            return state === action.data ? state : state + 1;
        case 'minus' :
            return state>1 ? state-1 : 1;
        case 'current' :
            return action.data;
        case 'refresh' :
            return 1
        default:
            return state;  
    }
}