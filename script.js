const submitBtn = document.querySelector('.fa-search');
const searchInput = document.querySelector('.search-input');
const resultsList = document.querySelector('#results');

submitBtn.addEventListener('click', handleSearch);

async function handleSearch(e) {
    e.preventDefault();
    const searchValue = searchInput.value.trim();
    const recipes = await fetchRecipes(searchValue);
    displayRecipes(recipes);
}

async function fetchRecipes(searchValue) {
    const API_URL = `https://api.edamam.com/search`;
    const APP_ID = '7aa516a5';
    const APP_KEY = 'dc836a223fb788b11ae390504d9e97ce';
    const requestURL = `${API_URL}?q=${searchValue}&app_id=${APP_ID}&app_key=${APP_KEY}&from=0&to=10`;

    try {
        const response = await fetch(requestURL);
        const data = await response.json();
        return data.hits;
    } catch (error) {
        console.error('Error fetching recipes:', error);
        return [];
    }
}

function displayRecipes(recipes) {
    let html = '';
    recipes.forEach(recipe => {
        const { image, label, ingredientLines, url } = recipe.recipe;
        html += `
        <div>
            <img src="${image}" alt="${label}">
            <h3>${label}</h3>
            <ul>
                ${ingredientLines.map(ingredient => `<li>${ingredient}</li>`).join('')}
            </ul>
            <a href="${url}" target="_blank">View Recipe</a>
        </div>`;
    });

    resultsList.innerHTML = html;
}