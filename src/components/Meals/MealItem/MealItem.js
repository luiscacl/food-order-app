
import classes from './MealItem.module.css';
import MealItemForm from './MealItemForm';
import MealContext from '../../../context/AppContext';
import { useContext, useState } from 'react';

function MealItem(props){
    const [inputValue, setInputValue] = useState('1');
    const price = `$${props.price.toFixed(2)}`;

    const ctx = useContext(MealContext);
    
    const addMealItem = (event) => {
        event.preventDefault();
        ctx.setItemsAdded(price, props, inputValue);
    }

    return (
        <li className={classes.meal}>
            <div>
                <h3>{props.name}</h3>
                <div className={classes.description}>{props.description}</div>
                <div className={classes.price}>{price}</div>
            </div>
            <div>
                <MealItemForm id={props.id} onAddMealItem={addMealItem} onGetInputVal={setInputValue}/>
            </div>
        </li>
    );
}

export default MealItem;