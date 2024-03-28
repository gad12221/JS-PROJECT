import { countries } from "./services/countriesService.js";
import { createCardsList } from "./services/domService.js";
// import menuList from "./services/menuList.js";

// menuList();

createCardsList(countries);

console.log(countries);