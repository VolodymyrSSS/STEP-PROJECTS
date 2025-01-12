// імпорт функцій та земульованих даних
import { saveNotesToLocalStorage, checkNotesEmpty } from '../js/main';
import initialNotes from '../js/mockingData';

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
що ваші тести не залежать від середовища.

Ось чому потрібно створити фейковий localStorage та інші зовнішні залежності
як от пов’язані з DOM і середовищем браузера, оскільки Jest не має доступу до
середовища браузера за замовчанням.
*/

// Створюєм функцію, яка симулює реалізацію роботи localStorage, яка інкапсулює
// базову функціональність того, що забезпечує справжній localStorage.
const localStorageMock = (function () {
	let store = {};
	return {
		getItem: function (key) {
			return store[key] || null;
		},
		setItem: function (key, value) {
			store[key] = value.toString();
		},
		clear: function () {
			store = {};
		},
	};
})();

/*global: це глобальний об’єкт в Node.js. Подібно до об’єкту window в браузері, 
і означає, що кожна глобальна змінна є властивістю цього об’єкту. Відомо, що 
localStorage — це вбудований об’єкт, який дозволяє зберігати дані як пари ключ-значення
в браузері користувача. Однак, оскільки такий об'єкт не існує в Node.js, його потрібно створити (симулювати) там. Тому робимо так: */
global.localStorage = localStorageMock;

/*Jest працює в середовищі Node.js, яке за замовчуванням не має доступу до об'єктів
DOM. Під час тестування коду JavaScript, який взаємодіє з DOM, необхідно імітувати
якусь частину середовища DOM оскільки Jest не працює в середовищі браузера. 
Доступ до елементів DOM за допомогою методів як document.querySelector, потрібно
визначити ці елементи у штучній чи зсимульованій структурі DOM. Тому такий рядок як
document.body.innerHTML визначає зсимульовану структуру HTML у тестовому середовищі.
При цьому визначається мінімальна частина зсимульованих елементів HTML, з якими буде взаємодіяти JavaScript код. */
// document.body.innerHTML = `
//   <form id="addNoteForm"></form>
//   <div id="noteTitleInput"></div>
//   <div class="main__cards-wrapper"></div>
//   <div class="no-notes-message"></div>
// `;

/* Ці рядки зберігають посилання на ці зсимульовані елементи DOM у константах.
Цими константами можна маніпулювати у тестах, щоб імітувати та спостерігати за
взаємодіями, як вони би відбулися б у справжньому середовищі, що дозволяє проводити
ретельне тестування функцій, які взаємодіють із цими елементами.*/
// const noteTitleInput = document.querySelector('#noteTitleInput');
// const cardsWrapper = document.querySelector('.main__cards-wrapper');
// const noNotesMessage = document.querySelector('.no-notes-message');

/*Ізоляція в тестуванні означає, що результат одного тесту не повинен залежати від
того, чи виконуються інші тести до чи після нього. Цей принцип допомагає запобігти
побічним ефектам між тестами та гарантує, що кожен тест можна виконувати в будь-якому порядку, не впливаючи на результати. */
// function resetMocks() {
// 	localStorage.clear(); // скидання (очищення) всіх даних з зсимульованого localStorage
// 	noteTitleInput.value = ''; // скидання поля введення заголовку нотатки до порожнього стану
// 	cardsWrapper.innerHTML = ''; // скидання внутрішнього контенту (HTML-код картки) обгортки
// 	noNotesMessage.style.display = ''; // скидання CSSвластивостей елементу no-note пвідомлення
// }

// describe('Notes Application', () => {
// 	beforeEach(() => {
// 		document.body.innerHTML = `
//       <form id="addNoteForm"></form>
//       <div id="noteTitleInput"></div>
//       <div class="main__cards-wrapper"></div>
//       <div class="no-notes-message"></div>
//     `;

// 		resetMocks();

// 		localStorage.setItem('notes', JSON.stringify(initialNotes));

// 		notes = JSON.parse(localStorage.getItem('notes'));
// 	});

// 	test('Loading initial notes from localStorage', () => {
// 		expect(notes).toEqual(initialNotes);
// 		expect(notes.length).toBe(3);
// 	});

// 	test('Adding a new note should increase notes array', () => {
// 		const newNote = {
// 			id: 4,
// 			title: 'Делегування подій при роботі з DOM',
// 			text: 'Aliquam sollicitudin facilisis risus, vel commodo sem iaculis in. Quisque sodales quis lorem at hendrerit. Donec eleifend consectetur tellus non lacinia.',
// 		};
// 		notes.push(newNote);
// 		saveNotesToLocalStorage(notes);
// 		expect(JSON.parse(localStorage.getItem('notes')).length).toBe(4);
// 		expect(notes[3]).toEqual(newNote);
// 	});

// 	test('Deleting a note should decrease notes array', () => {
// 		notes.splice(1, 1); // видалення другої нотатки
// 		saveNotesToLocalStorage(notes);
// 		expect(JSON.parse(localStorage.getItem('notes')).length).toBe(2);
// 	});

// 	test('checkNotesEmpty should display message when no notes are present', () => {
// 		notes = [];
// 		checkNotesEmpty();
// 		expect(noNotesMessage.style.display).toBe('block');
// 	});

// 	test('checkNotesEmpty should not display message when notes are present', () => {
// 		expect(notes.length).toBeGreaterThan(0);
// 		checkNotesEmpty();
// 		expect(noNotesMessage.style.display).toBe('none');
// 	});
// });

describe('Notes Application General Tests', () => {
	beforeEach(() => {
		document.body.innerHTML = `
        <form id="addNoteForm"></form>
        <div id="noteTitleInput"></div>
        <div class="main__cards-wrapper"></div>
        <div class="no-notes-message" style="display: none;"></div>
    `;

		localStorage.clear();
		localStorage.setItem('notes', JSON.stringify(initialNotes));

		jest.resetModules(); // Ensures that modules are freshly required
		require('../js/main'); // Import after setting up the DOM
	});

	describe('Notes Application General Tests', () => {
		beforeEach(() => {
			document.body.innerHTML = `
            <form id="addNoteForm"></form>
            <div id="noteTitleInput"></div>
            <div class="main__cards-wrapper"></div>
            <div class="no-notes-message" style="display: none;"></div>
        `;

			localStorage.clear();
			localStorage.setItem('notes', JSON.stringify(initialNotes));

			jest.resetModules(); // Reset module registry
			require('../js/main'); // This should now correctly attach the event listener
		});

		describe('Initial Page State', () => {
			test('Initial message visibility based on pre-populated notes', () => {
				checkNotesEmpty();
				const noNotesMessage = document.querySelector('.no-notes-message');
				expect(noNotesMessage.style.display).toBe('none');
			});

			test('Initial notes loaded into Local Storage', () => {
				const storedNotes = JSON.parse(localStorage.getItem('notes'));
				expect(storedNotes).toEqual(initialNotes);
			});
		});

		describe('LocalStorage Operations', () => {
			test('Saving data to localStorage retains data integrity', () => {
				saveNotesToLocalStorage(initialNotes);
				expect(JSON.parse(localStorage.getItem('notes'))).toEqual(initialNotes);
			});
		});

		describe('UI Interactions', () => {
			test('No-notes message correctly toggles on empty notes array', () => {
				localStorage.setItem('notes', JSON.stringify([]));
				checkNotesEmpty();
				const noNotesMessage = document.querySelector('.no-notes-message');
				expect(noNotesMessage.style.display).toBe('block');
			});
		});
	});
});
