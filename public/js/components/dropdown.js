
    // JavaScript for dropdown functionality
    document.querySelectorAll('.dropbtn').forEach(button => {
      button.addEventListener('click', () => {
        button.nextElementSibling.style.display = button.nextElementSibling.style.display === 'block' ? 'none' : 'block';
      });
    });
