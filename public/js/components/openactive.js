//      $('.nav-item .dropdown-container a').each(function() {
//   if ($(this).hasClass('active')) {
//     $(this).parents(".dropdown-container").css('display', 'block');
//   }
// })
// Select all anchor elements inside `.nav-item .dropdown-container`
document.querySelectorAll('.nav-item .dropdown-container a').forEach((link) => {
    // Check if the anchor has the 'active' class
    if (link.classList.contains('active')) {
        // If it does, set the display style of its nearest .dropdown-container parent to 'block'
        link.closest('.dropdown-container').style.display = 'block';
    }
});
