// class for products
class Product{
    constructor(title, category, image, price){
        this.title = title;
        this.image = image;
        this.category = category;
        this.price = price;
    }
}

// funcyion that print product in the document
function printProducts(products){
    let i = 0;
    products.map(product => {

        document.getElementById('row').innerHTML += `<div class="card m-1" style="width: 20rem; padding: 10px 20px;">
                    <img src="${product.image}" class="card-img-top" alt="Product ${i+1}">
                    <div class="card-body">
                        <h5 class="card-title">${product.title}</h5>
                        <p class="card-text">Category: ${product.category}</p>
                        <p class="card-text">Price: ${product.price}</p>
                        <button id="update${i}" onclick="update(${i})"><i class="fa fa-pencil"></i></button>
                        <button id="delete${i}" onclick="deleteProduct(${i})"><i class="fa fa-remove"></i></button>
                    </div>
                </div>`;
                // console.log(`image: ${product.image}, title: ${product.title}, price: ${product.price}, category: ${product.category}`);
                i++;
    });
}

// function that fitch data from a fake api
function getData(){
    fetch('https://fakestoreapi.com/products')
        .then(response => response.json())
        .then(json => {
            products = json.map(function(product){
                product = new Product (product.title , product.category  , product.description   , product.image    , product.price);
                return product;
            });
            // console.log(products);

            printProducts(products);
        })
        .catch(error => console.error('Error:', error));
}

// function that fitch data from a json server
function getData1(){
    fetch('http://localhost:3000/products')
        .then(response => response.json())
        .then(json => {
            products = json.map(function(product){
                product = new Product (product.title, product.category, product.image, product.price);
                return product;
            });
            // console.log(products);

            printProducts(products);
        })
        .catch(error => console.error('Error:', error));
}

// function that add new product to the json server
function addnew(){
    let newTitle = document.getElementById('title').value;
    let newCategory = document.getElementById('category').value;
    let newPrice = document.getElementById('price').value;
    let newImg = document.getElementById('img-url').value;

    fetch("http://localhost:3000/products", {
        method: "POST",
        body: JSON.stringify({
            title: newTitle,
            image: newImg,
            category: newCategory,
            price: newPrice
        }),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    })
    .then(response => response.json())
    .then(json => {
        console.log('POST Success:', json);
    })
    .catch(error => console.error('POST Error:', error));

}

// function to update data in the json server
function update(index){
    let updatedData = {};
    let title = prompt("Enter new title to update (leave it empty if you don't want to change it)");
    let category = prompt("Enter new category to update (leave it empty if you don't want to change it)");
    let image = prompt("Enter new image URL to update (leave it empty if you don't want to change it)");
    let price = prompt("Enter new price to update (leave it empty if you don't want to change it)");

    console.log(`title: ${title}, category: ${category}, image: ${image}, price: ${price}`);
    if (title !== null && title !== '') {
        updatedData.title = title;
    }
    if (image !== null && image !== '') {
        updatedData.image = image;
    }
    if (category !== null && category !== '') {
        updatedData.category = category;
    }
    if (price !== null && price !== '') {
        updatedData.price = price;
    }

    console.log(updatedData);

    fetch(`http://localhost:3000/products/${index}`, {
        method: 'PATCH', // Use 'PATCH' for partial updates
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData), // Stringify the updated data object
    })
        .then(response => response.json())
        .then(data => {
            console.log('Product updated:', data);
        })
        .catch(error => {
            console.error('Error:', error);
        });

}

// function to delete data from the json server
function deleteProduct(index){
    fetch(`http://localhost:3000/products/${index}`, {
    method: 'DELETE',
    })
    .then(response => {
        if (response.status === 204) {
        console.log('Post deleted successfully');
        } else {
        console.error('Error deleting post');
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

let products =[];
let product = [];

getData1();


