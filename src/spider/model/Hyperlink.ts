export interface Hyperlink {
	/**
	 * Accessible name.
	 */
	name: string;

	/**
	 * Target location.
	 */
	location?: URL;
}

export default Hyperlink;
