let s = document.getElementById('main');

function fetchData() {
    return fetch("https://cdn.shopify.com/s/files/1/0564/3685/0790/files/multiProduct.json")
        .then(response => response.json());
}

function renderProducts(products) {
    s.innerHTML = ""; 

    products.forEach(product => {
        let str = `
            <div id="child">
                <div id="image">
                    <img class="cardImage" src="${product.image}" alt="">
                    <p>${product.title}</p>
                </div>
                <div id="child1">
                    <p>Price: ${product.price}-${product.compare_at_price}</p>
                    <p>${product.vendor}</p>
                    <p>${product.badge_text}</p>
                    <button class="cart">Go to cart</button>
                </div>
            </div>
        `;
        s.innerHTML += str;
    });
}

function displayAllProducts() {
    fetchData()
        .then(cata => {
            let allProducts = cata.categories.flatMap(cat => cat.category_products);
            renderProducts(allProducts);
        });
}

function displayProductsByCategory(categoryIndex) {
    fetchData()
        .then(cata => {
            let products = cata.categories[categoryIndex].category_products;
            renderProducts(products);
        });
}

function filterProducts(searchQuery) {
    fetchData()
        .then(cata => {
            let allProducts = cata.categories.flatMap(cat => cat.category_products);

            let filteredProducts = allProducts.filter(product => {
                let productName = product.title.toLowerCase();
                let brandName = product.vendor.toLowerCase();
                let query = searchQuery.toLowerCase();
                return productName.includes(query) || brandName.includes(query);
            });

            renderProducts(filteredProducts);
        });
}

document.getElementById('searchButton').addEventListener('click', function() {
    let searchQuery = document.getElementById('searchInput').value.trim();
    if (searchQuery === "") {
        displayAllProducts();
    } else {
        filterProducts(searchQuery);
    }
});

let btn = document.getElementById('btn');
btn.addEventListener('click', function(e) {
    let categoryIndex;
    switch (e.target.innerHTML) {
        case 'Men':
            categoryIndex = 0;
            break;
        case 'Women':
            categoryIndex = 1;
            break;
        case 'Kids':
            categoryIndex = 2;
            break;
        default:
            categoryIndex = undefined;
    }
    if (categoryIndex !== undefined) {
        displayProductsByCategory(categoryIndex);
    }
});
displayAllProducts();
