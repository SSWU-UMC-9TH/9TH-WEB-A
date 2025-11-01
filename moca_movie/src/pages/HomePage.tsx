import { useState } from "react";
import useGetLpList from "../hooks/queries/useGetLpList";

const HomePage = () => {
  const [search, setSearch] = useState("");
  const { data, isPending, isError } = useGetLpList({
    search,
  });

  console.log({ data });

  if (isPending) {
    return <div>로딩중...</div>;
  }

  if (isError) {
    return <div>에러 발생!</div>;
  }

  return (
    <div className="mt-20">
      <input value={search} onChange={(e) => setSearch(e.target.value)} />
      {data?.map((lp) => <h1>{lp.title}</h1>)}
    </div>
  )
}


export default HomePage;
