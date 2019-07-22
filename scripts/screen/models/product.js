class Product {
    constructor(id, url, name, price, desc, color,email) {
        this.id = id;
        this.url = url;
        this.name = name;
        this.price = price;
        this.desc = desc;       
        this.color = color;
        this.addToCart = false;
        this.email = null;
    }
}