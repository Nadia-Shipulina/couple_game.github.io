
// Этап 1. Создайте функцию, генерирующую массив парных чисел. Пример массива, который должна возвратить функция: [1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8].count - количество пар.

function createNumbersArray(count) {
    let couplesNumberArray = []
    for (let i = 1; i <= count / 2; i++) {
        couplesNumberArray.push(i);
        couplesNumberArray.push(i);
    }
    return couplesNumberArray
}
// Этап 2. Создайте функцию перемешивания массива.Функция принимает в аргументе исходный массив и возвращает перемешанный массив. arr - массив чисел

function shuffle(arr) {
    let j;
    let temp;
    for (let i = arr.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        temp = arr[j];
        arr[j] = arr[i];
        arr[i] = temp;
    }
    return arr;
}

// Этап 3. Используйте две созданные функции для создания массива перемешанными номерами. На основе этого массива вы можете создать DOM-элементы карточек. У каждой карточки будет свой номер из массива произвольных чисел. Вы также можете создать для этого специальную функцию. count - количество пар.


let input = document.getElementById('input')
let countInput
input.addEventListener('input', () => {
    countInput = Number(input.value)
})

document.getElementById('button').addEventListener('click', () => {
    startGame(document.getElementById('card__list'), countInput)
})

function startGame(container, count) {
    container.innerHTML = ''
    let p = document.createElement('p')
    let center = document.createElement('div')
    p.classList.add('win')
    p.textContent = 'Победа!'
    center.classList.add('center-block')
    center.append(p)
    container.append(center)
    cardsArray = []
    let orderedPairs = createNumbersArray(count)
    let shuffledPairs = shuffle(orderedPairs)
    let cardItem
    let firstCard = 0
    let cardNumber
    let num
    let firstCardElement

    function createCard(cardContainer, number) {
        cardItem = document.createElement('li')
        cardItem.classList.add('card__item')
        cardItem.textContent = number
        cardNumber = cardItem.textContent
        cardContainer.append(cardItem)
        console.log(cardNumber)
    };

    for (let cardsNumber of shuffledPairs) {
        cardsArray.push(createCard(container, cardsNumber))
    };

    function getNumberAndFlip(event) {
        num = parseInt(event.target.textContent)

        if (this.classList.contains('open')) {
            return
        }

        if (firstCard === 0) {
            let openCards = document.querySelectorAll('.card__item.open')
            for (let closeCard of openCards) {
                if (!closeCard.classList.contains('success')) {
                    closeCard.classList.remove('open')
                }
            }
        }

        this.classList.add('open')

        if (firstCard === 0) {
            firstCard = num
            firstCardElement = this
        } else {
            if (firstCard === num) {
                this.classList.add('success')
                firstCardElement.classList.add('success')

                if (document.querySelectorAll('.card__item.success').length == cardsArray.length) {
                    document.querySelector('.win').classList.add('active')
                    document.querySelector('.center-block').classList.add('active')
                }
            }
            firstCard = 0
        }
    }


    let allCard = document.querySelectorAll('.card__item')

    for (let eachCardIteam of allCard) {
        eachCardIteam.addEventListener('click', getNumberAndFlip)
    }
}

