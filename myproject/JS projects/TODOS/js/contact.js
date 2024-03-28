export class Contact {
  id;
  name;
  favorite = false;

  constructor(id, name, favorite = false) {
    this.id = id;
    this.name = name;
    this.favorite = favorite;
  }
}