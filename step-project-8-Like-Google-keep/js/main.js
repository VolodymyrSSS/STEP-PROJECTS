// шукаємо елементи форми на сторінці
const addNodeForm = document.querySelector('#addNoteForm');
const noteTitleInput = document.querySelector('#noteTitleInput');
const noteTextInput = document.querySelector('#noteTextInput');
const formTextRemovable = document.querySelector('.form__text-removable');
const cardsWrapper = document.getElementsByClassName('main__cards-wrapper')[0]; // якщо використовується метод "getElementsByClassName" то повертається масив значень а тому потрібно додавати на той момент єдине значення масиву під індексом "[0]"
const noNotesMessage = document.getElementsByClassName('no-notes-message')[0];

// створюємо початковий масив нотаток але через "let" бо можемо застосовувати методи які можуть модифікувати оригінальний масив типу: .filter(), .sort() і т.д.
let notes = [
	{
		id: 1,
		title: 'Основи JS',
		text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc consectetur hendrerit elementum.',
	},
	{
		id: 2,
		title: 'DOM-дерево',
		text: 'Sed tristique quam sed tempus pretium. Ut et volutpat nisl, vitae suscipit arcu.',
	},
	{
		id: 3,
		title: 'Події в JS',
		text: 'Sed rutrum, orci at luctus varius, lacus turpis porta dui, quis pretium sem odio eget mi. Pellentesque ut faucibus elit.',
	},
];

function checkNotesEmpty() {
	if (notes.length === 0) {
		noNotesMessage.style.display = 'block'; // Показуєм повідомлення
	} else {
		noNotesMessage.style.display = 'none'; // Сховане повідомлення
	}
}

// Call this function on initial load as well
document.addEventListener('DOMContentLoaded', checkNotesEmpty);

// слухаємо за змінами в формі
addNodeForm.addEventListener('submit', (event) => {
	event.preventDefault(); // відміняєм стандартну відправку форми

	// додаємо нотатку
	notes.push({
		id: notes[notes.length - 1]['id'] + 1,
		title: noteTitleInput.value,
		text: noteTextInput.textContent,
	});

	noteTitleInput.value = ''; // очищаэмо поле вводу заголовку нотатки
	noteTextInput.textContent = ''; // очищаємо поле вводу тексту нотатки
	formTextRemovable.textContent = 'The text of the note'; // повертаєм попередній placeholder
	noteTitleInput.focus(); // повертаєм фокус

	const lastNote = notes[notes.length - 1]; // визначаємо останній доданий елемент масиву
	// визначаєм як виглядає останній доданий елемент та куда його додавати на сторінку
	const elem = `<section class="card text-bg-warning mb-3" style="max-width: 18rem;">
						<div class="card-body">
							<h5 class="card-title">${lastNote.title}</h5>
							<p class="card-text">
								${lastNote.text}
							</p>
							<button type="button" class="btn btn-outline-danger btn-sm float-end" data-action="delete" data-id="${lastNote.id}">Delete</button>
						</div>
					</section>`;

	cardsWrapper.insertAdjacentHTML('afterbegin', elem);
});

// визначаєм як виглядатимуть нотатки та куда їх додавати на сторінку
notes.forEach((item, id) => {
	const elem = `<section class="card text-bg-warning mb-2" style="max-width: 18rem;">
						<div class="card-body">
							<h5 class="card-title">${item.title}</h5>
							<p class="card-text">
								${item.text}
							</p>
							<button type="button" class="btn btn-outline-danger btn-sm float-end" data-action="delete" data-id="${id}">Delete</button>
						</div>
					</section>`;

	cardsWrapper.insertAdjacentHTML('afterbegin', elem);
});

// видалення нотатки зі сторінки
document.addEventListener('click', (event) => {
	console.log(event.target);

	if (event.target.dataset.action === 'delete') {
		const id = event.target.dataset.id; // уважно! тут отримаємо рядковий символ а не число

		// видаляємо нотатку з масиву по індексу, що не змінює оригінальний масив
		const deletedItemIndex = notes.findIndex((item) => item.id == id); // нестроге порівняння бо тут "id" може бути текстовим символом а "item.id" є число
		notes.splice(deletedItemIndex, 1);

		// альтернативне видалення нотаток з масиву через .filter(), який змінює ориг масив
		// notes = notes.filter((item) => item.id != id); // нестроге порівняння рядка і числа

		// видаляємо нотатку зі сторінки
		event.target.closest('.card').remove();

		checkNotesEmpty();
	}
});
