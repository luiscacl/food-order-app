import classes from './CartItem.module.css';

const CartItem = (props) => {
  // const price = `$${props.price.toFixed(2)}`;

  return (
    <li key={props.id} id={props.id} className={classes['cart-item']}>
      <div>
        <h2>{props.name}</h2>
        <div className={classes.summary}>
          <span className={classes.price}>{props.price}</span>
          <span className={classes.amount}>x {props.amount}</span>
        </div>
      </div>
      <div className={classes.actions}>
        <button onClick={props.onDecreaseItemAmount.bind(null, props.id)}>−</button>
        <button onClick={props.onIncreaseItemAmount.bind(null, props.id)}>+</button>
      </div>
    </li>
  );
};

export default CartItem;
