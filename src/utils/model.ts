/** コンテンツ */
export interface Content {
  id?: number;
  title?: string;
  tagId?: string;
  url?: string;
  updatedAt?: Date;
  isPublished?: boolean;
  tag?: {
    id: number;
    name: string;
  };
}

/** タグ */
export interface Tag {
  id?: number;
  name?: string;
}

/** ユーザ */
export interface User {
  id?: string;
  name?: string;
  mailAddress?: string;
  roleId?: string;
  isValid?: boolean;
}

/** ロール */
export interface Role {
  id?: number;
  name?: string;
}
