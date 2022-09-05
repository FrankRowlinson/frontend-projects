const userSurname = document.querySelector('[name="surname"]'); 
const userName =  document.querySelector('[name="name"]'); 

const goodsElements = document.querySelectorAll('[name="goods"]'); 
const countElements = document.querySelectorAll('[name="amount"]'); 

const btn = document.getElementsByClassName("btn")[0];
const resultElem = document.getElementsByClassName("sum")[0];

let sum = 0;

// объекты можно было объединить в один вложенный, но я не стал
// потому что поздно вспомнил
const countGoods = { 
    "expresso": 0,
    "americano": 0,
    "latte": 0,
    "capuchino": 0,
    "chocolate_muffin": 0,
    "blueberry_muffin": 0,
    "apple_tart": 0
}

const choicePriceGoods = { 
    "expresso": 0,
    "americano": 0,
    "latte": 0,
    "capuchino": 0,
    "chocolate_muffin": 0,
    "blueberry_muffin": 0,
    "apple_tart": 0
}

const translation = {
    "expresso": "Эспрессо",
    "americano": "Американо",
    "latte": "Латте",
    "capuchino": "Капучино",
    "chocolate_muffin": "Шоколадный кекс",
    "blueberry_muffin": "Черничный кекс",
    "apple_tart": "Яблочный тарт"
}

// функция для обновления переменной, содержащей итоговую сумму
function getSum() {
    sum = 0;
    for (const [name, amount] of Object.entries(countGoods)) {
        sum = sum + choicePriceGoods[name] * Math.max(amount, 0);
    }
    resultElem.textContent = `${Math.max(sum, 0)} руб.`;
}

// костыльный ужас, лучше не читать эти два цикла
countElements.forEach(elem => {
    elem.addEventListener("change", function() {
        countGoods[elem.id] = parseInt(elem.value);
        // меняю состояние чекбокса в зависимости от введенного количества
        checkbox = elem.parentNode.childNodes[1]
        checkbox.checked = elem.value != '0';
        choicePriceGoods[elem.id] = elem.value != '0' ? parseInt(checkbox.value) : 0;
        // обновляю сумму
        getSum();
    })
});

goodsElements.forEach(product => {
    product.addEventListener("change", function() {
        choicePriceGoods[product.dataset.goods] = product.checked ? parseInt(product.value) : 0;
        // привязываю состояние поля количества к состоянию чекбокса
        amountField = product.parentNode.childNodes[5];
        console.log(amountField);
        if (product.checked && amountField.value == '0') {
            amountField.value = '1';
        } else if (!product.checked) {
            amountField.value = '0';
        }
        countGoods[amountField.id] = parseInt(amountField.value);
        // обновляю сумму
        getSum();
    })
});

// функция, вызываемая по нажатию кнопки. Генерирует сообщение и показывает в alert
function showInfo() {
    let result = "Ваш чек:\n";
    if (userName.value.length != 0 && userSurname.value.length != 0) {
        result = `Дорогой ${userName.value} ${userSurname.value}, `.concat(result);
    }
    for (const [name, trans] of Object.entries(translation)) {
        if (countGoods[name] > 0) {
            result = result.concat(`${trans} x ${countGoods[name]}`,
                 ": ",
                  `${countGoods[name] * choicePriceGoods[name]} руб.`,
                  "\n");
        }
    }
    result = result.concat(`Итого: ${sum} руб.`);
    alert(result);
}

btn.addEventListener("click", showInfo);