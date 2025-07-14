export function PositiveNumber(initialValue) {
    if (initialValue <= 0) {
      throw new Error("require : x > 0");
    }
  
    let x = initialValue;
  
    return {
      getX() {
        return x;
      },
      setX(newValue) {
        if (newValue <= 0) {
          throw new Error("require : x > 0");
        }
        x = newValue;
      }
    };
  }
  