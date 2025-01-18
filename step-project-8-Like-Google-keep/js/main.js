// шукаємо потрібні елементи на сторінці
import { createNoteHTML } from './noteStructure.js';
import {
	getAddNoteForm,
	getFormTextRemovable,
	getNoteTitleInput,
	getNoteTextInput,
	getCardsWrapper,
} from './common.js';

// Отримуєм\считуєм дані з locale storage при першому запуску
let notes = JSON.parse(localStorage.getItem('notes')) || [];

/* функція для динамічного створення та відображення чи приховання
	блоку з повідомленням "You have no notes!". Тут елемент 
	позиціонується абсолютно і доцільніше використовувати
 	visibility: hidden/visible оскільки це не впливатиме на зміщення
 	макета, що є кращим для абсолютно позиціонованих елементів */
export function checkNotesEmpty() {
	const cardsWrapper = getCardsWrapper(); // in this moment needs cardsWrapper

	let noNotesMessage = document.querySelector('.no-notes-message');

	if (!noNotesMessage) {
		noNotesMessage = document.createElement('h2');
		noNotesMessage.className =
			'no-notes-message h2 text-warning text-center mt-4 mb-4 position-absolute top-50 start-50 translate-middle';
		noNotesMessage.textContent = 'You have no notes!';
		cardsWrapper.appendChild(noNotesMessage);
	}

	noNotesMessage.style.visibility = notes.length === 0 ? 'visible' : 'hidden';
	noNotesMessage.style.opacity = notes.length === 0 ? '1' : '0';
}

// записуєм зміни (чи додану нотатку) в localStorage
export function saveNotesToLocalStorage() {
	localStorage.setItem('notes', JSON.stringify(notes));
}

// функція відображення\рендеру нотаток на сторінці
export function renderNotes() {
	const cardsWrapper = getCardsWrapper(); // in this moment needs cardsWrapper

	cardsWrapper.innerHTML = ''; // очищаєм поля від попередньої нотатки

	notes.forEach((note) => {
		const noteHTML = createNoteHTML(note, note.id); //створюєм нову нотатку із своїм id
		cardsWrapper.insertAdjacentHTML('afterbegin', noteHTML); // куда вставляти на сторінку
	});

	// перевірка стану на рішення відображення блоку з повідомленням "You have no notes!"
	checkNotesEmpty();
}

/* весь функціональний код запускається лише після підтвердження повного
 завантаження DOM за допомогою події DOMContentLoaded. Це гарантує, що всі
 елементи як от noteTitleInput, noteTextInput, інші доступні (вже завантажені)
*/
document.addEventListener('DOMContentLoaded', () => {
	const addNoteForm = getAddNoteForm();
	const noteTitleInput = getNoteTitleInput();
	const noteTextInput = getNoteTextInput();
	const formTextRemovable = getFormTextRemovable();

	renderNotes(); // викликаємо для відображення масиву нотаток

	/* завжди потрібно перевіряти значення елементу що не є null, бо коли код JS
	   виконується, існує ймовірність, що елемент HTML ще не доступний в DOM */
	if (addNoteForm) {
		// стежимо за змінами в формі
		addNoteForm.addEventListener('submit', (event) => {
			event.preventDefault(); // відміняєм стандартну відправку форми

			// визначаємо поля для створення нової нотатки
			const newNote = {
				// відлік id та поступове збільшення його для нових нотаток
				id: notes.length ? Math.max(...notes.map((n) => n.id)) + 1 : 1,
				// раніше було так
				// let id = notes.length > 0 ? notes[notes.length - 1].id + 1 : 1;
				title: noteTitleInput.value,
				text: noteTextInput.textContent,
			};

			notes.unshift(newNote); // додаємо на початок новостворену нотатку до масиву нотаток

			saveNotesToLocalStorage(); // збереження новоствореної нотатки в localStorage

			renderNotes(); // перерендер - відображення масиву з новою нотаткою

			noteTitleInput.value = ''; // очищаэмо поле вводу заголовку нотатки від нової

			noteTextInput.textContent = ''; // очищаємо поле вводу тексту нотатки від тексту нової

			formTextRemovable.textContent = 'The text of the note'; // повертаєм попередній placeholder

			noteTitleInput.focus(); // повертаєм фокус
		});
	}

	// слідкуєм за видаленням нотатки зі сторінки
	document.addEventListener('click', (event) => {
		if (event.target.dataset.action === 'delete') {
			// видалення нотатки по її id
			notes = notes.filter(
				(note) => note.id !== parseInt(event.target.dataset.id, 10) // одразу рядок перетворюєм на число
			);

			saveNotesToLocalStorage(); // зберігаємо зміни в localStorage

			renderNotes(); // перерендер - відображення масиву без видаленої нотатки

			/* або можна і так:
 			 const id = event.target.dataset.id; // уважно! тут отримаємо рядковий символ а не число
 			 видаляємо нотатку з масиву по індексу, методом що не змінює оригінальний масив

 			 const deletedItemIndex = notes.findIndex((item) => item.id == id); - тут нестроге порівняння бо "id" має значенням текстовий символом а "item.id" є число тому так

 			 if (deletedItemIndex > -1) {
 			  notes.splice(deletedItemIndex, 1); // видаляємо нотатку
 			  saveNotesToLocalStorage(); // записуємо зміни про видалену нотатку в localStorage
 			  renderNotes(); // перерендер карток нотаток після видалення
 			 } */
		}
	});
});
