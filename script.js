const terminalOutput = document.getElementById('output');
const inputField = document.getElementById('input');
const commands = ['about', 'contact', 'help', 'clear', 'whoami', 'gui', 'themes', 'time', 'github-repo'];
let commandHistory = [];
let historyIndex = -1;

function handleInput(event) {
    if (event.key === 'Enter') {
        const userInput = inputField.value.trim().toLowerCase();
        inputField.value = '';

        if (userInput) {
            commandHistory.unshift(userInput);
            historyIndex = -1;

            switch (userInput) {
                case 'about':
                    showOutput('<div class="about">Привет, я<b> zettiks</b>, недокодер и дизайнер . Обожаю телегу. Пишу ботов, делаю разные дизайны.</div>');
                    break;
                case 'contact':
                    showOutput('Связаться со мной можно в: <hr><br> Telegram: <a href="https://t.me/zettiks">[click]</a> <br> GitHub: <a href="https://github.com/zettiks">[click]</a>');
                    break;
                case 'help':
                    showOutput('Доступные команды: <br> <div class="command">- about [узнать кто этот зеттикс] <br> - contact [контакты с зеттиксом] <br> - help <br> - clear <br> - whoami [Кто ты такой?] <br> - themes [Список тем] <br></div><br> Используй <span class="command2">верхнюю стрелочку</span> что бы вернутся к предыдущей команде, Используй <span class="command2"><b>Tab</b></span> что бы автоматически подставить следующую команду.');
                    break;
                case 'clear':
                    clearOutput();
                    break;
                case 'whoami':
                    getIPAddress();
                    break;
                case 'themes':
                    showThemes();
                    break;
                case '1488'
                    showOutput('Я ЛЮБЛЮ КРИСТИНКУУУ<33')
                    break;
                default:
                    if (userInput.startsWith('theme set')) {
                        setTheme(userInput.substring('theme set'.length).trim());
                    } else {
                        showOutput(`Команда не распознана: ${userInput}`);
                    }
            }
        }
    } else if (event.key === 'Tab') {
        autocompleteCommand();
        event.preventDefault();
    } else if (event.key === 'ArrowUp') {
        navigateCommandHistory(1);
    } else if (event.key === 'ArrowDown') {
        navigateCommandHistory(-1);
    }
}

function showOutput(message) {
    terminalOutput.innerHTML += `<br><div>${message}</div>`;
    terminalOutput.scrollTop = terminalOutput.scrollHeight;
}

function clearOutput() {
    terminalOutput.innerHTML = '';
}

function autocompleteCommand() {
    const userInput = inputField.value.trim().toLowerCase();
    const partialCommand = userInput.split(' ')[0];

    if (partialCommand.length > 0) {
        const matchingCommands = commands.filter(command => command.startsWith(partialCommand));

        if (matchingCommands.length === 1) {
            inputField.value = matchingCommands[0];
        } else if (matchingCommands.length > 1) {
            showOutput('Доступные команды: ' + matchingCommands.join(', '));
        }
    }
}

async function getIPAddress() {
    try {
        const response = await fetch('https://api.sypexgeo.net/');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        const country = data.country.name_ru || 'Страна не определена';
        const city = data.city.name_ru || 'Город не определен';
        const ip = data.ip || 'IP не определен';
        showOutput(`Ты пользователь, твой IP-адрес: скрыт, ${country}, ${city}`);
    } catch (error) {
        showOutput('Твой айпи скрыт. Ты анонимен');
        console.error('Error fetching IP address:', error);
    }
}


function navigateToPage(page) {
    window.location.href = page;
}

function navigateCommandHistory(direction) {
    if (commandHistory.length === 0) {
        return;
    }

    historyIndex += direction;

    if (historyIndex < -1) {
        historyIndex = -1;
    } else if (historyIndex >= commandHistory.length) {
        historyIndex = commandHistory.length - 1;
    }

    inputField.value = historyIndex === -1 ? '' : commandHistory[historyIndex];
}

function showThemes() {
    showOutput('Доступные темы: <br> - light <br> - dark <br> - ubuntu <br> - powershell <br> <p>Используй: theme set [название темы] что-бы выбрать тему<br> Пример: theme set ubuntu</p>');
}

function setTheme(themeName) {
    const body = document.body;

    // Remove previous themes
    body.classList.remove('theme-light', 'theme-dark', 'theme-ubuntu', 'theme-powershell');

    switch (themeName) {
        case 'light':
            body.classList.add('theme-light');
            break;
        case 'dark':
            body.classList.add('theme-dark');
            break;
        case 'ubuntu':
            body.classList.add('theme-ubuntu');
            break;
        case 'powershell':
            body.classList.add('theme-powershell');
            break;
        default:
            showOutput(`Неизвестная тема.: ${themeName}`);
    }
}

setInterval(function(){ window.scrollBy(0,1000); }, 1000)
