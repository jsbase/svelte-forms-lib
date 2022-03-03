import { writable } from "svelte/store";

const USERS = "users";

export const Users = writable(
  typeof localStorage === "undefined" || !localStorage.getItem(USERS)
    ? []
    : JSON.parse(localStorage.getItem(USERS))
);

Users.subscribe((data) => {
  localStorage.setItem(USERS, JSON.stringify(data));
});
