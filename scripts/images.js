document.addEventListener('DOMContentLoaded', () => {
    const imagesContainer = document.getElementById('images_container');
    const loadMoreButton = document.getElementById('load_more');
    const modal = document.getElementById('modal');
    const modalImage = document.getElementById('modal_image');
    const closeModal = document.getElementsByClassName('close')[0];
    let images = []; // Массив ссылок на изображения, который мы заполним из JSON
    let currentIndex = 0;
    const imagesPerLoad = 30; // Количество изображений для загрузки за один раз
    const jsonUrl = 'https://raw.githubusercontent.com/v0rvex/il-art/refs/heads/main/image_list.json'; // URL к JSON файлу

    // Функция для загрузки JSON файла с изображениями
    function loadJson() {
        return fetch(jsonUrl)
            .then(response => response.json())
            .then(data => {
                images = data.map(item => item.path);
                console.log(images); // Извлекаем ссылки на изображения из JSON
            })
            .catch(error => {
                console.error('Ошибка при загрузке JSON:', error);
            });
    }

    // Функция для открытия модального окна
    function openModal(src) {
        modal.style.display = 'block';
        modalImage.src = src;
        
        // Вычисление отступов для центрирования изображения
        centerModalImage(modalImage);
    }

    // Функция для центрации модального изображения
    function centerModalImage(image) {
        image.onload = function() { // Дождемся загрузки изображения
            const modalWidth = modal.clientWidth;
            const modalHeight = modal.clientHeight;
            const imageWidth = image.clientWidth;
            const imageHeight = image.clientHeight;

            const topMargin = (modalHeight - imageHeight) / 2;
            const leftMargin = (modalWidth - imageWidth) / 2;

            image.style.marginTop = `${topMargin}px`;
            image.style.marginLeft = `${leftMargin}px`;
            image.style.maxWidth = '90%'; // Максимальная ширина
            image.style.maxHeight = '90%'; // Максимальная высота
        };
    }

    // Функция для закрытия модального окна
    closeModal.onclick = function() {
        modal.style.display = 'none';
    };

    // Закрытие модального окна при клике вне изображения
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    };

    // Функция для загрузки изображений
    function loadImages() {
        const nextImages = images.slice(currentIndex, currentIndex + imagesPerLoad);
        nextImages.forEach(src => {
            const img = document.createElement('img');
            img.src = src;
            img.alt = '';
            img.classList.add('gallery-image');
            imagesContainer.appendChild(img); // Добавляем изображение в контейнер

            // Добавляем событие клика для открытия модального окна
            img.addEventListener('click', () => openModal(src));
        });

        currentIndex += nextImages.length;

        // Если изображений больше нет, скрываем кнопку
        if (currentIndex >= images.length) {
            loadMoreButton.style.display = 'none';
        }
    }

    // Загрузка изображений при нажатии на кнопку
    loadMoreButton.addEventListener('click', loadImages);

    // Изначальная загрузка JSON и начальная загрузка изображений
    loadJson().then(loadImages);
});
