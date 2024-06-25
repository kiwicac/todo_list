import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function Cdetails() {
  const { id } = useParams();
  const [data, setData] = useState([]);
  useEffect(() => {
    axios
      .get(`http://localhost:3000/details/${id}`)
      .then((response) => {
        setData(response.data);

      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <div>
      <div>{data.task}</div>
      {data.checked ? <div style={{color:"green"}}> task is done</div> : <div style={{color:"red"}}>task is not done</div>}

    </div>
  );
}

export default Cdetails;
