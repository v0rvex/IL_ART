document.addEventListener('DOMContentLoaded', () => {
  const imagesContainer = document.getElementById('images_container');
  const loadMoreButton = document.getElementById('load_more');
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
              console.log(images)// Извлекаем ссылки на изображения из JSON
          })
          .catch(error => {
              console.error('Ошибка при загрузке JSON:', error);
          });
  }

  // Функция для загрузки изображений
  function loadImages() {
      const nextImages = images.slice(currentIndex, currentIndex + imagesPerLoad);
      nextImages.forEach(src => {
          const img = document.createElement('img');
          img.src = src;
          img.alt = 'Gallery Image';
          img.classList.add('gallery-image');
          imagesContainer.appendChild(img); // Добавляем изображение в контейнер
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
