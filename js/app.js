class CalorieTracker {
  #calories = 2000;
  #totalCalories = 0;
  #meals = [];
  #workout = [];
  constructor() {
    this.#displayCaloriesTotal();
    this.#displayCaloriesLimit();
    this.#displayCaloriesConsumed();
    this.#displayCaloriesBurned();
    this.#displayCaloriesRemaining();
    this.#displayCalorieProgress();
  }

  //   Private Methods
  #displayCaloriesTotal() {
    const totalCaloriesEl = document.getElementById("calories-total");
    totalCaloriesEl.innerText = this.#totalCalories;
  }
  #displayCaloriesLimit() {
    const calorieLimitEl = document.getElementById("calories-limit");
    calorieLimitEl.innerText = this.#calories;
  }
  #displayCaloriesConsumed() {
    const caloriesConsumed = document.getElementById("calories-consumed");
    const consumed = this.#meals.reduce(
      (total, meal) => total + meal.calories,
      0
    );
    caloriesConsumed.innerText = consumed;
  }
  #displayCaloriesBurned() {
    const caloriesBurned = document.getElementById("calories-burned");
    const burned = this.#workout.reduce(
      (total, workout) => total + workout.calories,
      0
    );
    caloriesBurned.innerText = burned;
  }
  #displayCaloriesRemaining() {
    const caloriesRemainingEl = document.getElementById("calories-remaining");
    const progressEl = document.getElementById("calorie-progress");
    const remaining = this.#calories - this.#totalCalories;
    caloriesRemainingEl.innerText = remaining;

    if (remaining <= 0) {
      caloriesRemainingEl.parentElement.parentElement.classList.remove(
        "bg-light"
      );
      caloriesRemainingEl.parentElement.parentElement.classList.add(
        "bg-danger"
      );
      progressEl.classList.remove("bg-success");
      progressEl.classList.add("bg-danger");
    } else {
      caloriesRemainingEl.parentElement.parentElement.classList.remove(
        "bg-danger"
      );
      caloriesRemainingEl.parentElement.parentElement.classList.add("bg-light");
      progressEl.classList.remove("bg-danger");
      progressEl.classList.add("bg-success");
    }
  }
  #displayCalorieProgress() {
    const progressEl = document.getElementById("calorie-progress");
    const percentage = (this.#totalCalories * 100) / this.#calories;
    const width = Math.min(percentage, 100);
    progressEl.style.width = `${width}%`;
  }
  #render() {
    this.#displayCaloriesTotal();
    this.#displayCaloriesConsumed();
    this.#displayCaloriesBurned();
    this.#displayCaloriesRemaining();
    this.#displayCalorieProgress();
  }

  //   Public Methods
  addMeal(meal) {
    this.#meals.push(meal);
    this.#totalCalories += meal.calories;
    this.#render();
  }

  addWorkout(workout) {
    this.#workout.push(workout);
    this.#totalCalories -= workout.calories;
    this.#render();
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

class App {
  #tracker;
  constructor() {
    this.#tracker = new CalorieTracker();
    document
      .getElementById("meal-form")
      .addEventListener("submit", this.#newItem.bind(this, "meal"));
    document
      .getElementById("workout-form")
      .addEventListener("submit", this.#newItem.bind(this, "workout"));
  }

  #newItem(type, e) {
    e.preventDefault();
    const name = document.getElementById(`${type}-name`);
    const calories = document.getElementById(`${type}-calories`);

    if (name.value === "" || calories.value === "") {
      alert("Please enter all the fields");
      return;
    }

    if (type === "meal") {
      const meal = new Meal(name.value, +calories.value);
      this.#tracker.addMeal(meal);
    } else {
      const workout = new Workout(name.value, +calories.value);
      this.#tracker.addWorkout(workout);
    }
    const collapseWorkout = document.getElementById(`collapse-${type}`);
    const bsCollapse = new bootstrap.Collapse(collapseWorkout, {
      toggle: true,
    });

    name.value = "";
    calories.value = "";
  }
}

const app = new App();
