/* 1) Unit tests повинні бути ізольованими. Використання справжнього 
localStorage означає, що тести можуть впливати один на одного, якщо 
вони читають/записують ті самі ключі. Це може призвести до нестабільних
тестів, які проходять або не проходять залежно від порядку їх виконання.
2) Кожен тест повинен починатися з "чистого листа", тобто стан повинен
бути відомим кожного разу і не містити лишнього.
3) Тести мають бути швидкими. Доступ до реального localStorage відбувається
повільніше, ніж доступ до простого об’єкта JavaScript. 
4) Не всі середовища, у яких ви запускаєте свої тести, можуть підтримувати
роботу з localStorage (наприклад, Node.js), тому використання макету гарантує,
що ваші тести не залежать від середовища. Ось чому потрібно створити фейковий 
localStorage та інші зовнішні залежності які пов’язані з DOM і середовищем 
браузера, оскільки Jest, що працює в Node.js не має доступу до середовища 
браузера за замовчуванням. */

// імпорт потрібних функцій та земульованих даних:
import {
	saveNotesToLocalStorage,
	checkNotesEmpty,
	renderNotes,
} from '../js/main';
import initialNotes from '../js/mockingData';

/* Створюєм функцію, яка симулює реалізацію роботи localStorage, яка буде 
інкапсулює базову функціональність того, що забезпечує справжній localStorage.
Для цього використаєм можливості Jest. Це в свою чергу забезпечить як кращу 
інтеграцію з екосистемою Jest так і спрощує налаштування тесту.
global: це глобальний об’єкт в Node.js. Подібно до об’єкту window в браузері, 
і означає, що кожна глобальна змінна є властивістю цього об’єкту. Відомо, що 
localStorage — це вбудований об’єкт, який дозволяє зберігати дані як пари 
ключ-значення в браузері користувача. Однак, оскільки такий об'єкт не існує в 
Node.js, його потрібно створити (симулювати) там. Тому робимо так: */
const localStorageMock = (function () {
	let store = {};
	return {
		getItem: function (key) {
			return store[key] || null;
		},
		setItem: function (key, value) {
			store[key] = value.toString();
		},
		removeItem: function (key) {
			delete store[key];
		},
		clear: function () {
			store = {};
		},
	};
})();

/* Для заміни такої властивості як localStorage об’єкту window у кастомному 
фейковому об’єкті що створюється, використаєм поширений підхід у середовищах 
тестування JavaScript, де певні властивості браузера недоступні природним 
чином (наприклад, у середовищах Node під час використання Jest). Він полягає 
у використанні методу Object.defineProperty, який визначає нову властивість 
прямо на об'єкті чи змінює існуючу властивість об'єкту та повертає вже 
змінений об'єкт.*/
Object.defineProperty(window, 'localStorage', { value: localStorageMock });
/*Якщо не використовується strict mode, можна безпосередньо перезаписати 
властивість об'єкту window як
			window.localStorage = localStorageMock;
Однак зауважте, що деякі властивості доступні лише для читання і не можуть 
бути перезаписані безпосередньо. Тобто цей метод може не спрацювати у разі
якщо властивість задана як non-configurable.*/

