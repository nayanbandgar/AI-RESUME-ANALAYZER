import { useEffect, useState } from "react";
import axios from "axios";

export default function History() {

  const [history, setHistory] =
    useState([]);

  useEffect(() => {

    axios
      .get("http://127.0.0.1:8000/history")
      .then((res) => {

        setHistory(
          res.data.history
        );

      });

  }, []);

  return (

    <div>

      <h1>
        Analysis History
      </h1>

      {history.map((item) => (

        <div key={item._id}>

          <h3>
            {item.candidate_name}
          </h3>

          <p>
            {item.email}
          </p>

          <p>
            Score:
            {item.score}%
          </p>

        </div>

      ))}

    </div>
  );
}