/* Gallery */

new Gallery(document.getElementById('gallery'), {
    margin: 10
});

/* Burger */

const BODY_BURGER_OPENED = 'body_burger-opened';

const bodyNode = document.querySelector('body');
const burgerControlNode = document.querySelector('.burger-menu__control');
// console.log(burgerControlNode); // перевірка чи є клас для контроля
const burgerSpaceCoverNode = document.querySelector('.cover-space__burger');

burgerControlNode.addEventListener('click', (_event) => {
    if(bodyNode.classList.contains(BODY_BURGER_OPENED)) {
        bodyNode.classList.remove(BODY_BURGER_OPENED);
    } else {
        bodyNode.classList.add(BODY_BURGER_OPENED);
    }
    // burgerNode.classList.toggle(MENU_OPENED_CLASS);
});

// якщо вікно бургера відкрите, то клікнувши закриваємо його
burgerSpaceCoverNode.addEventListener('click', (_event) => {
    bodyNode.classList.remove(BODY_BURGER_OPENED);
});


// Sticky header functionality appearence

const HEADER_SCROLLED = 'header_scrolled';
const headerNode = document.querySelector('.header');
const styckyStartScroll = 20;

window.addEventListener('scroll', () => {
    if(
        window.scrollY >= 20 
        && !headerNode.classList.contains(HEADER_SCROLLED)
    ) {
        headerNode.classList.add(HEADER_SCROLLED);
    } else if (
        window.scrollY < 20 
        && headerNode.classList.contains(HEADER_SCROLLED)
    ) {
        headerNode.classList.remove(HEADER_SCROLLED);
    }
    
});