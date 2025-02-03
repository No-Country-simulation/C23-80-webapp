const API_URL = import.meta.env.VITE_API_URL;


/**
 * Fetch data from the server
 * @param {path:string, method:POST|GET} param0 
 * @returns 
 */
export async function fetchData({ path = "/categorias", method = "GET" }) {
    try {
        const response = await fetch(`${API_URL}${path}`, {
            method,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });
        const data = await response.json();
        if(response.status === 200) {
            return data;
        } else {
            return null;
        }
    } catch (error) {
        console.error(error);
        return null;
    }
}