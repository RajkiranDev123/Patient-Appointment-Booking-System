import React, { useState } from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard';

const TestCredentials = () => {
    const [adminEmail, setAdminEmail] = useState(false)
    const [adminPass, setAdminPass] = useState(false)





    return (
        <div>

            {/*  */}
            <p style={{ fontSize: 12, fontFamily: "monospace", color: "red", display: "flex", alignItems: "center", gap: 2 }}>Patient Test Email &nbsp;&nbsp;&nbsp;:
                <CopyToClipboard text="rajkir783@gmail.com">
                    {!adminEmail ? <span onClick={() => setAdminEmail(!adminEmail)} style={{ cursor: "pointer", color: "blue", display: "flex", alignItems: "center", textDecoration: "" }}> Copy!</span>
                        : <span onClick={() => setAdminEmail(!adminEmail)} style={{ cursor: "pointer", color: "blue", display: "flex", alignItems: "center", textDecoration: "" }}> Copied!</span>}

                </CopyToClipboard>
            </p>
            <p style={{ fontSize: 12, fontFamily: "monospace", color: "red", display: "flex", alignItems: "center", gap: 2 ,fontWeight:""}}>Patient Test Password :
                <CopyToClipboard text="12345678">
                    {!adminPass ? <span onClick={() => setAdminPass(!adminPass)} style={{ cursor: "pointer", color: "blue", display: "flex", alignItems: "center", textDecoration: "",fontWeight:"" }}> Copy!</span>
                        : <span onClick={() => setAdminPass(!adminPass)} style={{ cursor: "pointer", color: "blue", display: "flex", alignItems: "center", textDecoration: "",fontWeight:"" }}> Copied!</span>}
                </CopyToClipboard>
            </p>
       
            {/*  */}
        </div>
    )
}

export default TestCredentials