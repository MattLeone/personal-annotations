export interface Chapter {
    id: number;
    title: string;
    content: string;
    description?: string;
    annotations?: Annotation[];
  }
  
export interface Book {
    id: string;
    title: string;
    author: string;
    coverImage: string;
    chapters: Chapter[];
    description?: string;
    altTitle?: string;
}

export interface Annotation {
  id: string;
  chapterId: number;
  startIndex: number;
  endIndex: number;
  type: 'symbolic' | 'cultural' | 'literary' | 'psychological' | 'character' | 'ironic' | 'plot';
  title: string;
  content: string;
  source: string;
}