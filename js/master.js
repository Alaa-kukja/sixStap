let landingPage = document.querySelector('.landing-page');

let imageArray = ['landing_1.jpg', 'landing_2.jpg', 'landing_3.jpg', 'landing_4.jpg', 'landing_7.jpg'];

let backgroundInterval;

let backgroundOption = true;

let navBulletsDiv = document.querySelector('.nav-bullets');
///////////////////////////////////////////// Local Storage processing /////////////////////////////////////////

///// Reset Option
document.querySelector('.reset-option').onclick = () => {
    localStorage.removeItem('color-option');
    localStorage.removeItem('background-option');
    localStorage.removeItem('landing-image');
    localStorage.removeItem('showBullets-option');

    window.location.reload();
};
//localStorage.clear();

///// Colors In Local Storage
let mainColors = localStorage.getItem('color-option');

if (mainColors !== null) {
    document.documentElement.style.setProperty('--main-color', mainColors);

    document.querySelectorAll('.colors-list li').forEach((ele) => {
        ele.classList.remove('active');
        if (ele.dataset.color == mainColors) {
            ele.classList.add('active');
        }
    });
}
///// Backgrounds In Local Storage
let mainBackground = localStorage.getItem('background-option');
let backgroundStopWithIt = localStorage.getItem('landing-image');
if (mainBackground !== null) {
    document.querySelectorAll('.random-background span').forEach((ele) => {
        ele.classList.remove('active');

        if (mainBackground === 'true') {
            backgroundOption = true;
            document.querySelector('.random-background .yes').classList.add('active');
        } else {
            backgroundOption = false;
            document.querySelector('.random-background .no').classList.add('active');
            landingPage.style.backgroundImage = backgroundStopWithIt;
        }
    });
}

///// Bullets In LocalStorage
let showBulletsOption = localStorage.getItem('showBullets-option');
if (showBulletsOption !== null) {
    document.querySelectorAll('.show-Bullets span').forEach((ele) => {
        ele.classList.remove('active');

        if (showBulletsOption === 'true') {
            document.querySelector('.show-Bullets .yes').classList.add('active');
            navBulletsDiv.classList.add('open');
        } else {
            document.querySelector('.show-Bullets .no').classList.add('active');
            navBulletsDiv.classList.remove('open');
        }
    });
}

///////////////////////////////////////////// End Local Storage processing /////////////////////////////////////////

///// Settings Box
let icon = document.querySelector('.icon');
let settingBox = document.querySelector('.settings-box');
icon.onclick = () => {
    icon.classList.toggle('fa-spin');
    settingBox.classList.toggle('open');
};

////// Landing Page

function randomizeImgs() {
    if (backgroundOption === true) {
        backgroundInterval = setInterval(() => {
            let randomNumber = Math.floor(Math.random() * imageArray.length);
            landingPage.style.backgroundImage = 'url("./images/' + imageArray[randomNumber] + '")';
        }, 1000);
    }
}
randomizeImgs();
/// Random main color
let colorsList = document.querySelectorAll('.colors-list li');
colorsList.forEach((li) => {
    li.addEventListener('click', (el) => {
        document.documentElement.style.setProperty('--main-color', el.target.dataset.color);
        localStorage.setItem('color-option', el.target.dataset.color);

        HandelActive(el);
    });
});

/// Random Background List
let randomBackgrounds = document.querySelectorAll('.random-background span');
randomBackgrounds.forEach((span) => {
    span.addEventListener('click', (el) => {
        HandelActive(el);

        if (el.target.dataset.option === 'yes') {
            backgroundOption = true;
            randomizeImgs();
            localStorage.setItem('background-option', true);
        } else {
            backgroundOption = false;
            clearInterval(backgroundInterval);
            localStorage.setItem('background-option', false);
            localStorage.setItem('landing-image', landingPage.style.backgroundImage);
        }
    });
});

/// Show Bullets List

