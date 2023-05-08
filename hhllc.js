            function toggle_submenu() {
                var x = document.getElementById("sub_menu");
                if (x.style.display === "block") {
                    x.style.display = "none";
                } else {
                    x.style.display = "block";
                }
            }

            function toggle_menu() {
                var x = document.getElementById("nav-links");
                if (x.style.display === "block") {
                    x.style.display = "none";
                    document.getElementById("sub_menu").style.display = "none";
                } else {
                    x.style.display = "block";
                }
            }

            const hamMenu = document.querySelector('#menu');
            hamMenu.addEventListener('click', () => {
                toggle_menu();
            });

            const subMenu = document.querySelector('#sub_opener');
            subMenu.addEventListener('click', () => {
                toggle_submenu();
            });
