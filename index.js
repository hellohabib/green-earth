// =============================
//          Load Categories
// =============================
const loadCategories = () => {
    fetch("https://openapi.programming-hero.com/api/categories")
        .then(r => r.json())
        .then(d => {
            displayCategories(d.categories);
        });
};

const loadCategoryWisePlant = (id) => {
    const url = `https://openapi.programming-hero.com/api/category/${id}`
    fetch(url)
        .then(r => r.json())
        .then(d => displayPlants(d.plants))
};

const activateCatagory = (id)=>{        
    const liToRemoveActivate = document.querySelectorAll(".category-comm-class-name");    
    liToRemoveActivate.forEach((element)=>{
        element.classList.remove("cagetory-selected");
    });
    const idHere=`category-id-${id}`;
    const liToActivate=document.getElementById(idHere);
    liToActivate.classList.add("cagetory-selected");
};

const addCartItem = (pName, pPrice) =>{
    //
    const cartContainer = document.getElementById("cart-container");
    //
    const cartItem =document.createElement("div");
    cartItem.innerHTML=`
    
    <div id="cart-item" class="flex justify-between items-center bg-[#8abf9e] w-full p-[5px] rounded-2xl mt-[5px]">
                        <div class="">
                            <p class="font-bold pl-[15px]">${pName}</p>
                            <p class="pl-[15px]">${pPrice}</p>
                        </div>
                        <div class="">
                            <i class="fa-solid fa-xmark text-red-600"></i>
                        </div>
                    </div>
    
    `;
    cartContainer.appendChild(cartItem);
    // add sum in total
    const cartTotal = document.getElementById("cart-total");
    const currBalance = parseInt(cartTotal.innerText);
    const newBalance = currBalance+pPrice;
    cartTotal.innerText=newBalance;
    

    

};

const loadPlantDetail = (plantId) => {
    const url = `https://openapi.programming-hero.com/api/plant/${plantId}`;
    fetch(url).then((r) => r.json()).then((d) => {
        displayPlantDetail(d.plants);
    });
};

const displayPlantDetail = (plant) => {
    
    const plantDetailModal = document.getElementById("plant-detail-modal");
    plantDetailModal.innerHTML = `
    
        <h2 class="text-xl font-semibold">${plant.name}</h2>
        <img src="${plant.image}" alt="">
        <p><span class="font-bold">Category:</span><span>${plant.category}</span></p>
        <p><span class="font-bold">Price: </span><span><i class="fa-solid fa-bangladeshi-taka-sign"></i>${plant.price}</span></p>
        <p><span class="font-bold">Description: </span><span>${plant.description}</span></p>
    
    
    `;
    document.getElementById("my_modal_5").showModal();

};

const displayCategories = (categories) => {
    const categoryContainer = document.getElementById("category-container");
    categoryContainer.innerHTML = "";

    categories.forEach(element => {
        const liText = element.category_name;
        const liId = element.id;
        const categoryLi = document.createElement("li");
        categoryLi.textContent = liText;
        categoryLi.className = "category-comm-class-name cagetory-normal";
        // categoryLi.className = "cat-comm-class-name text-[#1f2937] font-semibold text-center hover:bg-[#15803d] hover:text-white p-2 rounded-[5px] mr-[10px]";
        //cataId="category-id-" + liId;
        cataId=`category-id-${element.id}`;
        categoryLi.id = cataId;
        categoryLi.addEventListener("click", () => {
            loadCategoryWisePlant(liId);
            activateCatagory(liId);
        })


        categoryContainer.appendChild(categoryLi);
    });
};
loadCategories();

// =============================
//          Load Plants
// =============================
const loadPlants = () => {
    fetch("https://openapi.programming-hero.com/api/plants")
        .then(r => r.json())
        .then(d => displayPlants(d.plants));
}
//loadPlants();
const displayPlants = (plants) => {
    const plantsContainer = document.getElementById("plant-caontainer");
    plantsContainer.innerHTML = "";


    plants.forEach(element => {
        // create element
        const plantDiv = document.createElement("div");


        plantDiv.innerHTML = `
        <!-- card-1-start -->
                <div class="bg-white p-3  rounded-2xl">

                    <div onclick="loadPlantDetail(${element.id})">
                        <div ><!--card-image-->
                            <img src=${element.image} alt="" class="">

                        </div>
                        <h3 class="font-semibold text-[#1f2937]"><!--card-heading -->
                            ${element.name}
                        </h3>
                        <p class="text-[#1f2937] text-[12px]"><!--card-text -->
                        ${element.description}
                        </p>
                        <div class="flex justify-between items-center mt-2"><!--card-category-and-price -->
                            <div class="bg-[#dcfce7] rounded-2xl p-2"><!--card-category-->
                                <p class="text-[#15803d]">${element.category}</p>
                            </div>
                            <div><!--card-price-->
                                <p class="font-semibold text-[#1f2937]">
                                    <span> <i class="fa-solid fa-bangladeshi-taka-sign"></i></span>
                                    ${element.price}
                                </p>

                            </div>

                        </div>
                    </div>
                    <div><!--card-button-->
                        <button id="plant-id-${element.id}" 
                        onclick="addCartItem('${element.name}',${element.price})"
                        class="bg-[#15803d] text-white p-2 mt-2.5 rounded-2xl w-full">Add to Cart</button>
                    </div>
                </div>
                <!--card-1-end-->        
        `;

        plantsContainer.appendChild(plantDiv);
    });

};


loadPlants();