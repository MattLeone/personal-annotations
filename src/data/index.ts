import { crimeAndPunishment } from './crime-and-punishment.ts';
import crimeAndPunishmentCover from '../assets/crime-and-punishment.jpg';
import type { Book } from '../types/books';

export const books: Book[] = [
  {
    ...crimeAndPunishment,
    coverImage: crimeAndPunishmentCover,
  } as Book,
];

export const getBookBySlug = (slug: string): Book | undefined => {
  return books.find(book => book.id === slug);
};

export const getChapterById = (bookSlug: string, chapterId: number) => {
  const book = getBookBySlug(bookSlug);
  return book?.chapters.find(chapter => chapter.id === chapterId);
};