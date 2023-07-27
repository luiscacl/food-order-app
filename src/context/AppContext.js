
import { createContext } from "react";
import { useState, useReducer } from "react";

const MealContext = createContext({
    itemsAdded: [],
    setItemsAdded: (price, mealProps) => {},
    getTotalAmount: () => {},
    increaseOrDecreaseItems: (id, action) => {},
    resetCart: () => {},
    totalAmount: '$0.0'
});

// const reducer = (state, action) => {
//     if(action.type === ACTIONS.INCREMENT){
//         return { count: state.count + 1 }

//     } else if(action.type === ACTIONS.DECREMENT){
//         return { count: state.count - 1 }
//     }
//     return state;
// }

// const ACTIONS = {
//     INCREMENT: 'increment',
//     DECREMENT: 'decrement'
// }

export function AppContextProvider(props){
    const [itemsAddedToCart, setItemsAddedToCart] = useState([]);
    const [totalAmount, setTotalAmount] = useState('$0.0');
    // const [stateCount, dispatchCount] = useReducer(reducer, {amount: 0});
    
    const setItemsAdded = (price, mealProps, inputValue) => {
        let confirmAddNewItem = true;
        const checkAddedItems = itemsAddedToCart.map((item) => {
            if(item.index === mealProps.index){
                item.amount = +item.amount + +inputValue;
                confirmAddNewItem = false;
            }
            return item;
        });

        if(!confirmAddNewItem){
            setItemsAddedToCart(checkAddedItems);
            return;
        }

        setItemsAddedToCart((lastVal) => {
            const createId = Math.random();
            return [{
                key: createId,
                id: createId,
                description: mealProps.description,
                name: mealProps.name,
                price: price,
                priceNumber: mealProps.price,
                amount: inputValue,
                index: mealProps.index
            }, ...lastVal];
        });
        console.log(itemsAddedToCart)
        getTotalAmount();
    }

    const increaseOrDecreaseItems = (id, action) => {
        let confirmDeleteItem = false;
        const newItems = itemsAddedToCart.map((item) => {
            if(item.id === id){
                if(action === 'INCREASE'){
                    item.amount = parseInt(item.amount) + 1;
                } else if(action === 'DECREASE'){
                    item.amount = parseInt(item.amount) - 1;
                }
            } 
            if(item.amount === 0) confirmDeleteItem = true;
            return item;
        });

        getTotalAmount();
        if(confirmDeleteItem) deleteItem(id);
        else setItemsAddedToCart(newItems);
    }
    
    const deleteItem = (id) => {
        const newItems = [];
        for (let i = 0; i < itemsAddedToCart.length; i++) {
            const item = itemsAddedToCart[i];
            if(item.id !== id) newItems.push(item);
        }
        console.log(newItems)
        setItemsAddedToCart(newItems);
    }

    const getTotalAmount = () => {
        let result = 0;
        for (let i = 0; i < itemsAddedToCart.length; i++) {
            const item = itemsAddedToCart[i];
            result += item.priceNumber * item.amount;
        }
        const price = `$${result.toFixed(2)}`;
        setTotalAmount(price);
    }

    const resetCart = () => {
        setItemsAddedToCart([]);
    }

    return (
        <MealContext.Provider value={{
            itemsAdded: itemsAddedToCart,
            setItemsAdded: setItemsAdded,
            getTotalAmount: getTotalAmount,
            increaseOrDecreaseItems: increaseOrDecreaseItems,
            resetCart,
            totalAmount: totalAmount
        }}>
            {props.children}
        </MealContext.Provider>
    )
}

export default MealContext;