export class Counter{
    constructor(){
        this.value = 0
    }

    count(){
        this.value++
        return this.value
    }

    reset(){
        this.value = 0;
        return this.value
    }
}
