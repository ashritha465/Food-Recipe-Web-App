//STEP 1
function foo() {
    document.querySelector(".searchbutton");
    var inputValue = document.querySelector(".js-userinput").value;
    //console.log(inputValue)
    //var userInput = getUserInput();
    foodapp(inputValue);
}
//search meal by name : this API has all the details like, name 
//ingredients, image, youtube video.
var apiUrl = "https://www.themealdb.com/api/json/v1/1/search.php?s=";
//STEP 2
async function foodapp(inputValue) {
    try {
        let php = await fetch(apiUrl + inputValue);
        let searchedUrl = php.url;
        //console.log(searchedUrl)
        let phpSearched = await fetch(searchedUrl);
        let itemarray = await phpSearched.json();
        //console.log(itemarray);
        //console.log(itemarray.meals[0])
        if (itemarray.meals === null) {
            alert('Sorry we do not have that recipe in our database,please search any other.Example: paneer,curry')
        } else {
            let inst = itemarray.meals[0].strInstructions;
           // console.log(inst);
           //STEP 3
            createMeal(itemarray.meals[0]);
           // STEP 5
            //nameofmeal
            let nameofmeal = itemarray.meals[0].strMeal;
            //console.log(nameofmeal);
            //image of meal
            let mealimage = itemarray.meals[0].strMealThumb;
            //console.log(mealimage);
            //link of youtube video
            let youtubevideo = itemarray.meals[0].strYoutube;
            //console.log(youtubevideo);
            //adding to div
            document.getElementById('instructionDiv').innerHTML = inst;
            //adding to div
            document.getElementById('nameofMeal').innerHTML = `<strong>${nameofmeal}</strong>`;
            //adding to div
            document.getElementById('imge').innerHTML = `<img src=${mealimage} alt="image" width="200" height="200" style="border: solid 2px orange"/>`

            // adding to div
            document.getElementById('video').innerHTML = `<iframe width="200" height="200" style="border: solid 2px orange"
        src="https://www.youtube.com/embed/${youtubevideo.slice(-11)}">
        </iframe>`

        }

    } catch (error) {
         console.log(error);
    }
}
//STEP 4
createMeal = (meal) => {
    const arrayIngredients = [];

    // Get all ingredients from the object. Up to 20
    //console.log(meal[`strIngredient${1}`])
    for (let i = 1; i <= 20; i++) {
        if (meal[`strIngredient${i}`]) {
            arrayIngredients.push(`${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`)
        } else {
            // Stop if no more ingredients
            break;
        }
    }
    //console.log(arrayIngredients)
    var element = document.getElementById('ingredientDiv');
    //console.log(element)
    element.innerHTML = `<ul>
    ${arrayIngredients.map(ingredient => `<li>${ingredient}</li>`).join('')}
     </ul>`
}