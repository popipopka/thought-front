import React, {useState} from 'react'
import {
    Box,
    Button,
    Center,
    Divider,
    FormControl,
    FormLabel,
    Heading,
    Input,
    Text,
    useToast,
    VStack
} from '@chakra-ui/react'
import {useNavigate} from 'react-router-dom'
import {loginPost} from '@/api/login.ts'

const LoginPage = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const toast = useToast()
    const navigate = useNavigate()

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            const response = await loginPost({username, password})

                sessionStorage.setItem('userData', JSON.stringify({
                    username: response.data.username,
                    password: response.data.password
                }))

            toast({
                title: 'Успешно',
                description: 'Вы успешно вошли в систему',
                status: 'success',
                duration: 3500,
                isClosable: true,
            })

            navigate('/notes')

        } catch (error) {
            let message = 'Произошла неизвестная ошибка'
            if (error.response && error.response.data) {
                message = error.response.data.message ? error.response.data.message : message
            } else if (error.request) {
                // Запрос был сделан, но ответ не был получен
                message = 'Ответ от сервера не был получен'
            }

            toast({
                title: 'Ошибка',
                description: message,
                status: 'error',
                duration: 9000,
                isClosable: true,
            })
        }
    }

    const onRegister = () => {
        navigate('/register')
    }

    return (
        <Center height="89vh">
            <Box p={8} maxWidth="30%" borderWidth={2} borderRadius={8} boxShadow="lg" bg="gray.50">
                <VStack spacing={5} align="stretch">
                    <Heading textAlign="center">Войти</Heading>
                    <form onSubmit={handleLogin}>
                        <FormControl id="username" isRequired>
                            <FormLabel>Логин</FormLabel>
                            <Input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </FormControl>
                        <FormControl id="password" isRequired mt={4}>
                            <FormLabel>Пароль</FormLabel>
                            <Input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </FormControl>
                        <Button type="submit" colorScheme="blue" width="full" mt={4}>
                            Войти
                        </Button>
                        <Divider/>
                        <Text textAlign="center" mt={4}>Нет аккаунта?</Text>
                        <Button colorScheme="teal" variant="outline" width="full" mt={2} onClick={onRegister}>
                            Зарегистрироваться
                        </Button>
                    </form>
                </VStack>
            </Box>
        </Center>
    )
}

export default LoginPage