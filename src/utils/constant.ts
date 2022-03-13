/** ルート名 */
export const enum RouteName {
  /** 404 NotFound */
  NotFound = "not-found",
  /** 管理 ログイン */
  AdminLogin = "admin-login",
  /** 管理 コンテンツ一覧 */
  AdminContentList = "admin-content-list",
  /** 管理 コンテンツ新規 */
  AdminContentNew = "admin-content-new",
  /** 管理 コンテンツ詳細 */
  AdminContent = "admin-content",
  /** 管理 タグ一覧 */
  AdminTagList = "admin-tag-list",
  /** 管理 タグ新規 */
  AdminTagNew = "admin-tag-new",
  /** 管理 タグ詳細 */
  AdminTag = "admin-tag",
  /** 管理 ユーザ一覧 */
  AdminUserList = "admin-user-list",
  /** 管理 ユーザ新規 */
  AdminUserNew = "admin-user-new",
  /** 管理 ユーザ詳細 */
  AdminUser = "admin-user",
  /** 公開 コンテンツ一覧 */
  PublicContentList = "public-content-list",
}

/** Vuex Store アクション名 */
export const enum ActionsName {
  /** アラート設定 */
  SetAlert = "setAlert",
  /** アラートクリア */
  ClearAlert = "clearAlert",
  /** インフォレベルのアラート */
  AlertInfo = "alertInfo",
  /** サクセスレベルのアラート */
  AlertSuccess = "alertSuccess",
  /** エラーレベルのアラート */
  AlertError = "alertError",
  /** タイムアウトID設定 */
  SetTimeoutId = "setTimeoutId",
  /** タイムアウトIDクリア */
  ClearTimeoutId = "clearTimeoutId",
  /** ローディング設定 */
  SetLoading = "setLoading",
  /** ローディングクリア */
  ClearLoading = "clearLoading",
}

/** アラートタイプ */
export const enum AlertType {
  /** インフォ */
  Info = "info",
  /** サクセス */
  Success = "success",
  /** エラー */
  Error = "error",
}

/** 年月日フォーマットタイプ */
export const enum DateFormatType {
  /** 日付 */
  Date = "YYYY-MM-DD",
}

/** タイマー */
export const enum Timer {
  /** 遅延（ミリ秒） */
  Delay = 4000,
}

/** HTTPヘッダー */
export const enum HttpHeader {
  /** APIトークン */
  XIdToken = "x-id-token",
}

/** HTTPステータスコード */
export const enum HttpStatusCode {
  /** 200 OK */
  Ok = 200,
  /** 400 Bad Request */
  BadRequest = 400,
  /** 401 Unauthorized */
  Unauthorized = 401,
  /** 500 Internal Server Error */
  InternalServerError = 500,
}

/** ロケール */
export const enum Locale {
  /** 日本語 */
  JaJP = "ja-JP",
}
