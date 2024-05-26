import {NavigateFunction} from 'react-router-dom'
import {Note} from '@components/ui/NoteItem.tsx'

export const redirectToLogin = (navigate: NavigateFunction) => {
    navigate('/login')
}

export const redirectToRegister = (navigate: NavigateFunction) => {
    navigate('/register')
}

export const redirectToEditor = (navigate: NavigateFunction, note: Note) => {
    navigate('/editor', {
        state: {
            id: note.id,
            title: note.title,
            body: note.body
        }
    })
}

export const redirectToEmptyEditor = (navigate: NavigateFunction) => {
    navigate('/editor', )
}