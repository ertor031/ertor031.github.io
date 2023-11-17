let tg = window.Telegram.WebApp;

tg.expand();
tg.MainButton.textColor = '#FFFFFF';
tg.MainButton.color = '#2cab37';


const itemsContainer = document.getElementById("items-container");
const userCard = document.getElementById("usercard");

let data;

const products = [
	{ id: "1", price: "1004$" ,name: "Jordan", imgSrc: "png/Traktors.png", buttonText: "Добавить", category: "category2" },
	{ id: "2", price: "1003$" , name: "Nike", imgSrc: "png/Traktors.png", buttonText: "Добавить", category: "category2" },
	{ id: "3", price: "1002$" , name: "Adidas", imgSrc: "png/Traktors.png", buttonText: "Добавить", category: "category1" },
	{ id: "4", price: "1003$" , name: "Nike", imgSrc: "png/Traktors.png", buttonText: "Добавить", category: "category2" },
	{ id: "5", price: "1002$" , name: "KC",imgSrc: "png/Traktors.png", buttonText: "Добавить", category: "category1" },
	{ id: "6", price: "1032$" , name: "Nike", imgSrc: "png/Traktors.png", buttonText: "Добавить", category: "category2" },
];

function filterItems(category) {
    console.log(category); // Добавьте эту строку для отладки

    const items = document.querySelectorAll('.item');
    items.forEach(item => {
        if (category === 'all' || item.classList.contains(category)) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });
}

products.forEach(product => {
    const itemDiv = document.createElement("div");
    itemDiv.classList.add("item");
    itemDiv.classList.add(product.category); // Добавляем класс категории

    const img = document.createElement("img");
    img.src = product.imgSrc;
    img.alt = "";
    img.classList.add("img");

    const productName = document.createElement("p");
    productName.innerText = product.name;
    productName.classList.add("productName"); // Добавляем класс productName

    const productDescription = document.createElement("p");
    productDescription.innerText = product.price; // Замените 'description' на ваше свойство
    productDescription.classList.add("Price"); // Добавляем класс productDescription

    const button = document.createElement("button");
    button.classList.add("btn");
    button.id = `btn${product.id}`;
    button.innerText = product.buttonText;

    itemDiv.appendChild(img);
    itemDiv.appendChild(productName); // Добавляем название под картинкой
    itemDiv.appendChild(productDescription); // Добавляем описание под названием
    itemDiv.appendChild(button);

    itemsContainer.appendChild(itemDiv);

    button.addEventListener("click", function() {
        if (tg.MainButton.isVisible) {
            tg.MainButton.hide();
        } else {
            tg.MainButton.setText(`Подтвердить`);

            data = {
                id: product.id,
                name: product.name,
                price: product.price,
                category: product.category
            }

            tg.MainButton.show();
        }
    });
});



Telegram.WebApp.onEvent("mainButtonClicked", function(){
	tg.sendData(JSON.stringify(data));
});

const p = document.createElement("p");
p.innerText = `${tg.initDataUnsafe.user.first_name} ${tg.initDataUnsafe.user.last_name}`;
userCard.appendChild(p);






