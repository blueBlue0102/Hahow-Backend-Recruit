export class Hero {
  /**
   * Hero ID
   * @example '1'
   */
  id: string;

  /**
   * Hero Name
   * @example 'Daredevil'
   */
  name: string;

  /**
   * Hero Image
   * @example 'http://i.annihil.us/u/prod/marvel/i/mg/6/90/537ba6d49472b/standard_xlarge.jpg'
   */
  image: string;

  /**
   * Hero Profile
   */
  profile?: {
    /**
     * str
     * @example 2
     */
    str: number;

    /**
     * int
     * @example 7
     */
    int: number;

    /**
     * agi
     * @example 9
     */
    agi: number;

    /**
     * luk
     * @example 7
     */
    luk: number;
  };
}
