import {Center, useToast, VStack} from '@chakra-ui/react'
import NoteItem, {Note} from '@components/ui/NoteItem.tsx'
import {useEffect, useState} from 'react'
import axios from 'axios'
import {getNotes} from '@/api/notes.ts'

const NoteList = () => {
    const [notes, setNotes] = useState<Note[]>([])
    const toast = useToast()

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userData = sessionStorage.getItem('userData')
                if (!userData) {
                    return
                }

                const {
                    username,
                    password
                } = JSON.parse(userData)
                const authHeader = 'Basic ' + btoa(username + ':' + password)

                const response = await getNotes(authHeader)

                if (response.status === 204) {
                    toast({
                        title: 'Внимание',
                        description: 'У вас нет ни одной заметки',
                        status: 'info',
                        duration: 9000,
                        isClosable: true,
                    })
                } else if (response.status === 200) {
                    setNotes(response.data)
                }
            } catch (error) {
                toast({
                    title: 'Ошибка',
                    description: 'Ошибка при запросе данных с сервера',
                    status: 'error',
                    duration: 9000,
                    isClosable: true,
                })
            }
        }

        fetchData().then()
    }, [])

    const handleDelete = (id: string) => {
        setNotes(notes.filter(note => note.id != id))
    }

    return (
        <Center h="100vh">
            <VStack spacing="10px" maxW="60%">
                {notes.map(note => (
                    <NoteItem key={note.id} note={note} onDelete={handleDelete}/>
                ))}
            </VStack>
        </Center>
    )
}

export default NoteList
