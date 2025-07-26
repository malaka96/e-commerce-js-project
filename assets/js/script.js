const plusButton = `<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 50 50">
<path d="M 25 2 C 12.264481 2 2 12.264481 2 25 C 2 37.735519 12.264481 48 25 48 C 37.735519 48 48 37.735519 48 25 C 48 12.264481 37.735519 2 25 2 z M 25 4 C 36.664481 4 46 13.335519 46 25 C 46 36.664481 36.664481 46 25 46 C 13.335519 46 4 36.664481 4 25 C 4 13.335519 13.335519 4 25 4 z M 24 13 L 24 24 L 13 24 L 13 26 L 24 26 L 24 37 L 26 37 L 26 26 L 37 26 L 37 24 L 26 24 L 26 13 L 24 13 z"></path>
</svg>`;

const minusButton = "assets/images/minus.png";

const itemGrid = document.querySelector('.item-grid');
const form = document.querySelector('.form');

function fetchItems() {
    const itemsArray = JSON.parse(localStorage.getItem('itemsArray')) || [];

    const cartPaths = document.querySelector('#carts-path');
    if (cartPaths) {
        const cartItemsLocal = JSON.parse(localStorage.getItem('cartItemsArray')) || [];
        cartPaths.textContent = `Cart (${cartItemsLocal.length})`;
    }



    if (itemGrid) {
        itemGrid.innerHTML = '';

        for (let i = 0; i < itemsArray.length; i++) {
            const card = document.createElement('div');
            card.classList.add('card');

            const image = document.createElement('img');
            image.setAttribute('src', itemsArray[i].image);

            const title = document.createElement('h4');
            title.textContent = itemsArray[i].name;

            const priceTag = document.createElement('h5');
            priceTag.textContent = '$' + itemsArray[i].price;

            const button = document.createElement('button');
            button.textContent = 'Add to cart';
            button.addEventListener('click', () => {
                addToCart(
                    itemsArray[i]
                );
            });

            card.appendChild(image);
            card.appendChild(title);
            card.appendChild(priceTag);
            card.appendChild(button);

            itemGrid.appendChild(card);
        }
    }
}

fetchItems();
function addProduct() {
    if (form) {

        const name = document.querySelector('#product-name');
        const price = document.querySelector('#price-tag');
        const imageUrl = document.querySelector('#image-url');

        const newItem = {
            name: name.value,
            image: imageUrl.value,
            price: price.value,
            quantity: 1,
            total: price.value,
        };
        if (name.value && price.value && imageUrl.value) {
            let itemsArray = JSON.parse(localStorage.getItem('itemsArray')) || [];
            itemsArray.push(newItem);
            localStorage.setItem('itemsArray', JSON.stringify(itemsArray));
            console.log(itemsArray[itemsArray.length - 1]);
            fetchItems(); // Refresh the grid
        } else {
            alert('please fill out all fields');
        }
    }
}

function addToCart(cartItem) {
    let cartItems = JSON.parse(localStorage.getItem('cartItemsArray')) || [];
    for (let i = 0; i < cartItems.length; i++) {
        if (cartItems[i].name === cartItem.name) {
            cartItems[i].quantity++;
            cartItems[i].total = Number(cartItems[i].total) * cartItems[i].quantity;
            localStorage.setItem('cartItemsArray', JSON.stringify(cartItems));
            alert('Successfully product added to cart');
            return;
        }
    }
    const tempItem = {
        name: cartItem.name,
        image: cartItem.image,
        price: cartItem.price,
        quantity: 1,
        total: Number(cartItem.price) * cartItem.quantity,
    }
    cartItems.push(tempItem);
    localStorage.setItem('cartItemsArray', JSON.stringify(cartItems));
    alert('Successfully product added to cart');
    window.location.reload();

}

function fetchCartItems() {
    const cartItemGrid = document.querySelector('.cart-item-grid');
    if (cartItemGrid) {
        const cartItems = JSON.parse(localStorage.getItem('cartItemsArray')) || [];
        for (let i = 0; i < cartItems.length; i++) {
            const card = document.createElement('div');
            card.classList.add('card');

            const image = document.createElement('img');
            image.setAttribute('src', cartItems[i].image);

            const title = document.createElement('h4');
            title.textContent = cartItems[i].name;

            const priceTag = document.createElement('h5');
            priceTag.textContent = '$' + cartItems[i].price;

            // const quantityDiv = document.createElement('div');

            // const minus = document.createElement('img');
            // minus.setAttribute('src', minusButton);
            // minus.classList.add('img-minus');
            // const plus = document.createElement('button');
            // plus.innerHTML = plusButton;

            const quantity = document.createElement('h5');
            quantity.textContent = cartItems[i].quantity;

            const total = document.createElement('h5');
            total.textContent = 'total : $' + cartItems[i].total;

            // quantityDiv.appendChild(minus);
            // quantityDiv.appendChild(quantity);
            // quantityDiv.appendChild(plus);

            const button = document.createElement('button');
            button.textContent = 'Remove';
            button.addEventListener('click', () => {
                removeCartItems(i);
            });

            card.appendChild(image);
            card.appendChild(title);
            card.appendChild(priceTag);
            card.appendChild(quantity);
            card.appendChild(total);
            card.appendChild(button);

            cartItemGrid.appendChild(card);
        }
    }
}

fetchCartItems();

function removeCartItems(index) {
    console.log('remove items called from cart');
    let cartItems = JSON.parse(localStorage.getItem('cartItemsArray')) || [];
    cartItems.splice(index, 1);
    localStorage.setItem('cartItemsArray', JSON.stringify(cartItems));
    window.location.reload();
}

function setTotal() {
    const totalElement = document.querySelector('#total');
    if (totalElement) {
        let total = 0;
        let cartItems = JSON.parse(localStorage.getItem('cartItemsArray')) || [];
        for (let i = 0; i < cartItems.length; i++) {
            total += cartItems[i].total;
        }
        totalElement.textContent = "$"+total;
    }
}

setTotal();