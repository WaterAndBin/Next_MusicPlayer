export interface SongsType {
  id: number;
  singer: string;
  url: string;
  title: string;
}

const songs: SongsType[] = [
  {
    id: 0,
    singer: 'Daisy',
    url: '/mp3/STEREO DIVE FOUNDATION - Daisy.ogg',
    title: 'STEREO DIVE FOUNDATION'
  },
  {
    id: 1,
    singer: 'Post Humorous',
    url: '/mp3/Gus Dapperton - Post Humorous.ogg',
    title: 'Gus Dapperton'
  },
  {
    id: 2,
    singer: 'Walk Off the Earth',
    url: '/mp3/Walk Off the Earth - Fifth Avenue.ogg',
    title: 'Fifth Avenue'
  }
];

export default songs;
