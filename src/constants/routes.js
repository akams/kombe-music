/* eslint-disable react/display-name */
import { AiFillHome } from 'react-icons/ai';
import { IoIosAlbums } from 'react-icons/io';
import { FaSearch } from 'react-icons/fa';

export const SIGN_IN = '/signin';
export const SIGN_UP = '/signup';
export const SIGN_UP_END = '/confirmation-inscription';
export const HOME = '/';
export const PLAYER = '/player/:idAlbum';
export const ALBUMS = '/albums';
export const TEST_ALGOLIA = '/zoo-page';
export const PASSWORD_FORGET = '/pw-forget';
export const SEARCH = '/recherche';
export const SEARCH_ALBUM = '/recherche/album/:albumName';
export const SEARCH_AUTHOR = '/recherche/author/:author';
export const SEARCH_MUSIC = '/recherche/music/:idMusic';

export const AUTHOR_MUSIC = '/author/:author';
export const ALBUM_MUSIC = '/album/:albumName';

export const IN_APP_ROUTES = [
  {
    path: HOME,
    name: 'Accueil',
    icon: (className) => <AiFillHome className={className} />,
  },
  {
    path: ALBUMS,
    name: 'Albums',
    icon: (className) => <IoIosAlbums className={className} />,
  },
  {
    path: SEARCH,
    name: 'Recherche',
    icon: (className) => <FaSearch className={className} />,
  },
];
