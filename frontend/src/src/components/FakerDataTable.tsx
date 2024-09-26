import {Table, Tbody, Td, Th, Thead, Tr} from "@chakra-ui/react";
import {CreateFakeDataResponse} from "../models/CreateFakeDataResponse.ts";

interface FakerDataTableProps {
    data: CreateFakeDataResponse[];
}

export default function FakerDataTable({ data } : FakerDataTableProps)
{
    return (
        <>
            <Table variant="simple" size="sm">
                <Thead>
                    <Tr>
                        <Th>Num.</Th>
                        <Th>Identifier</Th>
                        <Th>Full Name</Th>
                        <Th>Address</Th>
                        <Th>Phone</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {data.map((row, index) => (
                        <Tr key={index}>
                            <Td>{row.number}</Td>
                            <Td>{row.id}</Td>
                            <Td>{row.fullName.firstName} {row.fullName.middleName} {row.fullName.lastName}</Td>
                            <Td>{row.address.country}, {row.address.state}, {row.address.city}, {row.address.streetName}, {row.address.streetAddress}</Td>
                            <Td>{row.phoneNumber}</Td>
                        </Tr>
                    ))}
                </Tbody>
            </Table>
        </>
    );
}