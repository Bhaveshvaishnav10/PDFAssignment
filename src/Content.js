import React, { useEffect, useState } from "react";
import { useParams } from "react-router";

const Content = () => {
  const [error, setError] = useState(null);
  const [data, setdata] = useState();

  let id = useParams();
  console.log("id", id);

  function readCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(";");
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == " ") c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
  }

  useEffect(() => {
    var token = readCookie("Login");
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
    };
    fetch(
      "https://ctapi.kilobytetech.com/api/session?file=" + id.id,
      requestOptions
    )
      .then((res) => res.json())
      .then(
        (result) => {
          setdata(result);
          console.log(result);
        },

        (error) => {
          setError(error);
        }
      );
  }, []);

 
  return (
    <div>
      <h1>Tracked Data </h1>
      <h6>File Uploaded Successfully</h6>
      

    </div>
  );
};

export default Content;
