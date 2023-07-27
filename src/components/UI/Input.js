
import classes from './Input.module.css';
import { useRef } from 'react';

function Input(props){
    const inputRef = useRef();
    const getInputRef = () => {
        props.onGetInputVal(inputRef.current.value);
        // console.log(inputRef)
    }
    return(
        <div className={classes.input}>
            <label htmlFor={props.input.id}>{props.label}</label>
            <input ref={inputRef} onChange={getInputRef} {...props.input}></input>
        </div>
    );
}

export default Input;