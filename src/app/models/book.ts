import { Id, Date } from './primitives';

export interface Book {
  ID: Id;
  Description: string;
  Excerpt: string;
  PageCount: number;
  PublishDate: Date;
  Title: string;
}
