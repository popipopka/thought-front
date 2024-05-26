import {useLocation, useNavigate} from 'react-router-dom'
import {Box, Button, Center, Flex, FormControl, FormLabel, Input, Textarea, useToast} from '@chakra-ui/react'
import React, {useEffect, useRef, useState} from 'react'
import axios from 'axios'

const Editor = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const toast = useToast()
    const {
        id,
        title,
        body
    } = location.state || {
        id: null,
        title: '',
        body: ''
    }

    const [newTitle, setNewTitle] = useState(title)
    const [newBody, setNewBody] = useState(body)

    const titleInputRef = useRef<HTMLInputElement>(null)
    const bodyInputRef = useRef<HTMLTextAreaElement>(null)

    const markdownChars = {
        bold: '**',
        italic: '*'
    }

    const createNote = async () => {
        const userData = sessionStorage.getItem('userData')
        if (!userData) {
            toast({
                title: 'Ошибка',
                description: 'Необходимо войти в систему для сохранения заметки',
                status: 'error',
                duration: 3500,
                isClosable: true,
            })
            return
        }

        const {
            username,
            password
        } = JSON.parse(userData)
        const authHeader = 'Basic ' + btoa(username + ':' + password)

        const response = await axios.post('http://localhost:8080/api/notes', {
            title: newTitle,
            body: newBody
        }, {
            headers: {
                Authorization: authHeader
            }
        })
        return response
    }

    const modifyFontStyle = (strToAdd: string) => {
        if (bodyInputRef.current) {
            // Получаем позиции начала и конца выделения

            const start = bodyInputRef.current.selectionStart
            const end = bodyInputRef.current.selectionEnd
            // Проверяем, что есть выделение
            if (start !== end) {
                // Текст до выделения, выделенный текст и текст после выделения
                const before = newBody.substring(0, start)
                const selectedText = newBody.substring(start, end)
                const after = newBody.substring(end)

                // Оборачиваем выделенный текст
                const updatedBody = `${before} ${strToAdd}${selectedText}${strToAdd} ${after}`

                // Обновляем состояние заметки с новым телом
                setNewBody(
                    updatedBody
                )

                bodyInputRef.current.value = updatedBody
            }
        }
    }

    function makeBold() {
        modifyFontStyle(markdownChars.bold)
    }


    function makeItalic() {
        modifyFontStyle(markdownChars.italic)
    }

    const updateNote = async () => {
        const userData = sessionStorage.getItem('userData')
        if (!userData) {
            toast({
                title: 'Ошибка',
                description: 'Необходимо войти в систему для обновления заметки',
                status: 'error',
                duration: 3500,
                isClosable: true,
            })
            return
        }

        const {
            username,
            password
        } = JSON.parse(userData)
        const authHeader = 'Basic ' + btoa(username + ':' + password)

        const response = await axios.patch(`http://localhost:8080/api/notes/${id}`, {
            title: newTitle,
            body: newBody
        }, {
            headers: {
                Authorization: authHeader
            }
        })

        return response
    }

    const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        try {
            let response
            if (id === null) {
                response = await createNote()
            } else {
                response = await updateNote()
            }

            if (response && (response.status === 200 || response.status === 201)) {
                toast({
                    title: 'Успех',
                    description: id === null ? 'Успешно создано' : 'Успешно обновлено',
                    status: 'success',
                    duration: 3500,
                    isClosable: true,
                })
                navigateToNotes()
            } else {
                toast({
                    title: 'Ошибка',
                    description: id === null ? 'Ошибка при создании' : 'Ошибка при обновлении',
                    status: 'error',
                    duration: 3500,
                    isClosable: true,
                })
            }

            navigateToNotes()
        } catch (error) {
            console.error('Ошибка при удалении заметки: ', error)
        }
    }

    const navigateToNotes = () => {
        navigate('/notes')
    }


    return (
        <Center height={'100vh'}>
            <Box p={5} style={{backgroundColor: '#FFFFFF'}} height={'fit-content'} width={'50%'} shadow="md"
                 borderWidth="4px" borderRadius={'15px'}>
                <form onSubmit={handleSave}>
                    <FormControl isRequired>
                        <FormLabel htmlFor="title">Title</FormLabel>
                        <Input
                            id="title"
                            name="title"
                            placeholder="Note title"
                            value={newTitle}
                            onChange={(e) => setNewTitle(e.target.value)}
                            ref={titleInputRef}
                        />
                    </FormControl>
                    <FormControl mt={4} isRequired>
                        <FormLabel htmlFor="content">Content</FormLabel>
                        <Textarea
                            id="content"
                            name="content"
                            minHeight={'20vh'}
                            placeholder="Note content"
                            value={newBody}
                            onChange={(e) => setNewBody(e.target.value)}
                            ref={bodyInputRef}
                        />
                    </FormControl>
                    <Flex justifyContent={'space-between'}>
                        <Button mt={4} colorScheme="teal" type="submit">
                            Save Note
                        </Button>
                        <Flex marginTop={4}>
                            <Box cursor={'pointer'} onClick={makeBold}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor"
                                     className="bi bi-type-bold" viewBox="0 0 16 16">
                                    <path
                                        d="M8.21 13c2.106 0 3.412-1.087 3.412-2.823 0-1.306-.984-2.283-2.324-2.386v-.055a2.176 2.176 0 0 0 1.852-2.14c0-1.51-1.162-2.46-3.014-2.46H3.843V13zM5.908 4.674h1.696c.963 0 1.517.451 1.517 1.244 0 .834-.629 1.32-1.73 1.32H5.908V4.673zm0 6.788V8.598h1.73c1.217 0 1.88.492 1.88 1.415 0 .943-.643 1.449-1.832 1.449H5.907z"/>
                                </svg>
                            </Box>
                            <Box cursor={'pointer'} onClick={makeItalic}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor"
                                     className="bi bi-type-italic" viewBox="0 0 16 16">
                                    <path
                                        d="M7.991 11.674 9.53 4.455c.123-.595.246-.71 1.347-.807l.11-.52H7.211l-.11.52c1.06.096 1.128.212 1.005.807L6.57 11.674c-.123.595-.246.71-1.346.806l-.11.52h3.774l.11-.52c-1.06-.095-1.129-.211-1.006-.806z"/>
                                </svg>
                            </Box>
                        </Flex>
                    </Flex>
                </form>
            </Box>
        </Center>
    )
}

export default Editor