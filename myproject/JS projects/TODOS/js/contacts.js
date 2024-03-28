export class Contacts {
  // prop: 
  array = [];

  //load contacts from localStorage:
  constructor() {
    this.array = JSON.parse(localStorage.getItem('contacts')) ?? [];
  }

  //save contacts to localStorage:
  save() {
    localStorage.setItem("contacts", JSON.stringify(this.array));
  }

  add(contact) {
    this.array.push(contact);//save to array
    this.save();
  }

  edit(id, name) {
    //[{id: '123', name: 'dave', favorite: false}]
    const index = this.array.findIndex(c => c.id === id);
    this.array[index].name = name;
    this.save();
  }

  toggleFavorite(id) {
    //[{id: '123', name: 'dave'}, {id: '456', name: 'moe'}]
    const index = this.array.findIndex(c => c.id === id);
    this.array[index].favorite = !this.array[index].favorite;
    this.save();
  }

  remove(id) {
    this.array = this.array.filter(c => c.id !== id);
    this.save();
  }
}

