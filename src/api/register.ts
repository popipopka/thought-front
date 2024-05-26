import axios from 'axios'
import {API_BASE_URL} from '@/api/general.ts'

export const registerPost = async ({username, password}: { [key: string]: string }) => {
    return await axios.post(`${API_BASE_URL}/users/register`, {
        username,
        password
    })
}