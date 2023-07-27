
import { useState } from "react";

function useInput(validateCondition){
    const [enteredValue, setEnteredValue] = useState('');
    const [isTouched, setIsTouched] = useState(false);

    const valueIsValid = validateCondition(enteredValue);
    const hasError = isTouched && !valueIsValid;

    const onChangeHandler = (event) => {
        setIsTouched(true);
        setEnteredValue(event.target.value);
    }

    const onBlurHanlder = () => {
        setIsTouched(true);
    }

    const resetValue = () => {
        setEnteredValue('');
        setIsTouched(false);
    }

    return {
        valueIsValid,
        enteredValue,
        hasError,
        onChangeHandler,
        onBlurHanlder,
        resetValue
    }
}

export default useInput;