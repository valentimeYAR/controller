// Создаем экземпляр контроллера
const controller = new InputController();

// Получаем ссылки на кнопки и интерактивный объект
const attachBtn = document.getElementById('attach-btn');
const detachBtn = document.getElementById('detach-btn');
const enableBtn = document.getElementById('enable-btn');
const disableBtn = document.getElementById('disable-btn');
const bindActivityBtn = document.getElementById('bind-activity-btn');
const jumpBtn = document.getElementById('jump-btn');
const interactiveObj = document.getElementById('interactive-object');
interactiveObj.style.position = 'absolute';
interactiveObj.style.left = '0px';
interactiveObj.style.top = '0px';
// Функция для движения объекта в стороны
function moveObject() {
    if (controller.isAction('left')) {
        interactiveObj.style.left = (parseInt(interactiveObj.style.left) - 10) + 'px';
    }
    if (controller.isAction('right')) {
        interactiveObj.style.left = (parseInt(interactiveObj.style.left) + 10) + 'px';
    }
    if (controller.isAction('up')) {
        interactiveObj.style.top = (parseInt(interactiveObj.style.top) - 10) + 'px';
    }
    if (controller.isAction('down')) {
        interactiveObj.style.top = (parseInt(interactiveObj.style.top) + 10) + 'px';
    }
}

// Обработчики событий для кнопок
attachBtn.addEventListener('click', () => {
    controller.attach(document);
});

detachBtn.addEventListener('click', () => {
    controller.detach();
});

enableBtn.addEventListener('click', () => {
    controller.enable();
});

disableBtn.addEventListener('click', () => {
    controller.disable();
});

bindActivityBtn.addEventListener('click', () => {
    controller.bindActions({
        jump: {
            keys: [' '],
            enabled: true
        }
    });
});

jumpBtn.addEventListener('click', () => {
    controller.enableAction('jump');
});
document.addEventListener(controller.ACTION_ACTIVATED, (event) => {
    if (event.detail === 'jump') {
        interactiveObj.style.backgroundColor = 'green'; // Изменяем цвет на активность "прыжок"
    }
})
document.addEventListener(controller.ACTION_DEACTIVATED, (event) => {
    if (event.detail === 'jump') {
        interactiveObj.style.backgroundColor = 'blue'; // Возвращаем цвет обратно
    }
});
bindActivityBtn.addEventListener('click', () => {
    controller.bindActions({
        jump: {
            keys: [' '],
            enabled: true
        },
        left: {
            keys: ['ArrowLeft'],
            enabled: true
        },
        right: {
            keys: ['ArrowRight'],
            enabled: true
        },
        up: {
            keys: ['ArrowUp'],
            enabled: true
        },
        down: {
            keys: ['ArrowDown'],
            enabled: true
        }
    });
});

document.addEventListener('keydown', (event) => {
    controller.handleKeyDown(event);
});

document.addEventListener('keyup', (event) => {
    controller.handleKeyUp(event);
});
// Опрашиваем метод isActionActive и двигаем объект
setInterval(moveObject, 16); // 60 FPS