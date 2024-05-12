import { client } from "..";
/*
 * Function should insert a new todo for this user
 * Should return a todo object
 * {
 *  title: string,
 *  description: string,
 *  done: boolean,
 *  id: number
 * }
 */
export async function createTodo(userId: number, title: string, description: string) {
    try{
        
        const insertQuery = `INSERT INTO todos(user_id, title, description)
        VALUES($1, $2, $3)`;
        const values = [userId, title, description];
        const res = await client.query(insertQuery, values);
        console.log('insert successful: ', res);
        const todoQuery = `SELECT * FROM todos 
        WHERE user_id=$1`
        const todo = await client.query(todoQuery,[userId]);
        console.log(todo);
        return todo.rows[0];
    }catch(e){
        console.log('error occured: ', e);
    }
}
/*
 * mark done as true for this specific todo.
 * Should return a todo object
 * {
 *  title: string,
 *  description: string,
 *  done: boolean,
 *  id: number
 * }
 */
export async function updateTodo(todoId: number) {
    try{
        
        const insertQuery = `UPDATE todos
        SET done=true
        WHERE user_id=($1)`;
        const values = [todoId];
        const res = await client.query(insertQuery, values);
        console.log('update successful: ', res);
        const todoQuery = `SELECT * FROM todos 
        WHERE id=$1`
        const todo = await client.query(todoQuery,[todoId]);
        console.log(todo);
        return todo.rows[0];
    }catch(e){
        console.log('error occured: ', e);
    }
}

/*
 *  Get all the todos of a given user
 * Should return an array of todos
 * [{
 *  title: string,
 *  description: string,
 *  done: boolean,
 *  id: number
 * }]
 */
export async function getTodos(userId: number) {
    try{
        
        const insertQuery = `SELECT u.id, t.title, t.description, t.done, t.id, t.user_id
        FROM users u 
        JOIN todos t ON u.id = t.user_id
        WHERE  u.id = $1`;
        const values = [userId];
        const res = await client.query(insertQuery, values);
        console.log(res);
        return res.rows;
    }catch(e){
        console.log('error occured: ', e);
    }
}