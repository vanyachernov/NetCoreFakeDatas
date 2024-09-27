import {
    Box, 
    Flex, 
    Text
} from "@chakra-ui/react";

export default function Header()
{
    return (
        <Box bg="green.600" p={4} color="white">
            <Flex align="center" justify="space-between">
                <Text fontSize="xl" color="white" fontWeight="bold">Faker Data</Text>
            </Flex>
        </Box>
    );
}