import { Contact } from "./contact.js";
import { Contacts } from "./contacts.js";
import { nanoid } from 'https://cdn.jsdelivr.net/npm/nanoid@5.0.6/+esm';

const inputName = document.getElementById('input-name');
const addButton = document.getElementById('btn-add');
const contactList = document.getElementById('contact-list');

const contacts = new Contacts();

// Swal.fire({
//   title: 'Cool!',
//   text: 'Do you want to continue',
//   icon: 'success',
//   confirmButtonText: 'Cool'
// })

addButton.addEventListener('click', (e) => {
  const name = inputName.value;

  const contact = new Contact(nanoid(), name);
  contacts.add(contact);
  inputName.value = "";

  render();
});

function render() {
  contactList.innerHTML = "";
  contacts.array.forEach(c => {

    const li = document.createElement('li');
    li.classList.add('list');

    const form = document.createElement('form');
    form.classList.add('d-flex', 'justify-center', 'gap-2', 'p-2');

    //input: name
    const input = document.createElement('input');
    input.type = 'text';
    input.classList.add('fs-2');
    input.required = true;
    input.placeholder = 'Name';
    input.value = c.name;

    //button: delete
    const deleteButton = document.createElement('button');
    deleteButton.type = 'button';
    deleteButton.classList.add('btn', 'btn-sm', 'btn-danger');
    deleteButton.innerHTML = '<i class="bi bi-trash3 fs-2 text-white"></i>';
    deleteButton.addEventListener('click', () => {
      //delete the contact from the array:
      contacts.remove(c.id);
      render();
    })

    //button: edit
    const editButton = document.createElement('button');
    editButton.type = 'button';
    editButton.classList.add('btn', 'btn-sm', 'btn-warning');
    editButton.innerHTML = '<i class="bi bi-pencil fs-2 text-white"></i>';
    editButton.addEventListener('click', () => {
      //changing the symbol to edit only when clicked:
      if (editButton.innerHTML == '<i class="bi bi-pencil fs-2 text-white"></i>') {
        editButton.innerHTML = '<i class="bi bi-check fs-2 text-white"></i>';
        input.readOnly = false;
      } else {
        editButton.innerHTML = '<i class="bi bi-pencil fs-2 text-white"></i>';
        input.readOnly = true;
      }

      contacts.edit(c.id, input.value);
      //render();
    })

    //button: favorite
    const favoriteButton = document.createElement('button');
    favoriteButton.type = 'button';
    favoriteButton.classList.add('btn', 'btn-sm', 'btn-success');

    const icon = c.favorite ? 'bi-star-fill' : 'bi-star';
    favoriteButton.innerHTML = `<i class="bi ${icon} fs-2 text-white"></i>`;
    favoriteButton.addEventListener('click', () => {
      //save to array:
      contacts.toggleFavorite(c.id);
      //show the updated html:
      render();
    });

    //append elements to form
    form.appendChild(input);
    form.appendChild(deleteButton);
    form.appendChild(editButton);
    form.appendChild(favoriteButton);

    //append form to li
    li.appendChild(form);

    //append li to contactList
    contactList.appendChild(li);
  })
}
render();
