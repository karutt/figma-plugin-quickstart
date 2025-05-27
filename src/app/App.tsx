import { Button, Center, Heading, Image, NumberInput } from '@chakra-ui/react';
import React from 'react';
import logo from '../assets/logo.svg';

function App() {
    const textbox = React.useRef<HTMLInputElement>(undefined);

    const countRef = React.useCallback((element: HTMLInputElement) => {
        if (element) element.value = '5';
        textbox.current = element;
    }, []);

    const onCreate = () => {
        const count = textbox.current ? parseInt(textbox.current.value, 10) : 0;
        parent.postMessage({ pluginMessage: { type: 'create-rectangles', count } }, '*');
    };

    const onCancel = () => {
        parent.postMessage({ pluginMessage: { type: 'cancel' } }, '*');
    };

    React.useEffect(() => {
        // This is how we read messages sent from the plugin controller
        window.onmessage = event => {
            const { type, message } = event.data.pluginMessage;
            if (type === 'create-rectangles') {
                console.log(`Figma Says: ${message}`);
            }
        };
    }, []);

    return (
        <Center flexDir="column" height="100vh" gap="4">
            <Center gap={2}>
                <Image src={logo} alt="Figma Plugin Logo" />
                <Heading>Rectangle Creator!</Heading>
            </Center>
            <NumberInput.Root defaultValue="10" width="100px">
                <NumberInput.Control />
                <NumberInput.Input ref={countRef} />
            </NumberInput.Root>
            <Center gap={4}>
                <Button id="create" onClick={onCreate} bg="blue.solid" color="white">
                    Create
                </Button>
                <Button onClick={onCancel}>Cancel</Button>
            </Center>
        </Center>
    );
}

export default App;
