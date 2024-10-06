const formStarter = document.querySelector('.form__starter');
const formContent = document.querySelector('.form__content');
const formTitle = document.querySelector('.form__title');
const formText = document.querySelector('.form__text');

formStarter.onclick = () => {
	console.log('working');
	// перемикаємо клас'd-none' щоб показувати чи скривати вміст форми
	formContent.classList.toggle('d-none');
	formTitle.focus();

	formTitle.addEventListener('keydown', (event) => {
		if (event.key === 'Enter') {
			event.preventDefault(); // щоб позбутись пустого рядка
			formText.focus();
			formText.innerText = '';
		}
	});
};

// шукаємо елементи форми на сторінці
const addNodeForm = document.querySelector('#addNoteForm');
const noteTextInput = document.querySelector('#noteText');
const cardsWrapper = document.getElementsByClassName('main__cards-wrapper')[0]; // якщо використовується метод "getElementsByClassName" то повертається масив значень а тому потрібно додавати єдине значення масиву під індексом "[0]"

// створюємо початковий масив нотаток
const notes = ['Основи JS', 'DOM-дерево', 'Події в JS'];

// слухаємо за змінами в формі
addNodeForm.addEventListener('submit', (event) => {
	event.preventDefault(); // відміняєм стандартну відправку форми
	notes.push(noteTextInput.value); // додаємо нотатку
	noteTextInput.value = ''; // очищаємо поле вводу
	const lastNote = notes[notes.length - 1]; // визначаємо останній доданий елемент масиву
	// на сторінку додаєм останню додану нотатку на початок
	const elem = `<section class="card">
						<div class="card-body">
							<p class="card-text">
								${lastNote}
							</p>
						</div>
					</section>`;

	cardsWrapper.insertAdjacentHTML('afterbegin', elem);
});

// визначаєм як додавати на сторінку html-розмічену нотатку в потрібному місці
notes.forEach((item) => {
	const elem = `<section class="card">
						<div class="card-body">
							<p class="card-text">
								${item}
							</p>
						</div>
					</section>`;

	cardsWrapper.insertAdjacentHTML('afterbegin', elem);
});

// https://www.youtube.com/watch?v=gooOJGDfmt4&ab_channel=%D0%92%D0%B5%D0%B1%D0%9A%D0%B0%D0%B4%D0%B5%D0%BC%D0%B8%7C%D0%AE%D1%80%D0%B8%D0%B9%D0%9A%D0%BB%D1%8E%D1%87%D0%B5%D0%B2%D1%81%D0%BA%D0%B8%D0%B9
