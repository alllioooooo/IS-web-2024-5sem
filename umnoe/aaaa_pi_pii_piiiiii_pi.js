document.addEventListener("DOMContentLoaded", () => {
    const apiUrl = "https://randomuser.me/api/";
    const localStorageKey = "userData";

    const loadingVideoContainer = document.getElementById("loading-video-container");
    const loadingGif = document.getElementById("loading-gif");
    const loadingAudio = document.getElementById("loading-audio");
    const mainContent = document.querySelector(".main-content");

    const fetchData = async () => {
        try {
            console.log("Начинается загрузка данных с API...");
            const response = await fetch(apiUrl);
            const data = await response.json();
            localStorage.setItem(localStorageKey, JSON.stringify(data.results[0]));
            console.log("Данные успешно загружены:", data.results[0]);
            return data.results[0];
        } catch (error) {
            console.error("Ошибка загрузки данных:", error);
            return null;
        }
    };

    const playLoadingAnimation = async () => {
        loadingVideoContainer.style.display = "flex";
        mainContent.style.display = "none";

        const gifSrc = loadingGif.src;
        loadingGif.src = "";
        loadingGif.src = gifSrc;
        loadingGif.style.display = "block";

        loadingAudio.currentTime = 0;
        try {
            await loadingAudio.play();
        } catch (error) {
            console.error("Ошибка воспроизведения аудио:", error);
        }

        return new Promise((resolve) => setTimeout(resolve, 1800));
    };

    const stopLoadingAnimation = () => {
        loadingVideoContainer.style.display = "none";
        mainContent.style.display = "block";

        loadingGif.style.display = "none";

        loadingAudio.pause();
        loadingAudio.currentTime = 0;
    };

    const getUserData = async () => {
        let userData = localStorage.getItem(localStorageKey);

        if (!userData) {
            console.log("Данные отсутствуют в localStorage. Начинается загрузка...");
            await playLoadingAnimation();

            const data = await fetchData();
            stopLoadingAnimation();
            return data;
        } else {
            console.log("Данные найдены в localStorage.");
            stopLoadingAnimation();
            return JSON.parse(userData);
        }
    };

    const renderUserData = (data) => {
        if (!data) {
            console.error("Не удалось загрузить данные пользователя.");
            return;
        }

        const container = document.querySelector(".container");
        container.innerHTML = `
            <div class="user-profile">
                <img src="${data.picture.large}" alt="User Picture" class="user-picture">
                <h2>${data.name.first} ${data.name.last}</h2>
                <p><strong>ПО4ТА:</strong> ${data.email}</p>
                <p><strong>Адрес:</strong> ${data.location.street.number} ${data.location.street.name}, ${data.location.city}, ${data.location.state}, ${data.location.country}</p>
                <p><strong>НИКНЕЙМ В АСЬКЕ:</strong> ${data.login.username}</p>
                <p>
                    <strong>Пöрöль:</strong> 
                    <span id="password" class="password" data-password="${data.login.password}">••••••••</span>
                </p>
                <button id="logout" class="registration">Выход</button>
            </div>
        `;

        const passwordElement = document.getElementById("password");
        passwordElement.addEventListener("mouseover", () => {
            passwordElement.textContent = passwordElement.dataset.password;
        });
        passwordElement.addEventListener("mouseout", () => {
            passwordElement.textContent = "••••••••";
        });

        const logoutButton = document.getElementById("logout");
        logoutButton.addEventListener("click", () => {
            localStorage.removeItem(localStorageKey);
            window.location.href = "../index.html";
        });
    };

    (async () => {
        const userData = await getUserData();
        renderUserData(userData);
    })();
});
