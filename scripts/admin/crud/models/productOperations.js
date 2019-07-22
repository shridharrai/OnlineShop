const productOperations = {
    products : [],
    add(product) {
        this.products.push(product);
        console.log("product added ",this.products);
    },
    toggleMark(id) {
        var productObject = this.products.find(product=>product.id == id);
        productObject.markForDelete = !productObject.markForDelete;
    },
    countMark() {
        return this.products.filter(product=>product.markForDelete).length;
    },
    remove() {
        this.products = this.products.filter(product=>!product.markForDelete);
    },
    search(id) {
        return this.products.find(product=>product.id == id);
    },
    update() {

    }, 
    sort() {

    }
}