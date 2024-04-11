const btnCart = document.querySelector('#cart-icon');
const cart = document.querySelector('.cart');
const btnClose = document.querySelector('#cart-close');

btnCart.addEventListener('click', () => {
    cart.classList.add('cart-active');
});

btnClose.addEventListener('click', () => {
    cart.classList.remove('cart-active');
});
document.addEventListener('DOMContentLoaded', loadMovie);
function loadMovie() {
    loadContent();

}

function loadContent() {
    let btnRemove = document.querySelectorAll('#cart-remove');
    btnRemove.forEach((btn) => {
        btn.addEventListener('click', removeItem);
    });
    let qtyElements = document.querySelectorAll('.cart-quantity');
    qtyElements.forEach((input) => {
        input.addEventListener('change', changeQty);
    });
    let cartBtns = document.querySelectorAll('#cart-add');
    cartBtns.forEach((btn) => {
        btn.addEventListener('click', addCart);
    });
    updateTotal();

}
function removeItem() {
    if (confirm('Are Your Sure to Remove')) {
        let title = this.parentElement.querySelector('.cart-Movie-title').innerHTML;
        itemList = itemList.filter(el => el.title != title);
        this.parentElement.remove();
        loadContent();

    }
}


function changeQty() {
    if (isNaN(this.value) || this.value < 1) {
        this.value = 1;
    }
    loadContent();
}
let itemList = [];
function addCart() {
    let movie = this.parentElement;
    let title = movie.querySelector('.movie-title').innerHTML;
    let price = movie.querySelector('.movie-price').innerHTML;
    let imgSrc = movie.querySelector('#movie-img').src;

    let newProduct = { title, price, imgSrc }
    if (itemList.find((el) => el.title == newProduct.title)) {
        alert("Product Already added in Cart");
        return;
    }
    else {
        itemList.push(newProduct);
    }



    let newProductElement = createCartProduct(title, price, imgSrc);
    let element = document.createElement('div');
    element.innerHTML = newProductElement;
    let cartBasket = document.querySelector('.cart-content');
    cartBasket.append(element);
    loadContent();
}


function createCartProduct(title, price, imgSrc) {

    return `
  <div class="cart-box1">
  <img src="${imgSrc}" class="cart-img">
  <div class="detail-box">
    <div class="cart-Movie-title">${title}</div>
    <div class="price-box">
      <div class="cart-price">${price}</div>
       <div class="cart-amt">${price}</div>
   </div>
    <input type="number" value="1" class="cart-quantity">
  </div>
  <i class="fa-solid fa-trash" id="cart-remove"></i>
  
</div>
  `;
}
function updateTotal() {
    const cartItems = document.querySelectorAll('.cart-box1');
    const totalValue = document.querySelector('.total-price');

    let total = 0;

    cartItems.forEach(product => {
        let priceElement = product.querySelector('.cart-price');
        let price = parseFloat(priceElement.innerHTML.replace("Rs.", ""));
        let qty = product.querySelector('.cart-quantity').value;
        total += (price * qty);
        product.querySelector('.cart-amt').innerText = "Rs." + (price * qty);

    });

    totalValue.innerHTML = 'Rs.' + total;

    const cartCount = document.querySelector('.num');
    let count = itemList.length;
    cartCount.innerHTML = count;

    if (count == 0) {
        cartCount.style.display = 'none';
    } else {
        cartCount.style.display = 'block';
    }


}