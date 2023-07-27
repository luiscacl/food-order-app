
import classes from './AvailableMeals.module.css';
import Card from '../UI/Card';
import MealItem from './MealItem/MealItem';
import useMealRequest from '../Hooks/use-request';
import { useEffect, useState } from 'react';

const DUMMY_MEALS = [
  {
    id: 'm1',
    name: 'Sushi',
    description: 'Finest fish and veggies',
    price: 22.99,
  },
  {
    id: 'm2',
    name: 'Schnitzel',
    description: 'A german specialty!',
    price: 16.5,
  },
  {
    id: 'm3',
    name: 'Barbecue Burger',
    description: 'American, raw, meaty',
    price: 12.99,
  },
  {
    id: 'm4',
    name: 'Green Bowl',
    description: 'Healthy...and green...',
    price: 18.99,
  },
];


function AvailableMeals(props){
  
  const {
    httpRequest,
    getData: dummy_meals,
    isLoading,
    httpError

  } = useMealRequest();

  console.log(dummy_meals)
    
  // useEffect(() => {
  //   // httpRequest('dummy_meals', {
  //   //   method: 'POST',
  //   //   body: DUMMY_MEALS
  //   // });

  //   httpRequest('dummy_meals', {
  //     method: 'GET'
  //   });
  // }, [httpRequest]);

  console.log('available meals ejecutado');

  if(isLoading){
    return (
      <section className={classes.meals}>
        <h1 className={classes.loading}>Is Loading...</h1>
      </section>
    )
  }

  if(httpError){
    return (
      <section className={classes.meals}>
        <h1 className={classes.error}>Something Went Wrong...</h1>
        <p className={classes.loading}>{httpError}</p>
      </section>
    )
  }


  const mealList = DUMMY_MEALS.map((meal, index) => (
      <MealItem
      id={meal.id}
      key={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
      index={index}/>
  ));

  return (
      <section className={classes.meals}>
          <Card>
              <ul>
                  {mealList}
              </ul>
          </Card>
      </section>
  );
}

export default AvailableMeals;