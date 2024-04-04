import { COLOR_COLLECTION, getColor } from "./GetColors"

test ('getColors function should return the right value', () => {
    const testValue = getColor('black');
    expect (testValue).toEqual(COLOR_COLLECTION ['black']) 
})