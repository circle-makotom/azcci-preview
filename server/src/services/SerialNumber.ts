class SerialNumber {
    private counter: number = 0;

    constructor(init: number = 0) {
        this.counter = init;
    }

    public getNewSerialNumber(): number {
        return this.counter++;
    }
}

export { SerialNumber };
