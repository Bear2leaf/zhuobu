/**
 * Seedable JavaScript random number generator
 * @link https://stackoverflow.com/a/424445 
 */
export default class SeedableRandom {
    private readonly m: number;
    private readonly a: number;
    private readonly c: number;
    private state: number;
    constructor(seed?: number) {
        // LCG using GCC's constants
        this.m = 0x80000000; // 2**31;
        this.a = 1103515245;
        this.c = 12345;

        this.state = seed !== undefined ? seed : Math.floor(Math.random() * (this.m - 1));
    }
    private nextInt() {
        this.state = (this.a * this.state + this.c) % this.m;
        return this.state;
    }

    /** 
     * returns in range [0,1]
     */
    nextFloat() {
        return this.nextInt() / (this.m - 1);
    }
    /**
     * returns in range [start, end): including start, excluding end
     * can't modulu nextInt because of weak randomness in lower bits
     */
    nextRange(start: number, end: number) {
        var rangeSize = end - start;
        var randomUnder1 = this.nextInt() / this.m;
        return start + Math.floor(randomUnder1 * rangeSize);
    }
    choice<T>(array: T[]): T {
        return array[this.nextRange(0, array.length)];
    }

}