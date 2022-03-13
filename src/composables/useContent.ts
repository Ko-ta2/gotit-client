import { Content } from "@/utils/model";
import { api } from "@/utils/api";

export const useContent = () => {
  /** コンテンツ取得 */
  const fetchContents = async (query?: {[key:string]: string}) => {
    const params = new URLSearchParams();
    for (const key in query) {
      if (query[key]) params.append(key, query[key]);
    }
    const queryString = params.toString() ? `?${params.toString()}` : ""
    const { data: contents } = await api.get<Array<Content>>("/contents" + queryString);
    return contents;
  };

  /** コンテンツ詳細取得 */
  const fetchContentById = async (contentId: number) => {
    const { data: content } = await api.get<Content>(`/contents/${contentId}`);
    return content;
  };

  /** コンテンツ登録 */
  const createContent = async (content: Content) => {
    const { data: createdContent } = await api.post<Content>("/contents", content);
    return createdContent;
  };

  /** コンテンツ更新 */
  const updateContent = async (content: Content) => {
    const { data: updatedContent } = await api.put<Content>(`/contents/${content.id}`, content);
    return updatedContent;
  };

  /** コンテンツ削除 */
  const deleteContent = async (id: number) => {
    const { data: deletedContent } = await api.delete<Content>(`/contents/${id}`);
    return deletedContent;
  };

  return {
    fetchContents,
    fetchContentById,
    createContent,
    updateContent,
    deleteContent,
  };
};
