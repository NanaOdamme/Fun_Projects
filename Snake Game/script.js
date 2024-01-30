// define html elements
const board = document.getElementById('game-board');

//define game variants
let snake = [{x: 10, y: 10}]

//function to draw game map
function draw()
{
    board.innerHTML = '';
    drawSnake();
}

//draw snake
function drawSnake()
{
    snake.forEach((segment) => {
        const snakeElement = createGameElement('div',
        'snake');
        setPosition(snakeElement, segment);
    });
}

//create a snake or food cube
function createGameElement(tag, className) {
    const element = document.createElement(tag);
    element.className = className;
    return element;
}

// set the position of the snake or food
function setPosition(element, position) {
    element.style.gridColumn = position.x;
}