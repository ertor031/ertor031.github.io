let tg = window.Telegram.WebApp;

tg.expand();
tg.MainButton.textColor = '#FFFFFF';
tg.MainButton.color = '#2cab37';

let item = "";

const itemsContainer = document.getElementById("items-container");
const userCard = document.getElementById("usercard");

const products = [
	{ id: "1", imgSrc: "png/Traktors.png", buttonText: "Добавить" },
	{ id: "2", imgSrc: "png/Traktors.png", buttonText: "Добавить" },
	{ id: "3", imgSrc: "png/Traktors.png", buttonText: "Добавить" },
	{ id: "4", imgSrc: "png/Traktors.png", buttonText: "Добавить" },
	{ id: "5", imgSrc: "png/Traktors.png", buttonText: "Добавить" },
	{ id: "6", imgSrc: "png/Traktors.png", buttonText: "Добавить" },
];

products.forEach(product => {
	const itemDiv = document.createElement("div");
	itemDiv.classList.add("item");

	const img = document.createElement("img");
	img.src = product.imgSrc;
	img.alt = "";
	img.classList.add("img");

	const button = document.createElement("button");
	button.classList.add("btn");
	button.id = `btn${product.id}`;
	button.innerText = product.buttonText;

	itemDiv.appendChild(img);
	itemDiv.appendChild(button);

	itemsContainer.appendChild(itemDiv);

	button.addEventListener("click", function() {
		if (tg.MainButton.isVisible) {
			tg.MainButton.hide();
		} else {
			tg.MainButton.setText(`Вы выбрали товар ${product.id}!`);
			item = product.id;
			tg.MainButton.show();
		}
	});
});

Telegram.WebApp.onEvent("mainButtonClicked", function(){
	tg.sendData(item);
});

const p = document.createElement("p");
p.innerText = `${tg.initDataUnsafe.user.first_name} ${tg.initDataUnsafe.user.last_name}`;
userCard.appendChild(p);






