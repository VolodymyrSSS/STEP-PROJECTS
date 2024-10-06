// шукаємо елементи форми на сторінці
const addNodeForm = document.querySelector('#addNoteForm');
const noteTitleInput = document.querySelector('#noteTitleInput');
const noteTextInput = document.querySelector('#noteTextInput');
const formTextRemovable = document.querySelector('.form__text-removable');
const cardsWrapper = document.getElementsByClassName('main__cards-wrapper')[0]; // якщо використовується метод "getElementsByClassName" то повертається масив значень а тому потрібно додавати на той момент єдине значення масиву під індексом "[0]"
// const formTextRemovable = document.querySelector('.form__text-removable');

// створюємо початковий масив нотаток
const notes = [
	{
		title: 'Основи JS',
		text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc consectetur hendrerit elementum.',
	},
	{
		title: 'DOM-дерево',
		text: 'Sed tristique quam sed tempus pretium. Ut et volutpat nisl, vitae suscipit arcu.',
	},
	{
		title: 'Події в JS',
		text: 'Sed rutrum, orci at luctus varius, lacus turpis porta dui, quis pretium sem odio eget mi. Pellentesque ut faucibus elit.',
	},
];

// слухаємо за змінами в формі
addNodeForm.addEventListener('submit', (event) => {
	event.preventDefault(); // відміняєм стандартну відправку форми
	notes.push({
		title: noteTitleInput.value,
		text: noteTextInput.textContent,
	}); // додаємо нотатку

	noteTitleInput.value = ''; // очищаэмо поле вводу заголовку нотатки
	noteTextInput.textContent = ''; // очищаємо поле вводу тексту нотатки
	formTextRemovable.textContent = 'The text of the note'; // повертаєм попередній placeholder

	noteTitleInput.focus(); // повертаєм фокус

	const lastNote = notes[notes.length - 1]; // визначаємо останній доданий елемент масиву
	// на сторінку додаєм останню додану нотатку на початок
	const elem = `<section class="card text-bg-warning mb-3" style="max-width: 18rem;">
						<div class="card-body">
							<h5 class="card-title">${lastNote.title}</h5>
							<p class="card-text">
								${lastNote.text}
							</p>
						</div>
					</section>`;

	cardsWrapper.insertAdjacentHTML('afterbegin', elem);
});

// визначаєм як додавати на сторінку html-розмічену нотатку в потрібному місці
notes.forEach((item) => {
	const elem = `<section class="card text-bg-warning mb-3" style="max-width: 18rem;">
						<div class="card-body">
							<h5 class="card-title">${item.title}</h5>
							<p class="card-text">
								${item.text}
							</p>
						</div>
					</section>`;

	cardsWrapper.insertAdjacentHTML('afterbegin', elem);
});

// https://www.youtube.com/watch?v=gooOJGDfmt4&ab_channel=%D0%92%D0%B5%D0%B1%D0%9A%D0%B0%D0%B4%D0%B5%D0%BC%D0%B8%7C%D0%AE%D1%80%D0%B8%D0%B9%D0%9A%D0%BB%D1%8E%D1%87%D0%B5%D0%B2%D1%81%D0%BA%D0%B8%D0%B9
