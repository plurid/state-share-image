const state = {
    app: {
        theme: 'night'
    }
}


const themes = ['night', 'gradient', 'light']
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
        // const activeButton = 'state-change-button-active';

        // for (let button of stateChangeButtons) {
        //     if (button !== this) {
        //         button.classList.remove(activeButton);
        //     }
        // }

        if ([...this.classList].includes(buttonTheme)) {
            // this.classList.add(activeButton);
            setTheme(theme);
            updatePreState(theme);
            updateState(theme);
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
    // console.log(stateShareImg);
    stateShareImg.src = imageData;
}


async function stateShare() {
    const enc = await stateShareImage.encode(state);
    updateStateShareImage(enc);
    // const stateShareImg = docum/ent.querySelector('state-share-image');
    // console.log('bbbb');
    // stateShareImg.src = enc;
    // console.log(enc);
    const dec = await stateShareImage.decode(enc);
    setState(dec);
    // console.log('DECODED', dec);


    // const a = await stateShareImage.decode('');
    // console.log(a);
}


window.addEventListener('stateshareimage', async (event) => {
    const dec = await stateShareImage.decode(event.detail);
    // console.log(dec);
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
