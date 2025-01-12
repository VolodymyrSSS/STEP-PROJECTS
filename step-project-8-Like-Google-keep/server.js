// імпортуємо бібліотеку express для створення сервера
const express = require('express');
const path = require('path');
const app = express();

// обробляємо статичні файли з кореня проекту
app.use(express.static(path.join(__dirname)));

// Обробляємо кожен маршрут що визначений в script файлу index.html
app.get('*', function (request, response) {
	response.sendFile(path.resolve(__dirname, 'index.html'));
});

// визначаємо порт для запуску сервера
const port = process.env.PORT || 5500;
app.listen(port, () => {
	console.log(`Server running on http://localhost:${port}`);
});
