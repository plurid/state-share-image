const state = {
    app: {
        theme: 'night'
    }
}


const themes = ['night', 'gradient', 'light'];
const stateChangeButtons = document.querySelectorAll('.state-change-button');


buttonsListeners();


function buttonsListeners() {
    for (let stateChangeButton of stateChangeButtons) {
        stateChangeButton.addEventListener('click', handleStateChange);
    }
}


function handleStateChange() {
    const buttonName = 'state-change-button-';

    themes.map(theme => {
        const buttonTheme = buttonName + theme;

        if ([...this.classList].includes(buttonTheme)) {
            setTheme(theme);
            updatePreState(theme);
            updateState(theme);
            setButtons(theme);
            stateShare();
        }
    });
}


function setTheme(theme) {
    const themeName = `theme-${theme}`;
    document.body.classList = '';
    document.body.classList.add(themeName);
}


function updatePreState(theme) {
    const preTheme = document.getElementById('pre-theme');
    preTheme.textContent = theme;
}


function updateState(theme) {
    state.app.theme = theme;
}


function setState(stateString) {
    stateParsed = JSON.parse(stateString);
    // console.log(stateParsed);

    const theme = stateParsed.app.theme;

    setButtons(theme);
    setTheme(theme);
    updatePreState(theme);
    updateState(theme);
}


function updateStateShareImage(imageData) {
    const stateShareImg = document.querySelector('state-share-image img');
    stateShareImg.src = imageData;
}


async function stateShare() {
    const enc = await stateShareImage.encode(state);
    updateStateShareImage(enc);
}


window.addEventListener('stateshareimage', async (event) => {
    const dec = await stateShareImage.decode(event.detail);
    setState(dec);
});



function setButtons(theme) {
    const buttonName = '.state-change-button-';
    const stateActiveButton = buttonName + theme;
    const btn = document.querySelector(stateActiveButton);
    const activeButton = 'state-change-button-active';

    themes.map(th => {
        const buttonTheme = buttonName + th;

        for (let button of stateChangeButtons) {
            if (button !== btn) {
                button.classList.remove(activeButton);
            } else {
                btn.classList.add(activeButton);
            }
        }
    });
}
