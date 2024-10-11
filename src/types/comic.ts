import { TAuthor } from "./author";
import { TCategory } from "./category";
import { TCollection } from "./collection";
import { TPublisher } from "./publisher";

export type TComic = {
  title?: string;
  releaseDate?: number | Date;
  description?: string;
  id?: string;
  tome?: number;
  picture?: string;
  Collection?: TCollection;
  collectionId?: number;
  Publisher?: TPublisher;
  publisherId?: number;
  Authors?: TAuthor[];
  Categories?: TCategory[];
  currentAuthorsId?: string[];
  currentCategoriesId?: string[];
  comicAssociationsRecordtype?: string;
  comicAssociationsName?: string;
};

export type TComicAuthorCategory = {
  authorId?: number;
  categoryId?: number;
};