let showBullets = document.querySelectorAll('.show-Bullets span');
showBullets.forEach((span) => {
    span.addEventListener('click', (el) => {
        HandelActive(el);

        if (el.target.dataset.option === 'yes') {
            navBulletsDiv.classList.remove('hide');
            localStorage.setItem('showBullets-option', true);
        } else {
            navBulletsDiv.classList.add('hide');
            localStorage.setItem('showBullets-option', false);
        }
    });
});

// Our Skills Section In Scrolling
let ourSkills = document.querySelector('.skills');

window.onscroll = function () {
    let skillsOffsetTop = ourSkills.offsetTop;

    let skillsOuterHeight = ourSkills.offsetHeight;

    let windowHeight = this.innerHeight;

    let windowScrollTop = this.pageYOffset;

    if (windowScrollTop > skillsOffsetTop + skillsOuterHeight - windowHeight) {
        //console.log('yyyyyyyyyyyyyyyyyyyyyyyyyyy');
        let skills = document.querySelectorAll('.skill-box .skill-progress span');
        skills.forEach((span) => {
            span.style.width = span.dataset.progress;
        });
    }
};

/// Our Gallery Popup
let Gallery = document.querySelectorAll('.gallery-imags img');

Gallery.forEach((img) => {
    img.addEventListener('click', (ele) => {
        // console.log(ele.target.src);
        //console.log(ele.target.alt);
        let popupOverlay = document.createElement('div');
        popupOverlay.classList.add('popup-overlay');
        document.body.appendChild(popupOverlay);

        // popup Box
        let popupBox = document.createElement('div');
        popupBox.classList.add('popup-box');

        if (img.alt !== null) {
            let heading = document.createElement('h3');
            let headingText = document.createTextNode(img.alt);
            heading.appendChild(headingText);
            popupBox.appendChild(heading);
        }
        let image = document.createElement('img');
        image.src = img.src;
        popupBox.appendChild(image);
        document.body.appendChild(popupBox);

        let closeButton = document.createElement('span');
        closeButton.classList.add('close-button');
        closeButton.appendChild(document.createTextNode('X'));
        popupBox.appendChild(closeButton);
    });
});

/// Close Popup
document.addEventListener('click', (e) => {
    // if(e.target.className == 'close-button')
    if (e.target.classList.contains('close-button')) {
        e.target.parentNode.remove();
        document.querySelector('.popup-overlay').remove();
    }
});

/// Nav Bullets Logic & HeadingLinks
let Bullets = document.querySelectorAll('.nav-bullets .bullet');
let Links = document.querySelectorAll('.links a');

function GoWithScroll(elements) {
    elements.forEach((element) => {
        element.addEventListener('click', (eve) => {
            eve.preventDefault();
            document.querySelector(eve.target.dataset.section).scrollIntoView({
                behavior: 'smooth',
            });
        });
    });
}

GoWithScroll(Bullets);
GoWithScroll(Links);

//// Handle Active Function
function HandelActive(eve) {
    eve.target.parentElement.querySelectorAll('.active').forEach((ele) => {
        ele.classList.remove('active');
    });
    eve.target.classList.add('active');
}

// Handle Toggle Menu
toggleBtn = document.querySelector('.toggle-menu');
let links = document.querySelector('.links');

links.onclick = (eve) => {
    eve.stopPropagation();
};

toggleBtn.onclick = function (eve) {
    eve.stopPropagation();
    this.classList.toggle('menu-active');
    links.classList.toggle('open');
};

// Handle When I press anywhere in the screen I Will close the toggle menu  If it was opening
document.addEventListener('click', (eve) => {
    if (eve.target !== toggleBtn && eve.target !== links) {
        if (links.classList.contains('open')) {
            links.classList.remove('open');
            toggleBtn.classList.remove('menu-active');
            //console.log('Menu Is Open');
        }
        //console.log(eve.target);
    }
});
