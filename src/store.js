import { writeable } from 'svelte/store';

const localData = localStorage in window ? localStorage.setItem('form-data', []) : [];
const Store = writeable(localData);

Store.subscribe((evt) => {
	console.log('onStore.subscribe: ', evt);	
});

export default Store;
