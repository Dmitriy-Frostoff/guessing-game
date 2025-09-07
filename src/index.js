/**
 * Class to automate the process of guessing the hidden number.
 * Under the hood it's based on binary search algorithm.
 *
 * Provides four methods to reach the hidden number via guessing as a game:
 * @method{(min: number, max: number) => void} setRange - define the guessing range [min; max]
 * @method{(void) => void} guess - get the mean of current min and max range values and check if that is the hidden number
 * @method{(void) => void} lower - if the hidden number is greater than current mean, use this method
 * @method{(void) => void} greater - if the hidden number is lower than current mean, use this method
 *
 * @throws - if @method{setRange} wasn't called after @class{GuessingGame} instance creating.
 *
 * @example
 *    ---set up---
 *    const hiddenNumber = 18;
 *    The max range value is set to 22.
 *    ---usage---
 *    const game = new GuessingGame();
 *    game.setRange(0, 22);
 *    @note min 0; max 22; middle 11
 *
 *    let result = game.guess();
 *    result 11, 11 < 18 => continue
 *    game.greater();
 *    @note min 11; max 22; middle 17
 *
 *    result = game.guess();
 *    result 17, 17 < 18 => continue
 *    game.greater();
 *    @note min 17; max 22; middle 20
 *
 *    result = game.guess();
 *    result 20, 20 > 18 => continue
 *    game.lower();
 *    @note min 17; max 20; middle 19
 *
 *    result = game.guess();
 *    result 19, 19 > 18 => continue
 *    game.lower();
 *    @note min 17; max 19; middle 18
 *
 *    result = game.guess();
 *    result 18, 18 === 18 => win
 *
 */
class GuessingGame {
  /** @type{number} - #min range number to guess */
  #min = -1;

  /** @type{number} - #max range number to guess */
  #max = -1;

  /** @type{number} - mean of @link{#min} and @link{#max} range numbers to guess */
  #middle = -1;

  /** @type{boolean} - private field to check if the @method{setRange} was called */
  #isSetRangeCalled = false;

  /**
   * Set range [ @link{min}; @link{max} ] to guess the number
   *
   * @param {number} min - min range number to guess
   * @param {number} max - max range number to guess
   * @returns {void} - no return expected
   *
   */
  setRange(min, max) {
    if (min < 0) throw new Error(`min should be >= 0`);
    if (max < 0) throw new Error(`max should be > 0`);

    this.#min = min;
    this.#max = max;
    this.#middle = Math.round((this.#min + this.#max) / 2);

    // set up the @link{#isSetRangeCalled} field
    this.#isSetRangeCalled = true;
  }

  /**
   * Attempt to guess the number (@note via binary search algorithm)
   *
   * @throws - if @method{setRange} was called before this method calling
   * @returns {number} - get the @link{middle} value
   *
   */
  guess() {
    // check that @method{setRange} was called
    if (!this.#isSetRangeCalled) {
      throw new Error(`call the 'setRange' method first!`);
    }

    return this.#middle;
  }

  /**
   * Handle the case when your attempt number (via @method{guess})
   * was greater than the hidden number.
   *
   * @throws - if @method{setRange} was called before this method calling
   * @returns {void} - no returns expected
   *
   */
  lower() {
    // check that @method{setRange} was called
    if (!this.#isSetRangeCalled) {
      throw new Error(`call the 'setRange' method first!`);
    }

    this.#max = this.#middle;
    this.#middle = Math.round((this.#min + this.#max) / 2);
  }

  /**
   * Handle the case when your attempt number (via @method{guess})
   * was lower than the hidden number.
   * @throws - if @method{setRange} was called before this method calling
   * @returns {void} - no returns expected
   *
   */
  greater() {
    // check that @method{setRange} was called
    if (!this.#isSetRangeCalled) {
      throw new Error(`call the 'setRange' method first!`);
    }

    this.#min = this.#middle;
    this.#middle = Math.round((this.#min + this.#max) / 2);
  }
}

module.exports = GuessingGame;
