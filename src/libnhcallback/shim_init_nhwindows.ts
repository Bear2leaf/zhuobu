export default class shim_init_nhwindows {

    decode(...args: unknown[]) {
        console.log(`${shim_init_nhwindows.name} is decoded, args: ${args}`)
    }
    execute() {
        console.log(`${shim_init_nhwindows.name} is executed`)
    }
}