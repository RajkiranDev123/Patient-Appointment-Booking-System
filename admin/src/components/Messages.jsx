import axiosInstance from "../services/setupAxios";
import { useContext, useEffect, useState } from "react";

import { Context } from "../main";
import { Navigate } from "react-router-dom";
//pagination
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';


const Messages = () => {
  const [messages, setMessages] = useState([]);
  const { isAuthenticated } = useContext(Context);

  const fetchMessages = async (val) => {
    try {
      const { data } = await axiosInstance.get(
        `${import.meta.env.VITE_API_BURL}/api/v1/message/getall`, {
        headers: {
          "page": val
        }
      });
      setMessages(data.messages);
      setPageCount(data?.pagination.pageCount)
    } catch (error) {
      console.log(error.response.data.message);
    }
  };
  // pagination
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(1);
  const changePage = (event, value) => {
    fetchMessages(value)

    setPage(value)

  }
  //////////////////////////////
  useEffect(() => {

    fetchMessages();
  }, []);

  if (!isAuthenticated) {
    return <Navigate to={"/login"} />;
  }

  return (
    <section style={{textAlign:"center"}} className="page messages">
      <h1 style={{ color: "grey",fontSize:14 }}>MESSAGE</h1>
      <div className="banner">
        {messages && messages.length > 0 ? (
          messages.map((element) => {
            return (
              <div className="card" key={element._id}>
                <div className="details">
                  <p>
                    First Name: <span>{element.firstName}</span>
                  </p>
                  <p>
                    Last Name: <span>{element.lastName}</span>
                  </p>
                  <p>
                    Email: <span>{element.email}</span>
                  </p>
                  <p>
                    Phone: <span>{element.phone}</span>
                  </p>
                  <p>
                    Message:
                    <p>
                      <textarea rows="3" cols="20">
                        {element?.message}
                      </textarea>

                    </p>

                  </p>
                </div>
              </div>
            );
          })
        ) : (
          <h1 style={{ color: "red" }}>No Messages!</h1>
        )}
      </div>

      {/* pagination */}
      <div style={{ display: "flex", justifyContent: "center",marginTop:5 }}>
        <Stack spacing={2}>
          <Pagination color="primary" onChange={changePage} page={page} count={pageCount} />
        </Stack>

      </div>
      {/* pagination */}
    </section>
  );
};

export default Messages;