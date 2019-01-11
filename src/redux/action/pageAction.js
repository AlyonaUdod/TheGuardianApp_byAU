export const plus = (num) => ({
        type: 'plus',
        data: num,
})

export const minus = (num) => ({
        type: 'minus',
        data: num,
})


export const currentNumber = (num) => ({
        type: 'current',
        data: num,
})

export const refreshPageNumber = () => ({
    type: 'refresh'
})