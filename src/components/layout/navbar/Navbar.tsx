import {Box, Flex, Link, Tab, TabList} from '@chakra-ui/react'
import {Link as RouterLink, useNavigate} from 'react-router-dom'
import {redirectToLogin} from '@/routing/navigation.ts'
import {ROUTES} from '@/routing/routes.ts'

const Navbar = () => {
    const navigate = useNavigate()

    const handleLogout = () => {
        sessionStorage.removeItem('userData')

        redirectToLogin(navigate)
    }

    return (
        <Flex
            as="nav"
            align="center"
            justify="center"
            wrap="wrap"
            bg="blue.400"
            color="white"
            width="100%"
        >
            <Box display="flex" justifyContent="center" width="auto">
                <Link as={RouterLink} to={ROUTES.login} p={3}>
                    Логин
                </Link>
                <Link as={RouterLink} to={ROUTES.notes} p={3}>
                    Заметки
                </Link>
                <Link p={3} onClick={handleLogout}>
                    Выйти
                </Link>
            </Box>
        </Flex>
    )
}

export default Navbar