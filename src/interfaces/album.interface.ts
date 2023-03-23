export interface Album {
  _id: string;
  name: string;
  artistId: string;
}

export interface ExternalAlbum {
  collectionId: number;
  collectionName: string;
}

export interface ExternalAlbumsResult {
  results: ExternalAlbum[];
}
