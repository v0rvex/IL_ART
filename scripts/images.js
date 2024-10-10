document.addEventListener('DOMContentLoaded', () => {
    const imagesContainer = document.getElementById('images_container');
    const loadMoreButton = document.getElementById('load_more');
    const images = []; // Массив ссылок на изображения
    let currentIndex = 0;
    const imagesPerLoad = 30; // Количество изображений для загрузки за один раз
  
    // Добавляем ссылки на изображения из папки 'Images'
    for (let i = 1; i <= 90; i++) {
      images.push(`Images/image${i}.png`); // Предполагается, что изображения названы 'image1.jpg', 'image2.jpg' и т.д.
    }
  
    function loadImages() {
      const nextImages = images.slice(currentIndex, currentIndex + imagesPerLoad);
      nextImages.forEach(src => {
        const img = document.createElement('img');
        img.src = src;
        img.alt = 'Gallery Image';
        img.classList.add('gallery-image');
        imagesContainer.appendChild(img); // Вставляем изображение перед кнопкой
      });
  
      currentIndex += nextImages.length;
  
      // Если изображений больше нет, скрываем кнопку
      if (currentIndex >= images.length) {
        loadMoreButton.style.display = 'none';
      }
    }
  
    // Загрузка изображений при нажатии на кнопку
    loadMoreButton.addEventListener('click', loadImages);
  
    // Начальная загрузка
    loadImages();
  });
  