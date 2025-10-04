class CalorieTracker {
  #calories = 2000;
  #totalCalories = 0;
  #meals = [];
  #workout = [];
  constructor() {}

  addMeal(meal) {
    this.#meals.push(meal);
    this.#totalCalories += meal.calories;
  }

  addWorkout(workout) {
    this.#workout.push(workout);
    this.#totalCalories -= workout.calories;
  }

  show() {
    console.log(this.#calories);
    console.log(this.#totalCalories);
    console.log(this.#meals);
    console.log(this.#workout);
  }
}

class Meal {
  constructor(name, calories) {
    this.id = Math.random().toString(16).slice(2); // Generating random hexadecimal id.
    this.name = name;
    this.calories = calories;
  }
}

class Workout {
  constructor(name, calories) {
    this.id = Math.random().toString(16).slice(2); // Generating random hexadecimal id.
    this.name = name;
    this.calories = calories;
  }
}

const tracker = new CalorieTracker();

const breakfast = new Meal("Breakfast", 400);
tracker.addMeal(breakfast);

const run = new Workout("Morning Run", 300);
tracker.addWorkout(run);

tracker.show();
