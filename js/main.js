const products = [
    {id: 1, title: 'Notebook', price: 2000},
    {id: 2, title: 'Mouse', price: 30, quantity: 20},
    {id: 3, title: 'Keyboard', price: 55},
    {id: 4, title: 'Gamepad', price: 75},
];

const renderProduct = (title, price, quantity = 1) => {//добавил аргумент по умолчанию
    return `<div class="product-item">
                <h3>${title}</h3>
                <p>${price}</p>
                <p>${quantity}</p>
                <button class="button buy-btn">Купить</button>
            </div>`
};
console.log(products);

//const renderPage = list => {
//    const productsList = list.map(item => renderProduct(item.title, item.price, item.quantity));
//    //productsList имеет вид <div>...</div>,<div>...</div>,<div>...</div>,<div>...</div> - отсюда и берётся запятая
//    //document.querySelector('.products').innerHTML = productsList;//мы просто помещаем в html содержимое вместе с замятыми
//    document.querySelector('.products').innerHTML = productsList.join("");//нашёл метод join - задачу решает.
//};


const renderPage = list => {
    //сократил запись, можно обойтись без переменной
    document.querySelector('.products').innerHTML = list.map(item => renderProduct(item.title, item.price, item.quantity)).join("");

};

renderPage(products);