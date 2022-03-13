import { User } from "@/utils/model";

export const useUser = () => {
  const fetchUsers = async () => {
    const users: User[] = [];

    const testData: User[] = [];
    testData.push(
      {
        id: "1",
        name: "ユーザ001",
        mailAddress: "user001@gmail.com",
        roleId: "1",
        isValid: true
      },
      {
        id: "2",
        name: "ユーザ002",
        mailAddress: "user002@gmail.com",
        roleId: "2",
        isValid: true
      },
      {
        id: "3",
        name: "ユーザ003",
        mailAddress: "user003@gmail.com",
        roleId: "1",
        isValid: false
      },
    );

    return testData;
  };

  const createUser = async (user: User) => {
    window.alert("登録しました。");
  };

  const deleteUser = async (id: string) => {
    if (window.confirm("削除します。よろしいですか。")) {
      window.alert("削除しました。");
    }
  };

  return {
    fetchUsers,
    createUser,
    deleteUser,
  };
};
