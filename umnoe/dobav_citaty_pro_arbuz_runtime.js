document.addEventListener("DOMContentLoaded", () => {
    const addQuoteButton = document.getElementById("addQuoteButton");
    const gifOverlay = document.getElementById("gifOverlay");
    const gifAudio = document.getElementById("gifAudio");
    const formOverlay = document.getElementById("formOverlay");
    const closeFormButton = document.getElementById("closeFormButton");
    const submitQuoteButton = document.getElementById("submitQuoteButton");
    const quoteInput = document.getElementById("quoteInput");
    const linkInput = document.getElementById("linkInput");
    const quoteTable = document.querySelector(".table-container");

    function loadQuotes() {
        const quotes = JSON.parse(localStorage.getItem("quotes")) || [];
        quotes.forEach(({ quote, link }) => {
            addRowToTable(quote, link);
        });
    }

    function addRowToTable(quote, link) {
        const quoteRow = document.createElement("div");
        quoteRow.classList.add("table-row");
        quoteRow.textContent = `${quote}`;

        const linkRow = document.createElement("div");
        linkRow.classList.add("table-row");
        linkRow.innerHTML = `<a href="${link}" target="_blank">${link}</a>`;

        quoteTable.appendChild(quoteRow);
        quoteTable.appendChild(linkRow);
    }

    addQuoteButton.addEventListener("click", () => {
        gifOverlay.style.display = "flex";
        gifAudio.play();

        setTimeout(() => {
            gifOverlay.style.display = "none";
            formOverlay.style.display = "flex";

            gifAudio.pause();
            gifAudio.currentTime = 0;
        }, 2000);
    });

    closeFormButton.addEventListener("click", () => {
        formOverlay.style.display = "none";
    });

    submitQuoteButton.addEventListener("click", () => {
        const quote = quoteInput.value.trim();
        const link = linkInput.value.trim();

        if (quote && link) {
            addRowToTable(quote, link);

            const quotes = JSON.parse(localStorage.getItem("quotes")) || [];
            quotes.push({ quote, link });
            localStorage.setItem("quotes", JSON.stringify(quotes));

            quoteInput.value = "";
            linkInput.value = "";
            formOverlay.style.display = "none";
        } else {
            alert("Все поля обязательны для заполнения!");
        }
    });

    loadQuotes();
});
