class ProductsList {
    constructor(container = '.products') {
        this.container = container;
        this.data = [];
        this.allProducts = [];
        this.init();
    }

    init() {
        this._fetchProducts();
        this._render();
        this.summary();
    }

    _fetchProducts() {
        this.data = [
            {id: 1, title: 'Notebook', price: 2000},
            {id: 2, title: 'Mouse', price: 30},
            {id: 3, title: 'Keyboard', price: 55},
            {id: 4, title: 'Gamepad', price: 65},
        ];
    }

    _render() {
        const block = document.querySelector(this.container);
        for (let item of this.data) {
            const product = new ProductItem(item);
            this.allProducts.push(product);
            block.insertAdjacentHTML('beforeend', product.render());
        }
    }

    summary() {//метод для подсчёта стоимости товаров
        let sum = 0;
        for (let item of this.allProducts){
            sum += item.price;
        }
        console.log(sum);//вывод суммы в консоль
    }
}

class ProductItem {
    constructor(product, img = `https://placehold.it/150x150`) {
        this.id = product.id;
        this.title = product.title;
        this.price = product.price;
        this.img = img;
    }

    render() {
        return `<div class="product-item">
                 <img src="${this.img}" alt="${this.title}">
                 <div class="desc">
                     <h3>${this.title}</h3>
                     <p>${this.price}</p>
                     <button class="button buy-btn">Купить</button>
                 </div>
             </div>`
    }
}

class Cart {
    constructor(container = '.cart') {
        this.container = container;//где рисовать корзину
        this.data = [];//данные корзины
        this.allCartProducts = [];//храним всё содержимое корзины
        this.init();
    }

    _fetchCart() {//запросить данные корзины
        this.data = [];
    }
    _render(){}//отрисовать содержимое корзины
    addToCart(){}//добавление товара в корзину
    removeFromCart(){}//удаление товара из козины
    changeQuantity(){}//корректировать кол-во текущего товара в корзине
    calcCartItem(){}//подсчёт стоимости товара (цена * количество)
    calcCart(){}//подсчёт полной стоимости корзины
    resetCart(){}//очистить корзину
}
class CartItem {
    constructor(product) {
        this.id = product.id;
        this.title = product.title;//нужны ли данные по названию?
        this.price = product.price;
        this.quantity = product.quantity;//количество
    }
    render() {}//отрисовка одного элемента корзины
}
const products = new ProductsList();