// шукаємо елементи на сторінці
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
