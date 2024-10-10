export interface iPosts {
  id: number;
  title: string;
  body: string;
  userId: number;
  tags: string[];
  active: boolean;
}

export interface iJSONresponse {
  posts: iPosts[];
  total: number;
  skip: number;
  limit: number;
}
