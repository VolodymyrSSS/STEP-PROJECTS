// функція, яка створює html-структуру нотатки
export function createNoteHTML(item, id) {
	return `<section class="card text-bg-warning mb-2" style="max-width: 18rem;">
            <div class="card-body">
              <h5 class="card-title">${item.title}</h5>
              <p class="card-text">
                ${item.text}
              </p>
              <button type="button" class="btn btn-outline-danger btn-sm float-end" data-action="delete" data-id="${id}">Delete</button>
            </div>
          </section>`;
}
