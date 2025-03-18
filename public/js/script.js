//Cache
const navToggle = document.querySelector('.mobile-nav-toggle');
const primaryNav = document.querySelector('.primaryNav');

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


