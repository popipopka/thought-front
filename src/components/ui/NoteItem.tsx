import {Button, Card, CardBody, CardHeader, Flex, Heading, Icon, Text} from '@chakra-ui/react'
import React, {FC, useState} from 'react'
import {DeleteIcon, EditIcon} from '@chakra-ui/icons'
import {useNavigate} from 'react-router-dom'
import Markdown from 'react-markdown'
import {deleteNote} from '@/api/notes.ts'
import {redirectToEditor} from '@/routing/navigation.ts'


export interface Note {
    id: string;
    title: string;
    body: string;
}

interface NoteItemProps {
    note: Note
    onDelete: (id: string) => void
}

const NoteItem: FC<NoteItemProps> = ({
                                         note,
                                         onDelete
                                     }: Readonly<NoteItemProps>) => {
    const [showActions, setShowActions] = useState(false)
    const navigate = useNavigate()

    const handleToggleActions = () => {
        setShowActions(!showActions)
    }

    const handleEdit = () => {
        redirectToEditor(navigate, note)
    }

    const handleDelete = async () => {
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

            const response = await deleteNote(note.id, authHeader)

            if (response.status !== 200) {
                return
            }
            onDelete(note.id)
        } catch (error) {
            console.error('Ошибка при удалении заметки: ', error)
        }
    }


    return (
        <Card
            size={'lg'}
            colorScheme={'pink'}
            onClick={handleToggleActions}
        >
            <CardHeader paddingBottom={5}>
                <Heading size="md">{note.title}</Heading>
            </CardHeader>

            <CardBody padding={'30px'} paddingTop={0}>
                <Text pt="1" fontSize="md">
                    <Markdown>
                        {note.body}
                    </Markdown>
                </Text>
                {showActions && (
                    <Flex justifyContent="center" mt={4}>
                        <Button mr={2} onClick={handleEdit}>
                            <Icon as={EditIcon}/>
                        </Button>
                        <Button onClick={handleDelete}>
                            <Icon as={DeleteIcon} color="red.500"/>
                        </Button>
                    </Flex>
                )}
            </CardBody>
        </Card>
    )
}

export default NoteItem
