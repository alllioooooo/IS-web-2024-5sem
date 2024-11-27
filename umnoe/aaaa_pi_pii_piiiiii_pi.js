document.addEventListener("DOMContentLoaded", () => {
    const apiUrl = "https://randomuser.me/api/";
    const localStorageKey = "userData";
    const audio = document.getElementById("loading-audio");

    const showLoading = () => {
        const loadingContainer = document.getElementById("loading-video-container");
        const loadingGif = document.getElementById("loading-gif");

        loadingContainer.style.display = "flex";
        loadingGif.style.display = "block";
        document.querySelector(".main-content").style.display = "none";
    };

    const hideLoading = () => {
        const loadingContainer = document.getElementById("loading-video-container");
        const loadingGif = document.getElementById("loading-gif");

        loadingContainer.style.display = "none";
        loadingGif.style.display = "none";
        document.querySelector(".main-content").style.display = "block";

        if (!audio.paused) {
            audio.pause();
            audio.currentTime = 0;
        }
    };

    const playAudio = () => {
        if (audio.paused) {
            audio.currentTime = 0;
            audio.play().catch((error) => {
                console.error("Ошибка воспроизведения аудио:", error);
            });
        }
    };

    const fetchData = async () => {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000);

        try {
            const response = await fetch(apiUrl, { signal: controller.signal });
            clearTimeout(timeoutId);
            if (!response.ok) {
                throw new Error(`Ошибка HTTP: ${response.status}`);
            }
            const data = await response.json();
            localStorage.setItem(localStorageKey, JSON.stringify(data.results[0]));
            return data.results[0];
        } catch (error) {
            console.error("Ошибка загрузки данных:", error);
            return null;
        }
    };

    const getUserData = async () => {
        let userData = localStorage.getItem(localStorageKey);

        if (!userData) {
            console.log("Данные отсутствуют в localStorage. Загружаем...");
            showLoading();
            playAudio();
            const data = await fetchData();
            await hideLoading();
            return data;
        }

        try {
            const parsedData = JSON.parse(userData);
            if (parsedData.name && parsedData.email && parsedData.location) {
                console.log("Данные найдены в localStorage.");
                return parsedData;
            } else {
                throw new Error("Некорректные данные в localStorage");
            }
        } catch (error) {
            console.error("Ошибка чтения данных из localStorage:", error);
            localStorage.removeItem(localStorageKey);
            showLoading();
            playAudio();
            const data = await fetchData();
            await hideLoading();
            return data;
        }
    };

    const renderUserData = (data) => {
        if (!data) {
            document.querySelector(".container").innerHTML = `
                <p class="error-message">Не удалось загрузить данные пользователя. Попробуйте обновить страницу.</p>
            `;
            return;
        }

        document.querySelector(".user-picture").src = data.picture.large;
        document.querySelector(".user-name").textContent = `${data.name.first} ${data.name.last}`;
        document.querySelector(".user-email").textContent = data.email;
        document.querySelector(".user-address").textContent = 
            `${data.location.street.number} ${data.location.street.name}, ${data.location.city}, ${data.location.state}, ${data.location.country}`;
        document.querySelector(".user-username").textContent = data.login.username;

        const passwordElement = document.getElementById("password");
        passwordElement.dataset.password = data.login.password;

        passwordElement.addEventListener("mouseover", () => {
            passwordElement.textContent = passwordElement.dataset.password;
        });
        passwordElement.addEventListener("mouseout", () => {
            passwordElement.textContent = "••••••••";
        });

        document.getElementById("logout").addEventListener("click", () => {
            localStorage.removeItem(localStorageKey);
            window.location.href = "../index.html";
        });
    };

    (async () => {
        const userData = await getUserData();
        renderUserData(userData);
    })();
});
