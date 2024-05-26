import axios from 'axios'
import {API_BASE_URL} from '@/api/general.ts'

export const loginPost = async ({username, password}: { [key: string]: string }) => {
    return await axios.post(`${API_BASE_URL}/users/login`, {
        username,
        password
    })
}