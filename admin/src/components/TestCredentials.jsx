import React, { useState } from 'react';

const TestCredentials = () => {
  const [adminEmail, setAdminEmail] = useState(false);
  const [adminPass, setAdminPass] = useState(false);

  const handleCopy = async (text, type) => {
    try {
      await navigator.clipboard.writeText(text);
      if (type === "email") {
        setAdminEmail(true);
        setTimeout(() => setAdminEmail(false), 2000); // reset after 2s
      } else if (type === "pass") {
        setAdminPass(true);
        setTimeout(() => setAdminPass(false), 2000); // reset after 2s
      }
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  return (
    <div>
      {/* Email */}
      <p
        style={{
          fontSize: 12,
          fontFamily: "monospace",
          color: "red",
          display: "flex",
          alignItems: "center",
          gap: 2,
        }}
      >
        Patient Test Email&nbsp;&nbsp;&nbsp;:
        {!adminEmail ? (
          <span
            onClick={() => handleCopy("rajkir783@gmail.com", "email")}
            style={{
              cursor: "pointer",
              color: "blue",
              display: "flex",
              alignItems: "center",
            }}
          >
            Copy!
          </span>
        ) : (
          <span
            style={{
              cursor: "pointer",
              color: "blue",
              display: "flex",
              alignItems: "center",
            }}
          >
            Copied!
          </span>
        )}
      </p>

      {/* Password */}
      <p
        style={{
          fontSize: 12,
          fontFamily: "monospace",
          color: "red",
          display: "flex",
          alignItems: "center",
          gap: 2,
        }}
      >
        Patient Test Password :
        {!adminPass ? (
          <span
            onClick={() => handleCopy("12345678", "pass")}
            style={{
              cursor: "pointer",
              color: "blue",
              display: "flex",
              alignItems: "center",
            }}
          >
            Copy!
          </span>
        ) : (
          <span
            style={{
              cursor: "pointer",
              color: "blue",
              display: "flex",
              alignItems: "center",
            }}
          >
            Copied!
          </span>
        )}
      </p>
    </div>
  );
};

export default TestCredentials;
