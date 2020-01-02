const search = document.getElementById("search");
const matchlist = document.getElementById("match-list");
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
  const html = foods
    .map(
      item =>
        `<div class="card card-body mb-1">
        <h4>${item.Name}</h4>
        <small>Calories: ${item.Calories}</small>
        <small>Protein: ${item.Protein}</small>
        <small>Fat: ${item.Fat}</small>
        <small>Carbohydrates: ${item.Carbohydrates}</small>
        <button onClick="addToMeal('${item.Id}')">Dodaj</button>
        </div>`
    )
    .join("");
  console.log(html);
  matchlist.innerHTML = html;
};

function isEqualId(item, id) {
  return item.Id === id;
}
const addToMeal = ingredient => {
  console.log("Searcged foor", searchedFood);
  console.log("Ingredient", ingredient);
  console.log(searchedFood[0].id == ingredient);
  const ing = searchedFood.filter(item => {
    return item.id == ingredient;
  });
  console.log("ing", ing);
  mealFoods.push(ing[0]);
  console.log("Mealfood", mealFoods);
};
search.addEventListener("input", () => searchFood(search.value));
