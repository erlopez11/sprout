//Cache
const navToggle = document.querySelector('.mobile-nav-toggle');
const primaryNav = document.querySelector('.primaryNav');
const flashMessage = document.querySelector('.flashMessage');

// Event Listeners

navToggle.addEventListener('click', () => {
    const visible = primaryNav.getAttribute('data-visible');

    if (visible === 'false') {
        primaryNav.setAttribute('data-visible', true);
        navToggle.setAttribute('aria-expanded', true);
    } else {
        primaryNav.setAttribute('data-visible', false);
        navToggle.setAttribute('aria-expanded', false);
    }
});

if (flashMessage) {
    setTimeout(() => {
        flashMessage.style.transition = 'opacity 0.5s';
        flashMessage.style.opacity = '0';
    }, 2000)
}
