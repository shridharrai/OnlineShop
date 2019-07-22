const productOperations = {
    products : [],
    add(product) {
        this.products.push(product);
        console.log("product added ",this.products);
    },
    toggleMark(id) {
        var productObject = this.products.find(product=>product.id == id);
        productObject.addToCart = true;
        productObject.email = loadUser();
        console.log("Add to cart ",productObject);
        savetoServer(productObject);
    },
    countMark() {
        return this.products.filter(product=>product.addToCart).length;
    },
    remove() {
       
    },
    search(id) {
        
    },
    update() {

    }, 
    sort() {

    }
    
}