import Hyperlink from './Hyperlink';

export interface Folder {
	topics: Hyperlink[];

	prev?: Hyperlink;

	next?: Hyperlink;
}

export default Folder;
