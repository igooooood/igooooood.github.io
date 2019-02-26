{
    let playngFieldData = ['', '', '', '', '', '', '', '', ''];
    let player = 'X';
    let winner = document.getElementById('winner');
    let popup = document.getElementById('popup');
    let restartBtn = document.getElementById('restart');
    let buttons = document.getElementsByClassName('button');

    // переключение кнопок в состояние disabled (true/false)
    toggleDisabledButtons = (bool) => {
        for (let i = 0; i < buttons.length; i++) {
            buttons[i].disabled = bool;
        }
    }

    actionsCompletion = () => {
        toggleDisabledButtons(true);
        popup.classList.add('popup-animation');
        restartBtn.addEventListener('click', onResetData);
    }

    // удаляем все значения с элементов
    onResetData = () => {
        for (let i = 0; i < playngFieldData.length; i++) {
            for (let i = 0; i < buttons.length; i++) {
                buttons[i].innerText = '';
            }
        }

        // удаляем все значения с массива
        playngFieldData = playngFieldData.map(item => item = '');
        player = 'X';
        winner.innerText = ''

        restartBtn.removeEventListener("click", onResetData);
        toggleDisabledButtons(false);
        popup.classList.remove('popup-animation');
    }

    isWinner = (arr, value) => {
        if (
                (arr[0] === value && arr[1] === value && arr[2] === value) ||
                (arr[3] === value && arr[4] === value && arr[5] === value) ||
                (arr[6] === value && arr[7] === value && arr[8] === value) ||
                (arr[0] === value && arr[3] === value && arr[6] === value) ||
                (arr[1] === value && arr[4] === value && arr[7] === value) ||
                (arr[2] === value && arr[5] === value && arr[8] === value) ||
                (arr[2] === value && arr[4] === value && arr[6] === value) ||
                (arr[0] === value && arr[4] === value && arr[8] === value)
            ) {
                actionsCompletion();
                (value === 'X') ? winner.innerText = 'Player one win' : winner.innerText = 'Player two win';
            } else {
                if (arr.every(item => item !== '')) {
                    actionsCompletion();
                    winner.innerText = 'Draw'
                }
            }
    }

    nextPlayer = (value) => value === 'X' ? player = 'O' : player = 'X';

    onWriteValue = (event, value) => {
        // узнаём id элемента
        let numberElement = parseInt(event.target.dataset.index);

        // перебераем массив, записываем значение в него и ноду еслм поле пустое
        for (let i = 0; i < playngFieldData.length; i++) {
            if (i === numberElement && playngFieldData[i] === '') {
                playngFieldData[numberElement] = value;
                event.target.innerText = value;
                nextPlayer(value);
                isWinner(playngFieldData, value);
            }
        }
    }

    // обработчик клика по игровому полю
    handleClick = (event) => {
        onWriteValue(event, player);
    }

    renderItem = (id) => {
        const plaingField = document.getElementById('plaingField');

        // создаём элементы
        const item = document.createElement('li');
        const button = document.createElement('button');

        // добавляем классы data-index и хэндлер для кнопки
        item.className = "item";
        button.className = "button";
        button.dataset.index = id;
        button.onclick = handleClick;

        // добавляем кнопку в item, а item в список
        item.appendChild(button);
        plaingField.appendChild(item);
    };

    // строим поле с нужными id
    for (let i = 0; i < playngFieldData.length; i++) {
        renderItem(i);
    }
}
