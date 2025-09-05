class GuessingGame {
    constructor() {
      this.min;
      this.max;
      this.middle;
    }
    
    setRange(min, max) {
      if (this.min < 0) throw new Error(`min should be >= 0`);
      if (this.max < 0) throw new Error(`max should be > 0`);
      this.min = min;
      this.max = max;
      this.middle = Math.round((this.min + this.max) / 2);
    }

    guess() {
      return this.middle;
    }

    lower() {
      this.max = this.middle;
      this.middle = Math.round((this.min + this.max) / 2);
    }

    greater() {
      this.min = this.middle;
      this.middle = Math.round((this.min + this.max) / 2);
    }
}

module.exports = GuessingGame;
