
const loadCategories=()=>{
    fetch("https://openapi.programming-hero.com/api/categories")
    .then(r => r.json())
    .then(d => {
        displayCategories(d.categories);
    });
};

const displayCategories = (categories) => {
    categories.forEach(element => {
        console.log(element.category_name);
    });
};

loadCategories();