import dayjs from "dayjs";
import { DateFormatType } from "@/utils/constant";

/** フォーマット */
export class Format {
  /** 日付フォーマット */
  static toDate(date: string | number | Date) {
    return dayjs(date).format(DateFormatType.Date);
  }

  /** Byte単位変換 */
  static convertByteUnit(bytes: number, decimals = 2) {
    if (bytes === 0) return "0 Bytes";

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
  }

  /** 公開フラグ */
  static isPublished(flag: boolean) {
    return flag ? "公開済み" : "";
  }

  /** 有効フラグ */
  static isValid(flag: boolean) {
    return flag ? "有効" : "";
  }
}
