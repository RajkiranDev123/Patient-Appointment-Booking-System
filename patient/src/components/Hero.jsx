import { useEffect, useState } from "react";
import Box from '@mui/material/Box';
import Modal1 from '@mui/material/Modal';
import "../pages/loader.css"
import axios from "axios"
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  height: 500,
  bgcolor: 'background.paper',
  borderRadius: 3,
  boxShadow: 24,
  p: 4,
  border: "1px solid grey"

};

const Hero = ({ }) => {
  const [open1, setOpen1] = useState(false);
  const [fever, setFever] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);



  const handleClose1 = () => { setOpen1(false); setFever(""); setResult("") };
  const handleOpen1 = () => {
    setOpen1(true);
  }
  // 

  const ask = async () => {
    try {
      setLoading(true)
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_BURL}/api/v1/ai/ask`, {
        question: fever
      }

      );
      // console.log(data)
      setResult(data?.data);
      setLoading(false)
    } catch (error) {
      setLoading(false)
    }

  };

  return (
    <>
      <div className="hero container">
        <div className="banner">
          <h1>Welcome to Raj Medical Institute — Where Compassion Meets Care</h1>
          <p>
            At Raj Medical Institute, we believe healthcare goes beyond treatment—it’s
            about compassion, trust, and care. With advanced facilities and a team of skilled experts, we are dedicated to
            supporting every patient’s journey to better health. Your well-being is at the heart of everything we do.
          </p>
        </div>
        <div className="banner">
          <img src="/hero.png" alt="hero" className="animated-image" />
        </div>
      </div>


      {/* ai */}


      <br />
      <div style={{ gap: 16, justifyContent: "center", border: "1px solid grey", padding: 14, }}>
        <p style={{ color: "red", textAlign: "center", fontWeight: "bold" }}>Try our AI doctor too before scrolling down!</p>
        <br />

        <div style={{ display: "flex", justifyContent: "center" }}>
          <span onClick={handleOpen1} style={{
            fontWeight: "bold", padding: 9, background: "green", borderRadius: 4,
            color: "white", cursor: "pointer"
          }}>Click here for AI doctor for best food and tablets!</span>
        </div>


      </div>




      {/* ai */}


      {/* modal 1 */}
      <Modal1
        open={open1}
        onClose={handleClose1}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div
          style=
          {{
            outline: "none",
            padding: 5, color: "grey", background: "white", width: 280, height: 300,
            position: "absolute", top: "50%", left: "50%", transform: 'translate(-50%, -50%)', zIndex: 5
          }}>
          <p onClick={handleClose1} style={{ cursor: "pointer", display: "flex", justifyContent: "flex-end" }}>X</p>

          <div>
            <input onChange={(e) => setFever(e.target.value)}
              style={{
                width: "100%", padding: 9, borderRadius: 3, outline: "none", fontWeight: "bold", marginTop: 5
              }}
              placeholder="type fever here... like : head pain..." />

            <button onClick={() => ask()}
              style={{ margin: 5, padding: 5, width: "100%", border: "none", background: "green", color: "white", cursor: "pointer" }}>
              {loading ? <div style={{ display: "flex", justifyContent: "center" }}><div className="loader"></div></div> : "Ask"}

            </button>
            <div >
              <p>Result : </p>
              {result && <div style={{ overflowY: "scroll", height: 150, fontSize: 14, fontWeight: "bold" }}>
                {result}
              </div>}
            </div>



          </div>
        </div>
      </Modal1>



      {/* modal 1 */}

    </>
  );
};

export default Hero;