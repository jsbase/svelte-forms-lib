// @ts-nocheck
import { writable } from "svelte/store";

const KEY_FORM_DATA = "form-data";

// TODO: remove this
//localStorage.clear();

let localData = !localStorage.getItem(KEY_FORM_DATA)
  ? []
  : JSON.parse(localStorage.getItem(KEY_FORM_DATA));

const Store = writable(localData);

Store.subscribe((value) => {
  localStorage.setItem(KEY_FORM_DATA, JSON.stringify(value));
});

export default Store;
