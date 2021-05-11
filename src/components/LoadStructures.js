import React, { useEffect, useState } from "react";
import axios from "axios";
import authHeader from "../service/auth-header";
import StructuresTable from "../tables/StructuresTable";

export default function LoadStructures() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("/api/structures", {
        headers: authHeader(),
      })
      .then((response) => {
        setData(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
        setError(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) return "Loading...";
  if (error) return "Error!";

  return (
    <>
      <h3 style={{ marginTop: "12vh" }}>Structures Table</h3>
      <StructuresTable props={data} />
    </>
  );
}
