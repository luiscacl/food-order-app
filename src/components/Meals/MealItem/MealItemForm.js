
import classes from './MealItemForm.module.css';
import Input from '../../UI/Input';

function MealItemForm(props){
    return (
        <form className={classes.form}>
            <Input
                label='Amount'
                onGetInputVal={props.onGetInputVal}
                input={{
                    id: 'amount_' + props.id,
                    type: 'number',
                    min: '1',
                    max: '5',
                    step: '1',
                    defaultValue: '1'
                }}
            />
            <button onClick={props.onAddMealItem}>+ Add</button>
        </form>
    );
}

export default MealItemForm;