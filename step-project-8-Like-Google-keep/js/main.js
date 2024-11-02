// шукаємо потрібні елементи на сторінці
import { createNoteHTML } from './noteStructure.js';
import { addNodeForm, formTextRemovable, noteTextInput } from './common.js';

const noteTitleInput = document.querySelector('#noteTitleInput');
const cardsWrapper = document.getElementsByClassName('main__cards-wrapper')[0]; // якщо використовується метод "getElementsByClassName" то повертається масив значень а тому потрібно додавати на той момент єдине значення масиву під індексом "[0]"
const noNotesMessage = document.getElementsByClassName('no-notes-message')[0];

// створюємо початковий масив нотаток але через "let" бо можемо застосовувати методи які можуть модифікувати оригінальний масив типу: .filter(), .sort() і т.д.
// let notes = [
// 	{
// 		id: 1,
// 		title: 'Основи JS',
// 		text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc consectetur hendrerit elementum.',
// 	},
// 	{
// 		id: 2,
// 		title: 'DOM-дерево',
// 		text: 'Sed tristique quam sed tempus pretium. Ut et volutpat nisl, vitae suscipit arcu.',
// 	},
// 	{
// 		id: 3,
// 		title: 'Події в JS',
// 		text: 'Sed rutrum, orci at luctus varius, lacus turpis porta dui, quis pretium sem odio eget mi. Pellentesque ut faucibus elit.',
// 	},
// ];

// визначаємо функцію для відображення повідомлення при відсутності нотаток
function checkNotesEmpty() {
	console.log('Running checkNotesEmpty');
	if (notes.length === 0) {
		noNotesMessage.style.display = 'block'; // Повідомлення відображається
	} else {
		noNotesMessage.style.display = 'none'; // Повідомлення сховане
	}
}

// визначаємо функцію для контролю за потенційними помилками при збереженні\обновленні\видаленні нотаток в localStorage
function saveNotesToLocalStorage(notes) {
	try {
		// записуєм зміни (чи додану нотатку) в localStorage
		localStorage.setItem('notes', JSON.stringify(notes));
	} catch (err) {
		console.error('Could not save notes to the localStorage:', err);
		// тут можна повідомити користувача щодо неможливості зберегти нотатки
	}
}

// Считуєм дані з locale storage при першому запуску
let notes = [];
// виявлення помилок, які можуть виникнути під час отримання нотаток з localStorage та під час парсінга
try {
	const storedNotes = localStorage.getItem('notes');
	if (storedNotes) {
		notes = JSON.parse(storedNotes);
	}
} catch (err) {
	console.error('Failed to retrieve or parse notes from localStorage:', err);
}

// викликаєм цю функцію також при початковому парсінгу
document.addEventListener('DOMContentLoaded', checkNotesEmpty);

// слухаємо за змінами в формі
addNodeForm.addEventListener('submit', (event) => {
	event.preventDefault(); // відміняєм стандартну відправку форми

	// відлік id та поступове додавання його до наступних нотаток
	let id = notes.length > 0 ? notes[notes.length - 1].id + 1 : 1;

	// додаємо нотатку
	notes.push({
		id: id,
		title: noteTitleInput.value,
		text: noteTextInput.textContent,
	});

	saveNotesToLocalStorage(notes); // збереження\обновлення нотатки в localStorage

	noteTitleInput.value = ''; // очищаэмо поле вводу заголовку нотатки
	noteTextInput.textContent = ''; // очищаємо поле вводу тексту нотатки

	formTextRemovable.textContent = 'The text of the note'; // повертаєм попередній placeholder
	noteTitleInput.focus(); // повертаєм фокус

	const lastNote = notes[notes.length - 1]; // визначаємо останній доданий елемент масиву

	// визначаєм останній доданий елемент та місце куда його додавати на сторінку
	const elem = createNoteHTML(lastNote, lastNote.id);
	cardsWrapper.insertAdjacentHTML('afterbegin', elem);

	checkNotesEmpty(); // забезпечуєм приховання повідомлення "You have no notes!"
});

notes.forEach((item, id) => {
	const elem = createNoteHTML(item, id); // рендеряться початкові нотатки на сторінці

	cardsWrapper.insertAdjacentHTML('afterbegin', elem); // куда їх додавати на сторінку
});

// видалення нотатки зі сторінки
document.addEventListener('click', (event) => {
	if (event.target.dataset.action === 'delete') {
		const id = event.target.dataset.id; // уважно! тут отримаємо рядковий символ а не число

		// видаляємо нотатку з масиву по індексу, що не змінює оригінальний масив
		const deletedItemIndex = notes.findIndex((item) => item.id == id); // нестроге порівняння бо тут "id" може бути текстовим символом а "item.id" є число

		if (deletedItemIndex > -1) {
			notes.splice(deletedItemIndex, 1); // видаляємо нотатку

			saveNotesToLocalStorage(notes); // записуємо зміни про видалену нотатку в localStorage

			event.target.closest('.card').remove(); // видаляємо нотатку зі сторінки (DOM-дерева)

			checkNotesEmpty(); // забезпечуєм показ повідомлення "You have no notes!"
		}

		// альтернативне видалення нотаток з масиву через .filter(), але який змінює ориг масив
		// notes = notes.filter((item) => item.id != id); // нестроге порівняння рядка і числа
	}
});
