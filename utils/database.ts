import * as SQLite from 'expo-sqlite';

let db: SQLite.SQLiteDatabase | null = null;

export const openDatabase =() => {
  if (!db) {
    db = SQLite.openDatabaseSync('user.db');
  }
  return db;
};
export const createTables = () => {
  const database = openDatabase();
   database.execSync(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      email TEXT,
      password TEXT,
      caloriesToday INTEGER
    );
  `);
  database.execSync(`
    CREATE TABLE IF NOT EXISTS prediccion (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      prediccion TEXT,
      porcentaje FLOAT
    );
  `);
  database.execSync(`
    CREATE TABLE IF NOT EXISTS user_prediccion (
      userId INTEGER,
      prediccionId INTEGER,
      FOREIGN KEY (userId) REFERENCES users(id),
      FOREIGN KEY (prediccionId) REFERENCES prediccion(id),
      PRIMARY KEY (userId, prediccionId)
    );
  `);
  console.log('Tables created successfully');
};
export const insertUser =  (name: string, email: string, password: string, caloriesToday: number) => {
  const database =  openDatabase();
  const result =  database.runSync(
    'INSERT INTO users (name, email, password, caloriesToday) VALUES (?, ?, ?, ?);',
    [name, email, password, caloriesToday]
  );
  console.log('User inserted successfully:', result.lastInsertRowId);
  return result.lastInsertRowId;
};

export const updateUserCalories = (userId: number, caloriesToday: number) => {
  const database = openDatabase();
  database.runSync(
    'UPDATE users SET caloriesToday = ? WHERE id = ?;',
    [caloriesToday, userId]
  );
  console.log('User calories updated successfully for userId:', userId);
};

export const insertPrediccion =  (userId: number, prediccion: string, porcentaje: number) => {
  const database =  openDatabase();
  const result = database.runSync(
    'INSERT INTO prediccion (prediccion, porcentaje) VALUES (?, ?);',
    [prediccion, porcentaje]
  );
  const prediccionId =  result.lastInsertRowId;

  database.runSync(
    'INSERT INTO user_prediccion (userId, prediccionId) VALUES (?, ?);',
    [userId, prediccionId]
  );

  console.log('Prediccion inserted successfully:', prediccionId);
  return prediccionId;
};

export const getUser =  () => {
  const database = openDatabase();
  const user =  database.getFirstSync('SELECT * FROM users ORDER BY id DESC LIMIT 1;');
  return user;
};

export const getUserByName = (name: string) => {
  const database =  openDatabase();
  return  database.getFirstSync('SELECT * FROM users WHERE name = ?;', [name]);
};


export const getPrediccionesByUserId =  (userId: number) => {
  const database =  openDatabase();
  return  database.getAllSync(`
    SELECT p.* FROM prediccion p
    INNER JOIN user_prediccion up ON p.id = up.prediccionId
    WHERE up.userId = ?;
  `, [userId]);
};
