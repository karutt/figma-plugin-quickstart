import { NumberInputStepper } from '@/components/common/NumberInputStepper';
import { useRectangle } from '@/hooks/useRectangle';
import { Button, Center, Heading } from '@chakra-ui/react';
import React from 'react';
import { HiHeart } from 'react-icons/hi';

export const RectangleCreator: React.FC = () => {
    const { count, setCount, onCreate, onCancel } = useRectangle();

    return (
        <Center flexDir="column" gap="4" h="100vh">
            <Center gap={2}>
                <HiHeart />
                <Heading>Rectangle Creator!!</Heading>
            </Center>
            <NumberInputStepper value={count} setValue={setCount} />
            <Center gap={4}>
                <Button color="white" bg="blue.solid" id="create" onClick={onCreate}>
                    Create
                </Button>
                <Button onClick={onCancel}>Cancel</Button>
            </Center>
        </Center>
    );
};
