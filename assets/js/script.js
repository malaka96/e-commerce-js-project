const itemGrid = document.querySelector('.item-grid');

const form = document.querySelector('.form');

function showItems() {
    const itemsArray = JSON.parse(localStorage.getItem('itemsArray')) || [];
    if (itemGrid) {
        itemGrid.innerHTML = ''; // Clear previous items

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

            card.appendChild(image);
            card.appendChild(title);
            card.appendChild(priceTag);
            card.appendChild(button);

            itemGrid.appendChild(card);
        }
    }
}

showItems();
function addProduct() {
    if (form) {

        const name = document.querySelector('#product-name');
        const price = document.querySelector('#price-tag');
        const imageUrl = document.querySelector('#image-url');

        const newItem = {
            name: name.value,
            image: imageUrl.value,
            price: price.value
        };
        if (name.value && price.value && imageUrl.value) {
            let itemsArray = JSON.parse(localStorage.getItem('itemsArray')) || [];
            itemsArray.push(newItem);
            localStorage.setItem('itemsArray', JSON.stringify(itemsArray));
            console.log(itemsArray[itemsArray.length - 1]);
            showItems(); // Refresh the grid
        } else {
            alert('please fill out all fields');
        }
    }
}
