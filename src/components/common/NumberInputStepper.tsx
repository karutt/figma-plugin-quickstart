import { HStack, IconButton, NumberInput } from '@chakra-ui/react';
import { LuMinus, LuPlus } from 'react-icons/lu';

interface NumberInputStepperProps {
    value: string;
    setValue: (v: string) => void;
}

export function NumberInputStepper({ value, setValue }: NumberInputStepperProps) {
    return (
        <NumberInput.Root
            value={value}
            onValueChange={({ value }) => setValue(value)}
            unstyled
            spinOnPress={false}
        >
            <HStack gap="2">
                <NumberInput.DecrementTrigger asChild>
                    <IconButton aria-label="decrement" size="sm" variant="outline">
                        <LuMinus />
                    </IconButton>
                </NumberInput.DecrementTrigger>
                <NumberInput.ValueText textAlign="center" fontSize="lg" minW="3ch" />
                <NumberInput.IncrementTrigger asChild>
                    <IconButton aria-label="increment" size="sm" variant="outline">
                        <LuPlus />
                    </IconButton>
                </NumberInput.IncrementTrigger>
            </HStack>
        </NumberInput.Root>
    );
}
