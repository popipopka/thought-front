import {NoteList} from '@components/ui'
import {Button, Center, Heading, useToast, VStack} from '@chakra-ui/react'
import {useNavigate} from 'react-router-dom'
import {useEffect, useState} from 'react'
import {redirectToEditor, redirectToEmptyEditor, redirectToLogin} from '@/routing/navigation.ts'

const Notes = () => {
    const navigate = useNavigate()
    const [isAuthenticated, setIsAuthenticated] = useState(false)

    useEffect(() => {
        const userData = sessionStorage.getItem('userData')
        if (userData) {
            setIsAuthenticated(true)
        }
    }, [])

    const handleCreateNote = () => {
        redirectToEmptyEditor(navigate)
    }

    const handleLoginRedirect = () => {
        redirectToLogin(navigate)
    }

    if (!isAuthenticated) {
        // Кнопка, которая будет отображаться, если пользователь не аутентифицирован
        return (
            <Center h="100vh">
                <VStack spacing={2}>
                    <Heading>Вы не авторизовались</Heading>
                    <Button colorScheme="teal" onClick={handleLoginRedirect}>
                        Войти в систему
                    </Button>
                </VStack>
            </Center>
        )
    }

    return (
        <>
            <NoteList/>
            <Button
                colorScheme="teal"
                position="fixed"
                bottom="20px"
                right="20px"
                onClick={handleCreateNote}
            >
                Создать заметку
            </Button>
        </>
    )
}

export default Notes