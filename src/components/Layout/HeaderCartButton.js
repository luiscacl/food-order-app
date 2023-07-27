
import CartIcon from '../Cart/CartIcon';
import classes from './HeaderCartButton.module.css';
import MealContext from '../../context/AppContext';
import { useContext } from 'react';

function HeaderCartButton(props){
    const ctx = useContext(MealContext);

    const updatePricesAmount = () => {
        ctx.getTotalAmount();
    }

    const itemsCountAdded = ctx.itemsAdded.reduce((prevValue, currVal) => {
        return prevValue + parseInt(currVal.amount);
    }, 0);

    return <button className={classes.button} onClick={() => {
        props.onShowModalHandler();
        updatePricesAmount();
    }}>
        <span className={classes.icon}>
            <CartIcon/>
        </span>
        <span>You Cart</span>
        <span className={classes.badge}>{itemsCountAdded}</span>
    </button>
}

export default HeaderCartButton;