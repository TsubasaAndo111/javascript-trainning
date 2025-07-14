
export function counterGroup() {
    // counterGroup()で作られた複数のcounterを管理するため
    const counters = [];
  
    return {
      newCounter: function () {
        let n = 0;
  
        // クロージャの関数を持つオブジェクトを定義
        const counterObj = {
          count: function () {
            return n++;
          },
          reset: function () {
            n = 0;
          },
          getValue: function () {
            return n;
          },
        };
        
        // counterGroup()で作られた複数のcounterを管理するため
        counters.push(counterObj);
        
        return counterObj;
      },
  
      total: function () {
        return counters.reduce((sum, c) => sum + c.getValue(), 0);
      },
  
      average: function () {
        if (counters.length === 0) {
          throw new TypeError("No counters exist.");
        }
        return this.total() / counters.length;
      },
  
      variance: function () {
        if (counters.length < 2) {
          throw new TypeError("At least two counters are required.");
        }
  
        const avg = this.average();
        const sumSquaredDiffs = counters.reduce((sum, c) => {
          const diff = c.getValue() - avg;
          return sum + diff * diff;
        }, 0);
  
        return sumSquaredDiffs / counters.length;
      },
    };
  }
  
