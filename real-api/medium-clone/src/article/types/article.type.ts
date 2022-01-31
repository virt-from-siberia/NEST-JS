import { ArticleEntity } from '../article.entity';

export type ArticcleType = Omit<
  ArticleEntity,
  'updateTimeStamp'
>;
