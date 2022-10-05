document.addEventListener('DOMContentLoaded', function() {

    (function createCards() {
        let form = document.querySelector('form');
        let input  = document.querySelector('.input');
        let startButton = document.querySelector('.start-btn');
        
        startButton.addEventListener('click', function() {
            
            let numbersQuantity = parseInt(input.value);
            if (numbersQuantity < 2 || numbersQuantity > 10 || numbersQuantity % 2 === 1) {
                input.value = 4;
            
            }
            else {

                let container = document.querySelector('.container');
                
                form.remove();
                            
                for (let i = 1; i <= numbersQuantity; i++) {

                    let list = document.createElement('ul');
                    list.classList.add('list');
                    container.append(list);
                    for (let i = 1; i <= numbersQuantity; i++) {

                        let listItem = document.createElement('li');
                        let card = document.createElement('button');
                        let cardText = document.createElement('p');

                        listItem.classList.add('item');
                        card.classList.add('btn');

                        card.append(cardText);
                        listItem.append(card);
                        list.append(listItem);
                    }
                }

                
                let text = Array.from(document.querySelectorAll('p'));
                const buttons = Array.from(document.querySelectorAll('.btn'));
                let checkNewGameButton = false;
                              
                function shuffle(array) {
                    for (let i = array.length - 1; i > 0; i--) {
                    let j = Math.floor(Math.random() * (i + 1)); // случайный индекс от 0 до i
                    [array[i], array[j]] = [array[j], array[i]];
                    }
                }
            
                function newGame() {
                    let numbers = [];
                    for (let i = 1; i <= (Math.pow(numbersQuantity, 2) / 2); i++) {
                        numbers.push(i);
                        numbers.push(i);
                    }
                    shuffle(numbers);
                    for (let i in text) {
                        text[i].hidden = true;
                        text[i].textContent = numbers[i];
                    };
                    buttons.forEach(button => button.disabled = false);
                    
                }
            
                function checkForMatch() {
                    if (firstCard.firstChild.textContent === secondCard.firstChild.textContent) {
                        
                        firstCard.disabled = true;
                        secondCard.disabled = true;
                        
                        setTimeout(() => {
                            if (checkEndOfTheGame() && (!checkNewGameButton)) 
                                endOfTheGame();
                            else if (checkEndOfTheGame() && (checkNewGameButton))
                                newGameButton.disabled = false;
            
                        }, 1000);
                        
                        reset();
                        
                        
                    }
                    else unflipCards();
                    
                }
            
                function unflipCards() {
                    lock = true;
                    setTimeout(() => {
                        firstCard.firstChild.hidden = true;
                        secondCard.firstChild.hidden = true;
                        reset();
                    }, 1500)
                }
            
                function reset() {
                    [hasFlippedCard, lock] = [false, false];
                    [firstCard, secondCard] = [null, null];
                }
        
                function checkEndOfTheGame() {
                    for (let button of buttons) {
                        if (button.firstChild.hidden === true) return false;
                        
                    }; 
                    return true;
                }

                function endOfTheGame() {
                    buttons.forEach(button => button.disabled = true);
                    createNewGameButton();
                }

                newGame();
                let timerId = setTimeout(endOfTheGame, 60000);
                let timer = document.createElement('p');
                let timerContainer = document.querySelector('.btn-container'); 
                timerContainer.append(timer);
                let nIntervId;
                timer.textContent = "60";
                function changeNumber() {
                    timer.textContent = parseInt(timer.textContent) - 1;
                    if (parseInt(timer.textContent) === 0) {
                        clearInterval(nIntervId);
                        nIntervId = null;
                    }
                }
                nIntervId = setInterval(changeNumber, 1000);

                function createNewGameButton() {
                    timer.remove();
                    clearTimeout(timerId);
                    clearInterval(nIntervId);
                    nIntervId = null;
                    let newGameButton =  document.createElement('button');
                    let container = document.querySelector('.btn-container');
                    newGameButton.classList.add('big_button');
                    newGameButton.textContent = 'Сыграть ещё раз';
                    container.append(newGameButton);
                    newGameButton.onclick = (e) => {
                        e.preventDefault();
                        newGame();

                    };
                    checkNewGameButton = true;
                    
                }
            
                let hasFlippedCard = false;
                let firstCard, secondCard;
                let lock = false;
            
                function flipCard() {
                    
                    if (lock) return;
                    if (this === firstCard) return;
                    this.firstChild.hidden = false;
            
                    if (!hasFlippedCard) {
                        hasFlippedCard = true;
                        firstCard = this;
                        return;
                    }
            
                    secondCard = this;
            
                    checkForMatch();
            
                }
            
                buttons.forEach(button => button.addEventListener('click', flipCard));
            }
        })
    })();
}) 
