
import { Fragment, useState } from 'react';
import classes from './Header.module.css';
import mealsImage from '../Images/meals.jpg';
import HeaderCartButton from './HeaderCartButton';
import Cart from '../Cart/Cart';

function Header(props){
    const [showModal, setShowModal] = useState(false);

    const showModalHandler = () => {
        setShowModal((lastVal) => {
            return !lastVal;
        });
    }

    return (
        <Fragment>
            {showModal && <Cart onShowModalHandler={showModalHandler}/>}
            <header className={classes.header}>
                <h1>React Meals</h1>
                <HeaderCartButton onShowModalHandler={showModalHandler}/>
            </header>
            <div className={classes['main-image']}>
                <img src={mealsImage} alt='Meals'></img>
            </div>
        </Fragment>
    );
}

export default Header;