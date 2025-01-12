import { addNoteForm, formTextRemovable, noteTextInput } from './common.js';

const formStarter = document.querySelector('.form__starter');
const formContent = document.querySelector('.form__content');
const formTitle = document.querySelector('.form__title');
const formText = document.querySelector('.form__text');

// Приховати placeholder коли поле виділено або містить текст - імітац focus()
noteTextInput.addEventListener('focus', () => {
	if (noteTextInput.textContent.trim() === '') {
		formTextRemovable.style.display = 'none';
	}
});

// Показати placeholder коли покинули поле - імітація blure()
noteTextInput.addEventListener('blur', () => {
	if (noteTextInput.textContent.trim() === '') {
		formTextRemovable.style.display = 'block';
	}
});

// Приховати placeholder коли поле виділено і містить текст
noteTextInput.addEventListener('input', () => {
	if (noteTextInput.textContent.trim() !== '') {
		formTextRemovable.style.display = 'none';
	} else {
		formTextRemovable.style.display = 'block';
	}
});

// через можливе введення текстів із власними чи зовнішніми стилями, функція уникає накладання таких стилів для HTML-елементу та забезпеч введення простого тексту
noteTextInput.addEventListener('paste', (e) => {
	e.preventDefault();
	const text = e.clipboardData.getData('text/plain');
	navigator.clipboard.writeText(text).then(() => {
		document.execCommand('insertText', false, text);
	});
});

// показати меню додавання нотатки
formStarter.onclick = (event) => {
	event.stopPropagation(); // заборонити всплиття події за межами formStarter
	// перемикаємо клас'd-none' щоб показувати чи скривати вміст форми
	formContent.classList.toggle('d-none');
	formTitle.focus();
};

formContent.onclick = (event) => {
	event.stopPropagation(); // заборонити всплиття події за межами formContent
};

// перехід від заголовка до тексту нотатки із фокусуванням по клавіші Enter
formTitle.addEventListener('keydown', (event) => {
	if (event.key === 'Enter') {
		event.preventDefault(); // щоб позбутись пустого рядка або keyup
		formText.focus(); // фокусуємо курсор на полі введення
	}
});

// перемикання між заголовком та полем введення тексту
formText.addEventListener('keyup', () => {
	if (formText.textContent !== '') {
		formTextRemovable.textContent = '';
	} else {
		formTextRemovable.textContent = 'The text of the note';
	}
});

// приховати форму, якщо клацнути за межами вмісту форми
document.addEventListener('click', (event) => {
	let isClickInsideForm = addNoteForm.contains(event.target);

	// перевірка чи клік не на формі чи будь-якому із її дочірніх елементів
	if (!isClickInsideForm) {
		formContent.classList.add('d-none'); // додавання цього класу сховає форму
	}
});