/*Jest працює в середовищі Node.js, яке за замовчуванням не має доступу до 
об'єктів DOM. Під час такого тестування необхідно створити такі об'єкти та
імітувати роботу JS в середовищі DOM.
Доступ до елементів DOM будем робити за допомогою методу document.querySelector,
а методом document.body.innerHTML зімітуємо створення структури HTML у тестовому 
середовищі Node.js для симуляції роботи JS з об'єктами DOM. При цьому визначається 
мінімально необхідна частина зсимульованих елементів HTML, з якими буде взаємодія. */
beforeEach(() => {
	localStorage.clear(); // Mock clear any stored data to prevent test leakage

	// Reset the DOM to the initial required HTML structure:
	document.body.innerHTML = `
		<div class="no-notes-message" style="visibility: hidden; opacity: 0;"></div>
		<div class="main__cards-wrapper"></div>
		<form id="addNoteForm"></form>
    <input id="noteTitleInput" type="text" value="Test Title" />
    <div id="noteTextInput" contenteditable="true">Test text, test text, test text</div>
    <div id="formTextRemovable"></div>
    <button id='addNoteBtn'>Add Note</button>
  `;

	// Globals initialization or tie JS globals and imports to DOM mocks
	global.cardsWrapper = document.querySelector('.main__cards-wrapper');
	global.addNoteForm = document.querySelector('#addNoteForm');
	global.noteTitleInput = document.querySelector('#noteTitleInput');
	global.noteTextInput = document.querySelector('#noteTextInput');
	global.formTextRemovable = document.querySelector('#formTextRemovable');
	global.addNoteButton = document.querySelector('#addNoteBtn');

	// Reset any imported modules if necessary
	jest.resetModules();
});

describe('Operations with localStorage', () => {
	test('no-notes-message should be visible when no notes are present', () => {
		localStorage.setItem('notes', JSON.stringify([])); // задаєм пустий масив - без нотаток
		renderNotes(); // ця функція викликає перевірку checkNotesEmpty
		const noNotesMessage = document.querySelector('.no-notes-message');

		expect(noNotesMessage.style.visibility).toBe('visible');
		expect(noNotesMessage.style.opacity).toBe('1');
	});

	test('checkNotesEmpty should not display message when notes are present', () => {
		localStorage.setItem('notes', JSON.stringify(initialNotes)); // задаєм масив з початковими нотатками
		renderNotes();
		// Використовуємо затримку для того щоб усі DOM-елементи завантажились
		setTimeout(() => {
			const noNotesMessage = document.querySelector('.no-notes-message');

			expect(noNotesMessage.style.visibility).toBe('hidden');
		}, 100);
	});

	test('Loading initial notes from localStorage', () => {
		localStorage.setItem('notes', JSON.stringify(initialNotes));
		const loadedNotes = JSON.parse(localStorage.getItem('notes'));

		expect(loadedNotes).toEqual(initialNotes);
	});
});

describe('Notes operations', () => {
	test('adding a new note should increase notes array', () => {
		localStorage.setItem('notes', JSON.stringify(initialNotes));
		let notes = JSON.parse(localStorage.getItem('notes'));

		const newNote = {
			id: notes.length ? Math.max(...notes.map((n) => n.id)) + 1 : 1,
			title: noteTitleInput.value,
			text: noteTextInput.textContent,
		};

		notes.unshift(newNote);
		localStorage.setItem('notes', JSON.stringify(notes));

		expect(JSON.parse(localStorage.getItem('notes')).length).toBe(
			initialNotes.length + 1
		);
		expect(JSON.parse(localStorage.getItem('notes'))).toContainEqual(newNote);
	});

	test('adding a new note should contains entered new title and text', () => {
		localStorage.setItem('notes', JSON.stringify(initialNotes));
		addNoteButton.click();

		setTimeout(() => {
			expect(cardsWrapper.children.length).toBe(1);
			expect(cardsWrapper.firstChild.innerText).toContain('Test Title');
			expect(cardsWrapper.firstChild.innerText).toContain(
				'Test text, test text, test text'
			);
		}, 100);
	});

	test('deleting a note should decrease notes array', () => {
		localStorage.setItem('notes', JSON.stringify(initialNotes));
		let notes = JSON.parse(localStorage.getItem('notes'));

		// Переконаємся що як мінімум є дві нотатки щоб видалити якусь з них
		if (notes.length > 1) {
			const idToDelete = notes[1].id; // візьмем id другої нотатки
			const filteredNotes = notes.filter((note) => note.id !== idToDelete);

			localStorage.setItem('notes', JSON.stringify(filteredNotes));

			expect(JSON.parse(localStorage.getItem('notes')).length).toBe(
				initialNotes.length - 1
			);
		} else {
			throw new Error(
				'Not enough notes to perform delete operation in test setup.'
			);
		}
	});
});
