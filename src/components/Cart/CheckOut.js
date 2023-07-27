
import classes from './CheckOut.module.css';
import useInput from '../Hooks/use-input';

function CheckOut(props){
    const {
        valueIsValid: valueIsValidName,
        enteredValue: enteredName,
        hasError: hasErrorName,
        onChangeHandler: onChangeHandlerName,
        onBlurHanlder: onBlurHanlderName,
        resetValue: resetName

    } = useInput(value => value.trim() !== '');

    const {
        valueIsValid: valueIsValidStreet,
        enteredValue: enteredStreet,
        hasError: hasErrorStreet,
        onChangeHandler: onChangeHandlerStreet,
        onBlurHanlder: onBlurHanlderStreet,
        resetValue: resetStreet

    } = useInput(value => value.trim() !== '');

    const {
        valueIsValid: valueIsValidPostalCode,
        enteredValue: enteredPostalCode,
        hasError: hasErrorPostalCode,
        onChangeHandler: onChangeHandlerPostalCode,
        onBlurHanlder: onBlurHanlderPostalCode,
        resetValue: resetPostalCode

    } = useInput(value => value.trim() !== '');

    const {
        valueIsValid: valueIsValidCity,
        enteredValue: enteredCity,
        hasError: hasErrorCity,
        onChangeHandler: onChangeHandlerCity,
        onBlurHanlder: onBlurHanlderCity,
        resetValue: resetCity

    } = useInput(value => value.trim() !== '');

    const validForm = valueIsValidName && valueIsValidStreet && valueIsValidPostalCode && valueIsValidCity;

    const confirmHandler = (event) => {
        event.preventDefault();

        if(!validForm){
            console.log('ALL IS INVALID');
            return;
        }

        props.onConfirm({
            name: enteredName,
            street: enteredStreet,
            city: enteredCity,
            postalCode: enteredPostalCode
        })

        resetName();
        resetStreet();
        resetPostalCode();
        resetCity();
    }

    return (
        <form className={classes.form} onSubmit={confirmHandler}>
            <div className={classes.control}>
                <label htmlFor='name'>Your Name</label>
                <input onBlur={onBlurHanlderName} onChange={onChangeHandlerName} value={enteredName} type='text' id='name'></input>
                {hasErrorName && <p>It must not be empty</p>}
            </div>
            <div className={classes.control}>
                <label htmlFor='street'>Street</label>
                <input onBlur={onBlurHanlderStreet} onChange={onChangeHandlerStreet} value={enteredStreet} type='text' id='srteet'></input>
                {hasErrorStreet && <p>It must not be empty</p>}
            </div>
            <div className={classes.control}>
                <label htmlFor='postal'>Postal Code</label>
                <input onBlur={onBlurHanlderPostalCode} onChange={onChangeHandlerPostalCode} value={enteredPostalCode} type='text' id='postal'></input>
                {hasErrorPostalCode && <p>It must not be empty</p>}
            </div>
            <div className={classes.control}>
                <label htmlFor='city'>City</label>
                <input onBlur={onBlurHanlderCity} onChange={onChangeHandlerCity} value={enteredCity} type='text' id='city'></input>
                {hasErrorCity && <p>It must not be empty</p>}
            </div>
            <div className={classes.actions}>
                <button onClick={props.onShowModalHandler} type='button'>Cancel</button>
                <button disabled={!validForm}>Confirm</button>
            </div>
        </form>
    )
}

export default CheckOut;