import { Tag } from "@/utils/model";
import { api } from "@/utils/api";
import { key } from "@/store";

export const useTag = () => {
  const fetchTags = async (query?: {[key:string]: string}) => {
    const params = new URLSearchParams();
    for (const key in query) {
      if (query[key]) params.append(key, query[key]);
    }
    const queryString = params.toString() ? `?${params.toString()}` : ""
    const { data: tags } = await api.get<Array<Tag>>("/tags" + queryString);
    return tags;
  };

  const fetchTagById = async (tagId: number) => {
    const { data: tag } = await api.get<Tag>(`/tags/${tagId}`);
    return tag;
  };

  const createTag = async (tag: Tag) => {
    const { data: createdTag } = await api.post<Tag>("/tags", tag);
    return createdTag;
  };

  const updateTag = async (tag: Tag) => {
    const { data: updatedTag } = await api.put<Tag>(`/tags/${tag.id}`, tag);
    return updatedTag;
  };

  const deleteTag = async (id: number) => {
    const { data: deletedTag } = await api.delete<Tag>(`/tags/${id}`);
    return deletedTag;
  };

  return {
    fetchTags,
    fetchTagById,
    createTag,
    updateTag,
    deleteTag,
  };
};
