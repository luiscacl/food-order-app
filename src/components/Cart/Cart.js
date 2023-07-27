
import classes from './Cart.module.css';
import Modal from '../UI/Modal';
import AppContext from '../../context/AppContext';
import CartItem from './CartItem';
import CheckOut from './CheckOut';
import useMealRequest from '../Hooks/use-request';
import { useContext, useState, useRef, Fragment } from 'react';

function Cart(props){
    const [isOrdered, setIsOrdered] = useState(false);
    // const [didSubmit, setDidSubmit] = useState(false);
    const ctx = useContext(AppContext);

    const {
        httpRequest,
        isLoading: isSubmitting,
        didSubmit

    } = useMealRequest();

    const CartOrderRequest = () => {
        console.log(ctx.itemsAdded);
        setIsOrdered(true);
    }

    const increaseItemAmount = (itemId) => {
        ctx.increaseOrDecreaseItems(itemId, 'INCREASE');
        console.log(itemId);
    }

    const decreaseItemAmount = (itemId) => {
        ctx.increaseOrDecreaseItems(itemId, 'DECREASE');
    }

    const submitOrderHandler = (userData) => {
        httpRequest('orders', {
            method: 'POST',
            body: {
                user: userData,
                orderedItems: ctx.itemsAdded
            }
        });
        ctx.resetCart();
    }

    const cartItems = (
        <ul className={classes['cart-items']}>
            {ctx.itemsAdded.map((item) => (
                <CartItem 
                    id={item.id} 
                    key={item.id}
                    name={item.name} 
                    price={item.price} 
                    amount={item.amount}
                    onDecreaseItemAmount={decreaseItemAmount}
                    onIncreaseItemAmount={increaseItemAmount}
                />
            ))}
        </ul>
    )

    const buttonItems = (
        <div className={classes.actions}>
            <button className={classes['button--alt']} onClick={props.onShowModalHandler}>Close</button>
            <button className={classes.button} onClick={CartOrderRequest}>Order</button>
        </div>
    )

    const cartModalContent = (
        <Fragment>
            {cartItems}
            <div className={classes.total}>
                <span>Total Amount</span>
                <span>{ctx.totalAmount}</span>
            </div>
            {isOrdered ? <CheckOut onConfirm={submitOrderHandler} onShowModalHandler={props.onShowModalHandler}/> : buttonItems}
        </Fragment>
    )

    const isSubmittingModalContent = <p>Sending order data...</p>

    const didSubmitModalContent = (
        <Fragment>
            <p>Successfully sent the order</p>
            <div className={classes.actions}>
                <button className={classes['button--alt']} onClick={props.onShowModalHandler}>Close</button>
            </div>
        </Fragment>
    )

    let modalToRender = cartModalContent;

    if(isSubmitting) modalToRender = isSubmittingModalContent;
    if(didSubmit) modalToRender = didSubmitModalContent;

    return (
        <Modal onShowModalHandler={props.onShowModalHandler}>
            {modalToRender}
        </Modal>
    );
}

export default Cart;