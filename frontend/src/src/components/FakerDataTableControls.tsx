import {Box, Button, Flex, Input, Select, Slider, SliderFilledTrack, SliderThumb, SliderTrack} from "@chakra-ui/react";
import {useState} from "react";

interface FakerTableProps {
    onGenerate: (params: { 
        region: string;
        errorsCount: number;
        seed: number;
    }) => void;
    onExport: () => void;
}

export default function FakerDataTableControls({ onGenerate, onExport } : FakerTableProps)
{
    const [region, setRegion] = useState<string>("USA");
    const [errors, setErrors] = useState<number>(2);
    const [seed, setSeed] = useState<number>(6905093);

    const handleGenerate = () => {
        onGenerate({ region, errorsCount: errors, seed });
    };

    const handleSeedChange = () => {
        const newSeed = Math.floor(Math.random() * 10000000);
        setSeed(newSeed);
    };
    
    return (
        <Flex align="center" justify="space-between" p={4} bg="gray.100" mb={4}>
            <Flex>
                <Select value={region} onChange={(e) => setRegion(e.target.value)} mr={4}>
                    <option value="USA">USA</option>
                    <option value="Poland">Poland</option>
                </Select>
                <Box>
                    <Slider value={errors} onChange={setErrors} max={800} width="150px" mr={4}>
                        <SliderTrack>
                            <SliderFilledTrack />
                        </SliderTrack>
                        <SliderThumb />
                    </Slider>
                </Box>
                <Input value={seed} readOnly width="100px" mr={4} />
                <Button onClick={handleSeedChange}>🔄</Button>
            </Flex>
            <Button onClick={handleGenerate} mr={4}>Generate</Button>
            <Button onClick={onExport}>Export</Button>
        </Flex>
    );
}