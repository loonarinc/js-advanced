const API = `https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses`;


// let getRequest = (url, cb) => {
//     let xhr = new XMLHttpRequest();
//     // window.ActiveXObject -> xhr = new ActiveXObject();
//     xhr.open('GET', url, true);
//     xhr.onreadystatechange = () => {
//         if(xhr.readyState === 4){
//             if(xhr.status !== 200){
//                 console.log('error');
//             } else {
//                 cb(xhr.responseText);
//             }
//         }
//     }
// };
let makeGetRequest = url => {
    return new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4) {
                if (xhr.status !== 200) {
                    reject(console.log('error'));
                } else {
                    resolve(xhr.responseText);
                }
            }
        }
    })

}


class ProductsList {
    constructor(container = '.products') {
        this.container = container;
        this.data = [];
        this.allProducts = [];
        this._getProducts()
            .then(() => this._render());
    }

    _getProducts() {
        return fetch(`${API}/catalogData.json`)
            .then(result => result.json())
            .then(data => {
                this.data = [...data];
            })
            .catch(error => console.log('error'));
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
        return this.allProducts.reduce((accum, item) => accum + item.price, 0);
    }
}

class ProductItem {
    constructor(product, img = `https://placehold.it/150x150`) {
        this.id_product = product.id_product;
        this.product_name = product.product_name;
        this.price = product.price;
        this.img = img;
    }

    render() {
        return `<div class="product-item" data-id_product="${this.id_product}">
                 <img src="${this.img}" alt="${this.product_name}">
                 <div class="desc">
                     <h3>${this.product_name}</h3>
                     <p>${this.price}</p>
                     <button class="button buy-btn">Купить</button>
                 </div>
             </div>`
    }
}

class Cart {
    constructor(container = '.dropcart__flex') {
        this.container = container;//где рисовать корзину
        this.data = [];//данные корзины
        this.allCartProducts = [];//храним всё содержимое корзины
        this._getCart()
            .then(() => this._render());
    }

    _getCart() {//запросить данные корзины
        return fetch(`${API}/getBasket.json`)
            .then(result => result.json())
            .then(data => {
                this.data = [...data.contents];
            })
            .catch(error => console.log('error1'));
    }

    _render() {//отрисовать содержимое корзины
        const block = document.querySelector(this.container);
        for (let item of this.data) {
            console.log(item);
            const product = new CartItem(item);
            this.allCartProducts.push(product);
            block.insertAdjacentHTML('beforeend', product.render());
        }
        console.log(this.allCartProducts);
    }
    _rerender(allCartProducts){
        const block = document.querySelector(this.container);
        for (let item of allCartProducts) {
            const product = new CartItem(item);
            block.insertAdjacentHTML('beforeend', product.render());
        }
    }

    addToCart(cartItem) {//добавление товара в корзину
        if (this.allCartProducts.find(x => x.id_product === +cartItem) !== undefined) {
            this.allCartProducts.find(x => x.id_product === +cartItem).quantity += 1;
            let $quan = document.getElementById(`quantity_${cartItem}`);
            $quan.textContent = this.allCartProducts.find(x => x.id_product === +cartItem).quantity;
        } else {
            let product1 = new CartItem({id_product: +cartItem, product_name: products.allProducts.find(x => x.id_product === +cartItem).product_name, price: products.allProducts.find(x => x.id_product === +cartItem).price , quantity: 1});
            this.allCartProducts.push(product1);
            this.resetCart();
            this._rerender(this.allCartProducts);
        }
    }

    removeFromCart(cartItem) {//удаление товара из козины

        if (this.allCartProducts.find(x => x.id_product === +cartItem) !== undefined) {
            if (this.allCartProducts.find(x => x.id_product === +cartItem).quantity >= 2) {
                this.allCartProducts.find(x => x.id_product === +cartItem).quantity -= 1;
                let $quan = document.getElementById(`quantity_${cartItem}`);
                $quan.textContent = this.allCartProducts.find(x => x.id_product === +cartItem).quantity;
            } else  {
                this.allCartProducts.splice(this.allCartProducts.find(x => x.id_product === +cartItem), 1);
                console.log(this.allCartProducts);
                this.resetCart();
                this._rerender(this.allCartProducts);
            }
        } else {

        }
    }

    changeQuantity() {
    }//корректировать кол-во текущего товара в корзине
    calcCartItem() {
    }//подсчёт стоимости товара (цена * количество)
    calcCart() {
    }//подсчёт полной стоимости корзины
    resetCart() {
        const block = document.querySelector(this.container);
        block.innerHTML = "";

    }//очистить корзину
}

class CartItem {
    constructor(product) {
        this.id_product = product.id_product;
        this.product_name = product.product_name;
        this.price = product.price;
        this.quantity = product.quantity;//количество
    }

    render() {
        return `<div class="cart-item" data-id_product="${this.id_product}">
                 <div class="desc">
                     <h3>${this.product_name}</h3>
                     <p>${this.price}</p>
                     <p id="quantity_${this.id_product}">${this.quantity}</p>
                     <button class="button rmv-btn">x</button>
                 </div>
             </div>`
    }//отрисовка одного элемента корзины
}

const products = new ProductsList();
const cart = new Cart();

function init() {
    let $body = document.querySelector('body');
    $body.addEventListener('click', handleButtonClick);
}

function handleButtonClick(event) {
    if (event.target.textContent === 'Корзина') {
        let $cart = document.getElementById('cart');
        if ($cart.style.display === 'none')
            $cart.style.display = 'flex';
        else
            $cart.style.display = 'none';
    }
    if (event.target.textContent === 'Купить') {
        cart.addToCart(event.target.parentElement.parentElement.dataset.id_product);
    }
    if (event.target.textContent === 'x') {
        cart.removeFromCart(event.target.parentElement.parentElement.dataset.id_product);
    }
}

window.addEventListener('load', init);