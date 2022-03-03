import { writable } from "svelte/store";

const USERS = "users";

localStorage.clear();

export const Users = writable(
  typeof localStorage === "undefined" || !localStorage.getItem(USERS)
    ? localStorage.setItem(USERS, JSON.stringify([]))
    : localStorage.getItem(USERS)
);

Users.subscribe((data) => {
  localStorage.setItem(USERS, JSON.stringify(data));
});
