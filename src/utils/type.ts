/** テーブルヘッダー */
export interface TableHeader {
  key: string;
  name: string;
  class?: string[];
}

/** ナビゲーションメニュー */
export interface NavMenu {
  routeName: string;
  pageName: string;
}

/** セレクトオプション */
export interface SelectOption {
  text: string;
  value: string;
}