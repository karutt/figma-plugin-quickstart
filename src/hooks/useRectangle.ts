import { useCallback, useEffect, useState } from 'react';

export function useRectangle() {
    const [count, setCount] = useState<string>('5');

    const onCreate = useCallback(() => {
        parent.postMessage(
            {
                pluginMessage: { type: 'create-rectangles', count: parseInt(count, 10) },
                pluginId: '*',
            },
            '*',
        );
    }, [count]);

    const onCancel = useCallback(() => {
        parent.postMessage({ pluginMessage: { type: 'cancel' }, pluginId: '*' }, '*');
    }, []);

    useEffect(() => {
        window.onmessage = event => {
            const { type, message } = event.data.pluginMessage || {};
            if (type === 'create-rectangles') {
                console.log(`Figma Says: ${message}`);
            }
        };
    }, []);

    return { count, setCount, onCreate, onCancel };
}
