import axios from 'axios'
import {API_BASE_URL} from '@/api/general.ts'

export const deleteNote = async (noteId: string, authHeader: string) => {
    return await axios.delete(`${API_BASE_URL}/notes/${noteId}`,
        {
            headers: {
                Authorization: authHeader
            }
        })
}

export const getNotes = async (authHeader: string) => {
    return await axios.get(`${API_BASE_URL}/notes`, {
        headers: {
            Authorization: authHeader
        }
    })
}



