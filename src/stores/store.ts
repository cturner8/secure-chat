import localforage from "localforage";

const DB_NAME = "secure-chat";

localforage.config({
  driver: localforage.INDEXEDDB,
  name: DB_NAME,
});

export { DB_NAME, localforage };
