import React, {useState} from 'react'
import {Box, Button, Center, FormControl, FormLabel, Heading, Input, useToast, VStack} from '@chakra-ui/react'
import {useNavigate} from 'react-router-dom'
import {registerPost} from '@/api/register.ts'
import {redirectToLogin} from '@/routing/navigation.ts'

const Register = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const toast = useToast()
    const navigate = useNavigate()

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            const response = await registerPost({username, password})

            toast({
                title: 'Успешно',
                description: 'Вы успешно зарегистрировались',
                status: 'success',
                duration: 9000,
                isClosable: true,
            })

            redirectToLogin(navigate)

        } catch (error) {
            let message = 'Произошла неизвестная ошибка'
            if (error.response && error.response.data) {
                message = error.response.data.message ? error.response.data.message : message
            } else if (error.request) {
                message = 'Ответ от сервера не был получен'
            }

            toast({
                title: 'Ошибка',
                description: message,
                status: 'error',
                duration: 3500,
                isClosable: true,
            })
        }
    }

    return (
        <Center height="89vh">
            <Box p={8} maxWidth="30%" borderWidth={2} borderRadius={8} boxShadow="lg" bg="gray.50">
                <VStack spacing={5} align="stretch">
                    <Heading textAlign="center">Регистрация</Heading>
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
                            Зарегистрироваться
                        </Button>
                    </form>
                </VStack>
            </Box>
        </Center>
    )
}

export default Register