import axiosInstance from "../services/setupAxios.js";
import { useContext, useEffect, useState } from "react";
import { Context } from "../main";
import { Navigate } from "react-router-dom";

import { toast } from "react-toastify";


//pagination
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

const Dashboard = () => {
  const [appointments, setAppointments] = useState([]);

  const fetchAppointments = async (val) => {
    try {
      const { data } = await axiosInstance.get(
        `${import.meta.env.VITE_API_BURL}/api/v1/appointment/getall`, {
        headers: {
          "page": val
        }
      }
      );
      setAppointments(data.appointments);
      setPageCount(data?.pagination.pageCount)
    } catch (error) {
      setAppointments([]);
    }
  };

  // pagination
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(1);
  const changePage = (event, value) => {
    fetchAppointments(value)

    setPage(value)

  }
  //////////////////////////////



  useEffect(() => {

    fetchAppointments();
  }, []);

  const handleUpdateStatus = async (appointmentId, status) => {
    try {
      const { data } = await axiosInstance.put(
        `${import.meta.env.VITE_API_BURL}/api/v1/appointment/update/${appointmentId}`,
        { status },
      );
      setAppointments((prevAppointments) =>
        prevAppointments.map((appointment) =>
          appointment._id === appointmentId
            ? { ...appointment, status }
            : appointment
        )
      );
      toast.success(data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const { isAuthenticated, admin } = useContext(Context);
  if (!isAuthenticated) {
    return <Navigate to={"/login"} />;
  }

  return (
    <>
      <section className="dashboard page">
        <div className="banner">
          <div className="firstBox">
            {/* <img src="/doc.png" alt="docImg" /> */}
            <div className="content">
              <div>
                <p>Hello ,</p>
                <h5>
                  {admin &&
                    `${admin?.firstName} ${admin?.lastName}`}{" "}
                </h5>
              </div>
              <p>
                welcome
              </p>
            </div>
          </div>
          <div className="secondBox">
            <p>Total Appointments</p>
            <h3>1500</h3>
          </div>
          <div className="thirdBox">
            <p>Registered Doctors</p>
            <h3>10</h3>
          </div>
        </div>
        <div style={{ overflowX: "scroll" }} className="banner">
          <h5 style={{ color: "grey", fontSize: 14 }}>Appointments</h5>
          <table>
            <thead>
              <tr>
                <th style={{ fontSize: 14 }}>Patient</th>
                <th style={{ fontSize: 14 }}>Date</th>
                <th style={{ fontSize: 14 }}>Doctor</th>
                <th style={{ fontSize: 14 }}>Department</th>
                <th style={{ fontSize: 14 }}>Change Status</th>
                {/* <th>Visited</th> */}
              </tr>
            </thead>
            <tbody>
              {appointments && appointments.length > 0
                ? appointments.map((appointment) => (
                  <tr key={appointment._id}>
                    <td>{`${appointment.firstName} ${appointment.lastName}`}</td>
                    <td>{appointment.appointment_date.substring(0, 16)}</td>
                    <td>{`${appointment.doctor.firstName} ${appointment.doctor.lastName}`}</td>
                    <td>{appointment.department}</td>
                    <td>
                      <select
                        className={
                          appointment.status === "Pending"
                            ? "value-pending"
                            : appointment.status === "Accepted"
                              ? "value-accepted"
                              : "value-rejected"
                        }
                        value={appointment.status}
                        onChange={(e) =>
                          handleUpdateStatus(appointment._id, e.target.value)
                        }
                      >
                        <option value="Pending" className="value-pending">
                          Pending
                        </option>
                        <option value="Accepted" className="value-accepted">
                          Accepted
                        </option>
                        <option value="Rejected" className="value-rejected">
                          Rejected
                        </option>
                      </select>
                    </td>
                    {/* <td>{appointment.hasVisited === true ? <GoCheckCircleFill className="green" /> : <AiFillCloseCircle className="red" />}</td> */}
                  </tr>
                ))
                : "No Appointments Found!"}
            </tbody>

          </table>
          {/* pagination */}
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Stack spacing={2}>
              <Pagination color="primary" onChange={changePage} page={page} count={pageCount} />
            </Stack>

          </div>
          {/* pagination */}


          { }
        </div>
      </section>
    </>
  );
};

export default Dashboard;