document.addEventListener("DOMContentLoaded", () => {
    const apiUrl = "https://randomuser.me/api/";
    const localStorageKey = "userData";

    const loadingVideoContainer = document.getElementById("loading-video-container");
    const loadingVideo = document.getElementById("loading-video");
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

    const playLoadingVideo = () => {
        return new Promise((resolve) => {
            loadingVideoContainer.style.display = "flex";
            mainContent.style.display = "none";

            loadingVideo.currentTime = 0;
            loadingVideo.muted = false;
            loadingVideo.play();

            setTimeout(() => {
                resolve();
            }, 2000);
        });
    };

    const stopLoadingVideo = () => {
        loadingVideoContainer.style.display = "none";
        mainContent.style.display = "block";

        loadingVideo.pause();
        loadingVideo.currentTime = 0;
        loadingVideo.muted = true;
    };

    const getUserData = async () => {
        let userData = localStorage.getItem(localStorageKey);

        if (!userData) {
            console.log("Данные отсутствуют в localStorage. Начинается загрузка...");

            const [data] = await Promise.all([fetchData(), playLoadingVideo()]);
            stopLoadingVideo();
            return data;
        } else {
            console.log("Данные найдены в localStorage.");
            stopLoadingVideo();
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
