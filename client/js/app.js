const search = document.getElementById("search");
const matchlist = document.getElementById("match-list");
const addBtn = document.getElementById("addBtn");
const summarySection = document.querySelector("#summary");
const caloriesSummary = document.querySelector("#caloriesvalue");
const proteinSummary = document.querySelector("#proteinvalue");
const fatSummary = document.querySelector("#fatvalue");
const carbohydratesSummary = document.querySelector("#carbohydratesvalue");
const ingredientsList = document.querySelector("tbody");
summarySection.style.visibility = "hidden";
let mealFoods = [];
let searchedFood = [];
const searchFood = async searchText => {
  matchlist.innerHTML = "";
  if (searchText.length !== 0) {
    const res = await fetch(`http://localhost:3000/${searchText}`);

    searchedFood = await res.json();
  } else {
    searchedFood = [];
  }
  showSearchedFood(searchedFood);
};
const showSearchedFood = foods => {
  const html = foods.map(item => {
    const el = document.createElement("option");
    el.value = item.Name;
    el.textContent = item.Name;
    // const el = `<option value="${item.id}" onClick="addMeal()">
    //   ${item.Name}
    //   </option>`;
    el.addEventListener("click", addMeal);
    return el;
  });

  html.forEach(element => {
    matchlist.appendChild(element);
  });
};

const addMeal = e => {
  const searchText = search.value;
  const choosen = searchedFood.filter(item => item.Name === searchText);
  mealFoods.push(...choosen);
  showFood();
  showSummary();
};
const showSummary = () => {
  if (mealFoods.length === 0) {
    summarySection.style.visibility = "hidden";
  } else {
    summarySection.style.visibility = "visible";
    let calories = 0;
    let protein = 0;
    let fat = 0;
    let carbohydrates = 0;
    for (let i = 0; i < mealFoods.length; i++) {
      calories += Number.parseInt(mealFoods[i].Calories);
      protein += Number.parseFloat(mealFoods[i].Protein);
      fat += Number.parseFloat(mealFoods[i].Fat);
      carbohydrates += Number.parseFloat(mealFoods[i].Carbohydrates);
    }

    console.log("Calories", calories);
    caloriesSummary.textContent = calories;
    proteinSummary.textContent = protein;
    fatSummary.textContent = fat;
    carbohydratesSummary.textContent = carbohydrates;
  }
};
const showFood = () => {
  const html = mealFoods.map(item => {
    const el = document.createElement("tr");
    const nameTd = document.createElement("td");
    nameTd.textContent = item.Name;
    const caloriesTd = document.createElement("td");
    caloriesTd.textContent = item.Calories;
    const proteinTd = document.createElement("td");
    proteinTd.textContent = item.Protein;
    const fatTd = document.createElement("td");
    fatTd.textContent = item.Fat;
    const carbohydratesTd = document.createElement("td");
    carbohydratesTd.textContent = item.Carbohydrates;
    const removeBtn = document.createElement("button");
    removeBtn.textContent = "Usuń";
    removeBtn.classList.add("btn-primary");
    removeBtn.addEventListener("click", () => removeFood(item.id));
    el.appendChild(nameTd);
    el.appendChild(caloriesTd);
    el.appendChild(proteinTd);
    el.appendChild(fatTd);
    el.appendChild(carbohydratesTd);
    el.appendChild(removeBtn);
    return el;
  });
  ingredientsList.innerHTML = "";

  html.forEach(element => {
    ingredientsList.append(element);
  });
};
const removeFood = id => {
  let newList = mealFoods.filter(item => item.id !== id);

  mealFoods = newList;
  showFood();
  showSummary();
};
search.addEventListener("input", () => searchFood(search.value));
addBtn.addEventListener("click", addMeal);
