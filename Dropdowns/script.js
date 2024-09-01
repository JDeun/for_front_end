document.querySelectorAll(".dropdown-toggle").forEach(button => {
    button.addEventListener("click", () => {
        const dropdownMenu = button.nextElementSibling;
        dropdownMenu.classList.toggle("open");
        button.classList.toggle("open");
    });
});

document.querySelectorAll(".menu-item.dropdown").forEach(menuItem => {
    menuItem.addEventListener("mouseenter", () => {
        const submenu = menuItem.querySelector(".submenu");
        submenu.style.display = "flex";
    });

    menuItem.addEventListener("mouseleave", () => {
        const submenu = menuItem.querySelector(".submenu");
        submenu.style.display = "none";
    });
});
