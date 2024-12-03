document.addEventListener("DOMContentLoaded", () => {
    let openMenu = null;

    const reactionImages = [
        "../images/odnoklassniki_reactions/aaaaaaaaaa.png",
        "../images/odnoklassniki_reactions/angry.png",
        "../images/odnoklassniki_reactions/bro-said-he-doesnt-like-my-taste-in-music.png",
        "../images/odnoklassniki_reactions/bro-wtf.png",
        "../images/odnoklassniki_reactions/confused.png",
        "../images/odnoklassniki_reactions/curiouse.png",
        "../images/odnoklassniki_reactions/hehe.png",
        "../images/odnoklassniki_reactions/i-havent-slept-for-two-weeks.png",
        "../images/odnoklassniki_reactions/i-m-scared-of-ronimizy-to-check-my-csms-labs.png",
        "../images/odnoklassniki_reactions/in-love.png",
        "../images/odnoklassniki_reactions/just-a-cill-guy.png",
        "../images/odnoklassniki_reactions/kill-me-plz.png",
        "../images/odnoklassniki_reactions/literally-me.png",
        "../images/odnoklassniki_reactions/me-listening-radiohead.png",
        "../images/odnoklassniki_reactions/mewing.png",
        "../images/odnoklassniki_reactions/not-really-angry-but.png",
        "../images/odnoklassniki_reactions/not-satisfied-skuf.png",
        "../images/odnoklassniki_reactions/on-public-but-mentally-you-r-almost-dead.png",
        "../images/odnoklassniki_reactions/one-eye-guy.png",
        "../images/odnoklassniki_reactions/r-u-serious.png",
        "../images/odnoklassniki_reactions/sleep.png",
        "../images/odnoklassniki_reactions/so-happy-tomorrow-will-never-come.png",
        "../images/odnoklassniki_reactions/sumer-smile.png",
        "../images/odnoklassniki_reactions/tongue.png",
        "../images/odnoklassniki_reactions/why.png"
    ];

    const loadReactions = () => {
        const reactions = JSON.parse(localStorage.getItem("reactions")) || {};
        const reactionRows = document.querySelectorAll(".reaction");
        reactionRows.forEach((row, index) => {
            if (reactions[index]) {
                row.innerHTML = `<img src="${reactions[index]}" alt="Реакция" class="selected-reaction">`;
            }
        });
    };

    const saveReaction = (index, reaction) => {
        const reactions = JSON.parse(localStorage.getItem("reactions")) || {};
        reactions[index] = reaction;
        localStorage.setItem("reactions", JSON.stringify(reactions));
    };

    const createReactionMenu = (row, index) => {
        const menu = document.createElement("div");
        menu.classList.add("reaction-menu");
        menu.style.display = "none";

        reactionImages.forEach(image => {
            const img = document.createElement("img");
            img.src = image;
            img.alt = "Реакция";
            img.style.width = "30px";
            img.style.height = "30px";
            img.addEventListener("click", () => {
                row.innerHTML = `<img src="${image}" alt="Реакция" class="selected-reaction">`;
                saveReaction(index, image);
                menu.style.display = "none";
                openMenu = null;
            });
            menu.appendChild(img);
        });

        document.body.appendChild(menu);
        return menu;
    };

    const setupReactionRow = (row, index) => {
        row.style.position = "relative";
        const menu = createReactionMenu(row, index);

        row.addEventListener("click", (e) => {
            e.stopPropagation();
        
            if (openMenu && openMenu !== menu) {
                openMenu.style.display = "none";
            }
        
            if (menu.style.display === "flex") {
                menu.style.display = "none";
                openMenu = null;
            } else {
                const rect = row.getBoundingClientRect();
                const isMobile = window.innerWidth <= 768;

                const menuWidth = Math.min((30 * 8) + (5 * 7) + 10, window.innerWidth - 20);
        
                if (isMobile) {
                    menu.style.width = `${menuWidth}px`;
                    menu.style.left = "10px";
                    menu.style.right = "auto";
                } else {
                    menu.style.width = `${menuWidth}px`;
                    menu.style.right = `${window.innerWidth - rect.left}px`;
                }
        
                menu.style.top = `${rect.top + window.scrollY}px`;
                menu.style.display = "flex";
                openMenu = menu;
            }
        });
        
        document.addEventListener("click", (e) => {
            if (!menu.contains(e.target) && !row.contains(e.target)) {
                menu.style.display = "none";
                openMenu = null;
            }
        });
    };

    const initReactions = () => {
        const rows = document.querySelectorAll(".reaction");
        rows.forEach((row, index) => {
            setupReactionRow(row, index);
        });
    };

    loadReactions();
    initReactions();

    const observer = new MutationObserver(() => {
        initReactions();
    });

    observer.observe(document.querySelector(".table-container"), { childList: true });
});
