import { client } from "..";

/*
 * Should insert into the users table
 * Should return the User object
 * {
 *   username: string,
 *   password: string,
 *   name: string
 * }
 */
export async function createUser(username: string, password: string, name: string) {
    try{
        const insertQuery = `INSERT INTO users(username, password, name)
        VALUES($1, $2, $3)`;
        const values = [username, password, name];
        const res = await client.query(insertQuery, values);
        console.log('insert successful: ', res);
        return res;
    }catch(e){
        console.log('error occured: ', e);
    }
}

/*
 * Should return the User object
 * {
 *   username: string,
 *   password: string,
 *   name: string
 * }
 */
export async function getUser(userId: number) {
    try{
        const insertQuery = `SELECT * FROM users WHERE id=$1`;
        const values = [userId];
        const res = await client.query(insertQuery, values);
        console.log('get successful: ', res);
        return res.rows[0];
    }catch(e){
        console.log('error occured: ', e);
    }
}

// const username = 'testuser';
// const password = 'testpass';
// const name = 'Test User';
// createUser(username, password, name);
