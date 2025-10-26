import { useEffect, useState } from "react";
import type { ResponseMyInfoDto } from "../types/auth";
import { getMyInfo } from "../apis/auth";

const MyPage = () => {
  const [data, setData] = useState<ResponseMyInfoDto | null>(null);

  useEffect(() => {
    const getData = async () => {
      const response = await getMyInfo();
      console.log(response);

      setData(response);
    };

    getData();
  }, []);

  if (!data) return <div>Loading...</div>;

  return (
    <div>
      {data.data.name} {data.data.email}
    </div>
  );
};

export default MyPage;
