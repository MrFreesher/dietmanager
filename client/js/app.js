const search = document.getElementById("search");
const matchlist = document.getElementById("match-list");
const addBtn = document.getElementById("addBtn");
const mealFoods = [];
let searchedFood = [];
const searchFood = async searchText => {
  matchlist.innerHTML = "";
  if (searchText.length !== 0) {
    const res = await fetch(`http://localhost:3000/${searchText}`);

    searchedFood = await res.json();
  } else {
    searchedFood = [];
  }
  outputHtml(searchedFood);
  console.log("Searched food", searchedFood);
};
const outputHtml = foods => {
  console.log("Foods", foods);
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
  console.log(html);
  html.forEach(element => {
    matchlist.appendChild(element);
  });
};

const addMeal = e => {
  const searchText = search.value;
  const choosen = searchedFood.filter(item => item.Name === searchText);
  mealFoods.push(...choosen);
  console.log(mealFoods);
  // const ing = searchedFood.filter(item => {
  //   return item.id == ingredient;
  // });
  // console.log("ing", ing);
  // mealFoods.push(ing[0]);
  // console.log("Mealfood", mealFoods);
};
search.addEventListener("input", () => searchFood(search.value));
addBtn.addEventListener("click", addMeal);
