// export const addNoteForm = document.querySelector('#addNoteForm');
// export const formTextRemovable = document.querySelector(
// 	'.form__text-removable'
// );
// export const noteTextInput = document.querySelector('#noteTextInput');
// export const cardsWrapper = document.querySelector('.main__cards-wrapper');

/*Якщо цей модуль завантажено до того, як DOM буде повністю готовий,
наприклад, document.querySelector('.main__cards-wrapper') поверне 
значення null, оскільки елемент, який він намагається вибрати, ще 
не існує. У цьому випадку кращим рішенням буде уникнення експорту 
прямого вибору елементів з файлу common.js як це зроблено вище.
Натомість були створені функції, які повертають потрібні елементи DOM,
дозволяючи отримувати їх під час фактичного використання у потрібний
момент, гарантуючи що DOM готовий і елементи існують.*/

export function getAddNoteForm() {
	return document.querySelector('#addNoteForm');
}

export function getFormTextRemovable() {
	return document.querySelector('.form__text-removable');
}

export function getNoteTitleInput() {
	return document.querySelector('#noteTitleInput');
}

export function getNoteTextInput() {
	return document.querySelector('#noteTextInput');
}

export function getCardsWrapper() {
	return document.querySelector('.main__cards-wrapper');
}
