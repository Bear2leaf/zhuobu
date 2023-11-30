const localStorage: {
    gameState: any,
    lang?: string,
    clear: () => void,
} = {
    gameState: undefined,
    lang: undefined,
    clear: () => {
        localStorage.gameState = undefined;
        localStorage.lang = undefined;
    }
}
export default localStorage;