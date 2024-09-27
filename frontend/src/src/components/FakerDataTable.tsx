import {
    Box, Button, Flex, Input, Select,
    Slider, SliderFilledTrack, SliderThumb, SliderTrack,
    Table, Tbody, Td, Text, Th, Thead, Tr
} from "@chakra-ui/react";
import { CreateFakeDataResponse } from "../models/CreateFakeDataResponse.ts";
import React, { useEffect, useRef, useState } from "react";
import {ExportDataToCsv} from "../services/exportService.ts";

interface FakerDataTableProps {
    data: CreateFakeDataResponse[];
    onGenerate: (params: {
        region: string;
        errorsCount: number;
        seed: number;
    }) => Promise<CreateFakeDataResponse[]>;
}

export default function FakerDataTable({ data, onGenerate }: FakerDataTableProps) {
    const [users, setUsers] = useState<CreateFakeDataResponse[]>(data);
    const [loading, setLoading] = useState(false);
    const [region, setRegion] = useState<string>("ru");
    const [errors, setErrors] = useState<number>(0);
    const [seed, setSeed] = useState<number>(6905093);
    const [page, setPage] = useState(1);
    const tableRef = useRef<HTMLDivElement>(null);

    const fetchMoreData = async () => {
        if (loading) return;

        setLoading(true);
        try {
            const newUsers = await onGenerate({ region, errorsCount: errors, seed });
            setUsers(prevData => [...prevData, ...newUsers]);
            setPage(page + 1);
        } catch (error) {
            console.error("Error fetching new fake users:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleScroll = () => {
        if (tableRef.current) {
            const { scrollTop, scrollHeight, clientHeight } = tableRef.current;
            if (scrollTop + clientHeight >= scrollHeight && !loading) {
                fetchMoreData();
            }
        }
    };

    useEffect(() => {
        const tableNode = tableRef.current;
        if (tableNode) {
            tableNode.addEventListener("scroll", handleScroll);
        }
        return () => {
            if (tableNode) {
                tableNode.removeEventListener("scroll", handleScroll);
            }
        };
    }, [page, loading]);

    const handleGenerate = async () => {
        try {
            const users = await onGenerate({ region, errorsCount: errors, seed });
            setUsers(users);
        } catch (error) {
            console.error("Error fetching new fake users:", error);
        }
    };

    const handleCustomSeedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;

        const regex = /^[0-9]*\.?[0-9]*$/;

        if (regex.test(value)) {
            setSeed(Number(value));
        } else {
            console.error("Please, enter only number format data!");
        }
    };

    const handleRandomSeedChange = () => {
        setSeed(Math.floor(Math.random() * 10000000));
    };

    const handleExport = () => {
        const formattedUsersData: CreateFakeDataResponse[] = users.map((user, index) => ({
            number: index + 1,
            id: user.id,
            fullName: {
                firstName: user.fullName.firstName,
                lastName: user.fullName.lastName
            },
            address: {
                streetAddress: user.address.streetAddress,
                streetName: user.address.streetName,
                city: user.address.city,
                state: user.address.state,
                country: user.address.country,
            },
            phoneNumber: user.phoneNumber,
        }));
        
        console.log(formattedUsersData);

        ExportDataToCsv(formattedUsersData);
    }

    return (
        <Box>
            <Flex direction="column" align="center" mt={6} mb={4}>
                <Flex align="center" justify="space-between" width="80%" p={4} bg="gray.100" mb={4}>
                    <Flex align="center" gap={3}>
                        <Text>Region:</Text>
                        <Select value={region} onChange={(e) => setRegion(e.target.value)} mr={4}>
                            <option value="en">USA</option>
                            <option value="ru">Russian</option>
                            <option value="ua">Ukrainian</option>
                        </Select>
                    </Flex>

                    <Flex align="center" gap={5}>
                        <Text>Errors:</Text>
                        <Slider value={errors} onChange={setErrors} max={800} width="150px" mr={4}>
                            <SliderTrack>
                                <SliderFilledTrack />
                            </SliderTrack>
                            <SliderThumb />
                        </Slider>
                    </Flex>

                    <Flex>
                        <Input value={seed} isReadOnly={false} onChange={handleCustomSeedChange} width="150px" mr={4} />
                        <Button onClick={handleRandomSeedChange}>🔀</Button>
                    </Flex>

                    <Button colorScheme="teal" onClick={handleGenerate} mr={4}>Generate</Button>
                    <Button colorScheme="teal" onClick={handleExport}>Export</Button>
                </Flex>
            </Flex>

            <Box width="80%" height="600px" margin="0 auto" mt={5} ref={tableRef} overflowY="scroll">
                <Table variant="simple" size="sm">
                    <Thead>
                        <Tr>
                            <Th color="green.500" position="sticky" top={0} bg="white" zIndex={1}>Num.</Th>
                            <Th color="green.500" position="sticky" top={0} bg="white" zIndex={1}>Identifier</Th>
                            <Th color="green.500" position="sticky" top={0} bg="white" zIndex={1}>Full Name</Th>
                            <Th color="green.500" position="sticky" top={0} bg="white" zIndex={1} width="xl">Address</Th>
                            <Th color="green.500" position="sticky" top={0} bg="white" zIndex={1}>Phone</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {users.map((row, index) => (
                            <Tr key={index}>
                                <Td>{index + 1}</Td>
                                <Td>{row.id}</Td>
                                <Td>{row.fullName.firstName} {row.fullName.lastName}</Td>
                                <Td>
                                    {`${row.address.country}, 
                                    ${row.address.state}, 
                                    ${row.address.city}, 
                                    ${row.address.streetName}, 
                                    ${row.address.streetAddress}`}
                                </Td>
                                <Td>{row.phoneNumber}</Td>
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
            </Box>
        </Box>
    );

}
