import {Flex, Text} from '@chakra-ui/react'

const Header = () => {
    return (
        <Flex
            as="header"
            width="100%"
            align="center"
            justify="center"
            padding="1"
            bg="blue.500"
            color="white"
        >
            <Text fontSize="2xl" fontWeight="bold" >
                THOUGHT
            </Text>
        </Flex>
    )
}

export default Header