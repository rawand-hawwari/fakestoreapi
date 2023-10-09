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

let products =[];

fetch('https://fakestoreapi.com/products')
    .then(response => response.json())
    .then(json => {
        products.push(json.map(function(product){
            return new Product (product.title , product.category  , product.description   , product.image    , product.price);
        }));

        console.log(products);
    })
    .catch(error => console.error('Error:', error));

    