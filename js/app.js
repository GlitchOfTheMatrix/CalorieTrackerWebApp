class CalorieTracker {
  #calories = Storage.getCalorieLimit();
  #totalCalories = Storage.getTotalCalories();
  #meals = Storage.getMeals();
  #workout = Storage.getWorkout();
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
  #displayNewMeal(meal) {
    const mealsEl = document.getElementById("meal-items");
    const mealEl = document.createElement("div");
    mealEl.classList.add("card", "my-2");
    mealEl.setAttribute("data-id", meal.id);
    mealEl.innerHTML = `<div class="card-body">
                <div class="d-flex align-items-center justify-content-between">
                  <h4 class="mx-1">${meal.name}</h4>
                  <div
                    class="fs-1 bg-primary text-white text-center rounded-2 px-2 px-sm-5"
                  >
                    ${meal.calories}
                  </div>
                  <button class="delete btn btn-danger btn-sm mx-2">
                    <i class="fa-solid fa-xmark"></i>
                  </button>
                </div>
              </div>`;
    mealsEl.appendChild(mealEl);
  }
  #displayNewWorkout(workout) {
    const workoutsEl = document.getElementById("workout-items");
    const workoutEl = document.createElement("div");
    workoutEl.classList.add("card", "my-2");
    workoutEl.setAttribute("data-id", workout.id);
    workoutEl.innerHTML = `<div class="card-body">
                <div class="d-flex align-items-center justify-content-between">
                  <h4 class="mx-1">${workout.name}</h4>
                  <div
                    class="fs-1 bg-secondary text-white text-center rounded-2 px-2 px-sm-5"
                  >
                    ${workout.calories}
                  </div>
                  <button class="delete btn btn-danger btn-sm mx-2">
                    <i class="fa-solid fa-xmark"></i>
                  </button>
                </div>
              </div>`;
    workoutsEl.appendChild(workoutEl);
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
    Storage.updateTotalCalories(this.#totalCalories);
    Storage.saveMeals(meal);
    this.#displayNewMeal(meal);
    this.#render();
  }

  addWorkout(workout) {
    this.#workout.push(workout);
    this.#totalCalories -= workout.calories;
    Storage.updateTotalCalories(this.#totalCalories);
    Storage.saveWorkout(workout);
    this.#displayNewWorkout(workout);
    this.#render();
  }
  removeMeal(id) {
    const index = this.#meals.findIndex((meal) => meal.id === id);
    if (index !== -1) {
      const meal = this.#meals[index];
      this.#totalCalories -= meal.calories;
      Storage.updateTotalCalories(this.#totalCalories);
      this.#meals.splice(index, 1);
      Storage.removeMeal(id);
      this.#render();
    }
  }
  removeWorkout(id) {
    const index = this.#workout.findIndex((workout) => workout.id === id);
    if (index !== -1) {
      const workout = this.#workout[index];
      this.#totalCalories += workout.calories;
      Storage.updateTotalCalories(this.#totalCalories);
      this.#workout.splice(index, 1);
      Storage.removeWorkout(id);
      this.#render();
    }
  }
  reset() {
    this.#totalCalories = 0;
    this.#meals = [];
    this.#workout = [];
    this.#render();
  }
  setLimit(calorieLimit) {
    this.#calories = calorieLimit;
    Storage.setCalorieLimit(calorieLimit);
    this.#displayCaloriesLimit();
    this.#render();
  }
  loadItems() {
    this.#meals.forEach((meal) => this.#displayNewMeal(meal));
    this.#workout.forEach((workout) => this.#displayNewWorkout(workout));
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

class Storage {
  static getCalorieLimit(defaultLimit = 2000) {
    let calorieLimit;
    if (localStorage.getItem("calorieLimit") === null) {
      calorieLimit = defaultLimit;
    } else {
      calorieLimit = +localStorage.getItem("calorieLimit");
    }
    return calorieLimit;
  }
  static setCalorieLimit(calorieLimit) {
    localStorage.setItem("calorieLimit", calorieLimit);
  }
  static getTotalCalories(defaultCalories = 0) {
    let totalCalories;
    if (localStorage.getItem("totalCalories") === null) {
      totalCalories = defaultCalories;
    } else {
      totalCalories = +localStorage.getItem("totalCalories");
    }
    return totalCalories;
  }
  static updateTotalCalories(calories) {
    localStorage.setItem("totalCalories", calories);
  }
  static getMeals() {
    let meals;
    if (localStorage.getItem("meals") === null) {
      meals = [];
    } else {
      meals = JSON.parse(localStorage.getItem("meals"));
    }
    return meals;
  }
  static saveMeals(meal) {
    const meals = Storage.getMeals();
    meals.push(meal);
    localStorage.setItem("meals", JSON.stringify(meals));
  }
  static removeMeal(id) {
    const meals = Storage.getMeals();
    meals.forEach((meal, index) => {
      if (meal.id === id) {
        meals.splice(index, 1);
      }
    });
    localStorage.setItem("meals", JSON.stringify(meals));
  }
  static getWorkout() {
    let workout;
    if (localStorage.getItem("workout") === null) {
      workout = [];
    } else {
      workout = JSON.parse(localStorage.getItem("workout"));
    }
    return workout;
  }
  static saveWorkout(workout) {
    const workouts = Storage.getWorkout();
    workouts.push(workout);
    localStorage.setItem("workout", JSON.stringify(workouts));
  }
  static removeWorkout(id) {
    const workouts = Storage.getWorkout();
    workouts.forEach((workout, index) => {
      if (workout.id === id) {
        workouts.splice(index, 1);
      }
    });
    localStorage.setItem("workout", JSON.stringify(workouts));
  }
}

class App {
  #tracker;
  constructor() {
    this.#tracker = new CalorieTracker();

    this.#loadEventListeners();

    this.#tracker.loadItems();
  }

  #loadEventListeners() {
    document
      .getElementById("meal-form")
      .addEventListener("submit", this.#newItem.bind(this, "meal"));
    document
      .getElementById("workout-form")
      .addEventListener("submit", this.#newItem.bind(this, "workout"));
    // Event Delegation
    document
      .getElementById("meal-items")
      .addEventListener("click", this.#removeItem.bind(this, "meal"));
    document
      .getElementById("workout-items")
      .addEventListener("click", this.#removeItem.bind(this, "workout"));
    document
      .getElementById("filter-meals")
      .addEventListener("keyup", this.#filterItem.bind(this, "meal"));
    document
      .getElementById("filter-workouts")
      .addEventListener("keyup", this.#filterItem.bind(this, "workout"));
    document
      .getElementById("reset")
      .addEventListener("click", this.#reset.bind(this));
    document
      .getElementById("limit-form")
      .addEventListener("click", this.#setLimit.bind(this));
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
  #removeItem(type, e) {
    e.preventDefault();
    if (
      e.target.classList.contains("delete") ||
      e.target.classList.contains("fa-xmark")
    ) {
      if (confirm("Are you sure?")) {
        const id = e.target.closest(".card").getAttribute("data-id");
        type === "meal"
          ? this.#tracker.removeMeal(id)
          : this.#tracker.removeWorkout(id);

        const item = e.target.closest(".card").remove();
      }
    }
  }
  #filterItem(type, e) {
    const text = e.target.value.toLowerCase();
    document.querySelectorAll(`#${type}-items .card`).forEach((item) => {
      const name = item.firstElementChild.firstElementChild.textContent;
      if (name.toLowerCase().indexOf(text) !== -1) {
        item.style.display = "block";
      } else {
        item.style.display = "none";
      }
    });
  }
  #reset() {
    this.#tracker.reset();
    document.getElementById("meal-items").innerHTML = "";
    document.getElementById("workout-items").innerHTML = "";
    document.getElementById("filter-meals").value = "";
    document.getElementById("filter-workouts").value = "";
  }
  #setLimit(e) {
    e.preventDefault();
    const limit = document.getElementById("limit");
    this.#tracker.setLimit(+limit.value);
    if (limit.value === "") {
      alert("Please add a limit");
      return;
    }
    limit.value = "";

    const modalEl = document.getElementById("limit-modal");
    const modal = bootstrap.Modal.getInstance(modalEl);
    modal.hide();
  }
}

const app = new App();
