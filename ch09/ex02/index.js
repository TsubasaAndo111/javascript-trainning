export class C {
    #count = 0;
  
    get x() {
      return this.#count++;
    }
  }
  