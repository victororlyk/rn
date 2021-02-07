import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('places.db');

export const init = () => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(`CREATE TABLE IF NOT EXISTS places 
    (id INTEGER PRIMARY KEY NOT NULL,
     title TEXT NOT NULL,
     imageURI TEXT NOT NULL,
     address TEXT NOT NULL, 
     lat REAL NOT NULL, 
     lng REAL NOT NULL
     );`, [],
        () => {
          resolve()
        },
        (_, error) => {
          reject(error)
          return;
        })
    })
  })
}

export const insertPlace = (title, imageURI, address, lat, lng) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(`INSERT INTO places (title, imageURI, address, lat, lng) VALUES (?, ?, ?, ?, ?)`,
        [title, imageURI, address, lat, lng],
        (_, result) => {
          resolve(result)
        },
        (_, error) => {
          reject(error)
          return;
        })
    })
  })
}

export const fetchPlaces = ()=>{
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(`SELECT * FROM places`,
        [],
        (_, result) => {
          resolve(result)
        },
        (_, error) => {
          reject(error)
          return;
        })
    })
  })
}
