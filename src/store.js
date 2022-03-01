import { writable } from 'svelte/store';

const KEY_FORM_DATA = 'form-data';
const localData = localStorage in window
    ? localStorage.getItem(KEY_FORM_DATA)
    : localStorage.setItem(KEY_FORM_DATA, []);
const Store = writable(localData);

Store.subscribe(data => {
	//console.log('onStore.subscribe: ', evt);
	localStorage.setItem(
	    KEY_FORM_DATA,
	    [
	        ...localStorage.getItem(KEY_FORM_DATA),
	        data
	    ]
	);
});

export default Store;
