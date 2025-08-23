import axiosInstance from "../services/setupAxios";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Context } from "../main";

import { FixedSizeList as List } from "react-window";

const Doctors = () => {
  const [doctors, setDoctors] = useState([]);
  const { isAuthenticated } = useContext(Context);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const { data } = await axiosInstance.get(
          `${import.meta.env.VITE_API_BURL}/api/v1/user/doctors`
        );
        setDoctors(data.doctors);
      } catch (error) {
        toast.error(error.response?.data?.message || "Error fetching doctors");
      }
    };
    fetchDoctors();
  }, []);

  // render each doctor row
  const Row = ({ index, style }) => {
    const element = doctors[index];
    return (
      <div
        style={{
          ...style,                     // ✅ important for positioning
          border: "2px solid grey",
          padding: "10px",
          height: "240px",              // ✅ matches itemSize (250px minus padding)
          boxSizing: "border-box",
          borderRadius: "8px",
          marginBottom: "8px",
          background: "#fafafa",
        }}
      >
        <img
          src={element.docAvatar?.url}
          alt="doctor avatar"
          style={{ width: "100px", height: "100px", borderRadius: "50%" }}
        />
        <h4>
          {index + 1}. {`${element.firstName} ${element.lastName}`}
        </h4>
        <p>Email: <span>{element.email}</span></p>
        <p>Phone: <span>{element.phone}</span></p>
        <p>Department: <span>{element.doctorDepartment}</span></p>
        <p>Gender: <span>{element.gender}</span></p>
      </div>
    );
  };

  return (
    <section className="page doctors">
      <h5 style={{ color: "grey", textAlign: "center" }}>
        Our life saving Doctors : Salute them now!
      </h5>
      <div
        style={{
          border: "0px solid grey",
          padding: 5,
          borderRadius: 4,
          display: "flex",
          justifyContent: "center",
        }}
      >
        {doctors.length > 0 ? (
          <List
            height={500}               // viewport height
            itemCount={doctors.length} // total doctors
            itemSize={250}             // must match row height
            width={"50%"}
            style={{
              borderRadius: "8px",
              padding: 5,
              background: "white",
            }}
          >
            {Row}
          </List>
        ) : (
          <h1>No Registered Doctors Found!</h1>
        )}
      </div>
    </section>
  );
};

export default Doctors;
