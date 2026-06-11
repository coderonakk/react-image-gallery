import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";

const App = () => {
  const [userData, setUserData] = useState([]);

  const [index, setIndex] = useState(1)

  const getdata = async () => {
    const response = await axios.get(`https://picsum.photos/v2/list?page=${index}&limit=10`,);
    setUserData(response.data);
  };

  useEffect(function () {
    getdata()
  }, [index])


  let printUserData = <h3 className="text-gray-400 absolute top-1/2 left-1/2 font-semibold" >Loading...</h3>

  if (userData.length > 0) {
    printUserData = userData.map(function (elem, idx) {
      return (
        <div key={idx}>
          <a href={elem.url} target="_blank">
            <div className="h-50 w-60 ">
              <img
                className="active:scale-95 h-full w-full object-cover rounded-2xl"
                src={elem.download_url}
                alt=""
              />
            </div>
            <h2 className="text-lg font-semibold flex justify-center m-2">📷: {elem.author}</h2>
          </a>
        </div>
      );
    });
  }

  return (
    <div className="bg-[url('https://images.unsplash.com/photo-1569470451072-68314f596aec?q=80&w=1331&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')]   text-white h-screen overflow-auto">

      <div className="flex flex-wrap gap-5 mt-10 justify-center h-[80%]">{printUserData}</div>

      <div className="flex justify-center gap-10 m-5">
        <button onClick={() => {
          if (index > 1) {
            setUserData([])
            setIndex(index - 1)
          }
        }}
          className="bg-white flex text-black text-lg font-bold rounded active:scale-95 cursor-pointer px-5 py-3" >Previous</button>

        <h3 className="mt-3">Page {index}</h3>

        <button onClick={() => {
          setUserData([])
          setIndex(index + 1)

        }}
          className="bg-white flex text-black text-lg font-bold rounded active:scale-95 cursor-pointer px-5 py-3" >Next</button>
      </div>
    </div>
  );
};

export default App;
