// __DEV__が未定義の場合はfalseとして扱う（esbuildのdefineで上書きされる想定）
declare const __DEV__: boolean;
const DEV = typeof __DEV__ !== 'undefined' ? __DEV__ : false;

if (DEV) {
    figma.showUI(`<script>window.location.href = "http://localhost:5173";</script>`);
} else {
    figma.showUI(__html__);
}

figma.ui.onmessage = msg => {
    console.log('Received message from UI:', msg);
    if (msg.type === 'create-rectangles') {
        const nodes = [];

        for (let i = 0; i < msg.count; i++) {
            const rect = figma.createRectangle();
            rect.x = i * 150;
            rect.fills = [{ type: 'SOLID', color: { r: 1, g: 0.5, b: 0 } }];
            figma.currentPage.appendChild(rect);
            nodes.push(rect);
        }

        figma.currentPage.selection = nodes;
        figma.viewport.scrollAndZoomIntoView(nodes);

        // This is how figma responds back to the ui
        figma.ui.postMessage({
            type: 'create-rectangles',
            message: `Created ${msg.count} Rectangles`,
        });
    }

    figma.closePlugin();
};
