// class for products
class Product{
    constructor(title, category, description, image, price){
        this.title = title;
        this.category = category;
        this.description = description;
        this.image = image;
        this.price = price;
    }
}

function getData(){
    fetch('https://fakestoreapi.com/products')
        .then(response => response.json())
        .then(json => {
            products = json.map(function(product){
                product = new Product (product.title , product.category  , product.description   , product.image    , product.price);
                return product;
            });
            console.log(products);

            products.map(product => {
                document.getElementById('row').innerHTML += `<div class="card m-2" style="width: 20rem; padding: 10px 20px;">
                            <img src="${product.image}" class="card-img-top" alt="Student's Avatar">
                            <div class="card-body">
                                <h5 class="card-title">${product.title}</h5>
                                <p class="card-text">Category: ${product.category}</p>
                                <p class="card-text">Price: ${product.price}</p>
                            </div>
                        </div>`;
            })
        })
        .catch(error => console.error('Error:', error));
}

let products =[];
let product = [];

getData();
