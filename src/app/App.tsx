import { Button, Center, Heading, NumberInput } from '@chakra-ui/react';
import React from 'react';
import { HiHeart } from 'react-icons/hi';

function App() {
    const [count, setCount] = React.useState<string>('5');

    const onCreate = () => {
        parent.postMessage(
            {
                pluginMessage: { type: 'create-rectangles', count: parseInt(count, 10) },
                pluginId: '*',
            },
            '*',
        );
    };

    const onCancel = () => {
        parent.postMessage({ pluginMessage: { type: 'cancel' }, pluginId: '*' }, '*');
    };

    React.useEffect(() => {
        window.onmessage = event => {
            const { type, message } = event.data.pluginMessage;
            if (type === 'create-rectangles') {
                console.log(`Figma Says: ${message}`);
            }
        };
    }, []);

    return (
        <Center flexDir="column" gap="4" h="100vh">
            <Center gap={2}>
                <HiHeart />
                <Heading>Rectangle Creator</Heading>
            </Center>
            <NumberInput.Root
                width={100}
                value={count}
                onValueChange={({ value }) => setCount(value)}
            >
                <NumberInput.Control />
                <NumberInput.Input />
            </NumberInput.Root>
            <Center gap={4}>
                <Button color="white" bg="blue.solid" id="create" onClick={onCreate}>
                    Create
                </Button>
                <Button onClick={onCancel}>Cancel</Button>
            </Center>
        </Center>
    );
}

export default App;
