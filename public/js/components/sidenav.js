
// const $ac = $('.is-active');
// const $menu = $('.side-navbar');

// $(document).mouseup(e => {
//     if (!$menu.is(e.target) &&
//         $menu.has(e.target).length === 0) {
//         $menu.removeClass('is-active');

//     }


// });

// $('.toggle-hamburger').on('click', () => {
//     $menu.toggleClass('is-active');
// });
// Select elements
const menu = document.querySelector('.sideNavbar');
const toggleHamburger = document.querySelector('.toggleHamburger');

// Close menu when clicking outside of it
document.addEventListener('mouseup', (e) => {
    if (!menu.contains(e.target)) {
        menu.classList.remove('isActive');
    }
});

// Toggle menu visibility when clicking the hamburger icon
toggleHamburger.addEventListener('click', () => {
    menu.classList.toggle('isActive');
});

menu.querySelectorAll("li").forEach((item) => {
  item.addEventListener("click", () => {
    item.classList.toggle("open");
  });
});