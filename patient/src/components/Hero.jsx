import { useEffect, useState } from "react";
import Box from '@mui/material/Box';
import Modal1 from '@mui/material/Modal';


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

  const handleClose1 = () => { setOpen1(false); setFever("") };
  const handleOpen1 = () => {
    setOpen1(true);
  }
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


      <p style={{ color: "red", textAlign: "center" }}>Try our AI doctors too before scrolling down!</p>
      <br />
      <div style={{ gap: 16, justifyContent: "center", border: "1px solid grey", padding: 14, display: "flex", flexWrap: "wrap" }}>

        <div>
          <p onClick={handleOpen1} style={{ padding: 3, background: "green", borderRadius: 4, color: "white", cursor: "pointer" }}>Click here for AI doctor for tablets and fruits!</p>
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
            padding: 5, color: "grey", background: "white", width: 360, height: 400,
            position: "absolute", top: "50%", left: "50%", transform: 'translate(-50%, -50%)', zIndex: 5
          }}>
          <p onClick={handleClose1} style={{ cursor: "pointer", display: "flex", justifyContent: "flex-end" }}>X</p>

          <div>
            <input onChange={(e) => setFever(e.target.value)}
              style={{
                width: "100%", padding: 9, borderRadius: 3, outline: "none", fontWeight: "bold", marginTop: 5
              }}
              placeholder="type your fever... like cancer,head pain etc!" />

            <button
              style={{ margin: 5, padding: 5, width: "100%", border: "none", background: "green", color: "white", cursor: "pointer" }}>
             {fever? "Submit":"type you fever above!"}
            </button>
            <div >
              <p>Result</p>
              <div style={{ overflowY: "scroll", height: 250 }}>
                iouytdf
              </div>
            </div>



          </div>
        </div>
      </Modal1>



      {/* modal 1 */}

    </>
  );
};

export default Hero;