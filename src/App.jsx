// import React, { Suspense, useState } from "react";

// const RemoteSongList = React.lazy(() => import("music_library/SongList"));

// const USERS = {
//   admin: { password: "admin123", role: "admin" },
//   user: { password: "user123", role: "user" },
// };

// function App() {
//   const stored = JSON.parse(localStorage.getItem("auth"));
//   const [auth, setAuth] = useState(stored || { username: "", role: "" });
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");

//   const handleLogin = () => {
//     if (USERS[username] && USERS[username].password === password) {
//       const data = { username, role: USERS[username].role };
//       localStorage.setItem("auth", JSON.stringify(data));
//       setAuth(data);
//       setError("");
//     } else {
//       setError("❌ Invalid username or password");
//     }
//   };

//   const logout = () => {
//     localStorage.removeItem("auth");
//     setAuth({ username: "", role: "" });
//     setUsername("");
//     setPassword("");
//   };

//   return (
//     <div
//       style={{
//         backgroundColor: "#0d0d0d",
//         color: "#f0f0f0",
//         minHeight: "100vh",
//         padding: "40px",
//         fontFamily: "'Segoe UI', sans-serif",
//         display: "flex",
//         flexDirection: "column",
//         alignItems: "center"
//       }}
//     >
//       <h1
//         style={{
//           fontSize: "36px",
//           textAlign: "center",
//           borderBottom: "2px solid #444",
//           paddingBottom: "10px",
//           marginBottom: "30px"
//         }}
//       >
//         🎧 Music Library Dashboard
//       </h1>

//       {!auth.role ? (
//         <div style={{ textAlign: "center" }}>
//           <p style={{ fontSize: "18px", marginBottom: "20px" }}>Login with your credentials:</p>
//           <input
//             type="text"
//             placeholder="Username"
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//             style={inputStyle}
//           />
//           <br />
//           <input
//             type="password"
//             placeholder="Password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             style={inputStyle}
//           />
//           <br />
//           <button
//             onClick={handleLogin}
//             style={buttonStyle}
//             onMouseOver={(e) => hoverIn(e)}
//             onMouseOut={(e) => hoverOut(e)}
//           >
//             Login
//           </button>
//           {error && <p style={{ color: "#ff4d4d", marginTop: "10px" }}>{error}</p>}
//         </div>
//       ) : (
//         <>
//           <div style={{ textAlign: "center", marginBottom: "20px" }}>
//             <p style={{ fontSize: "18px" }}>
//               Logged in as: <b>{auth.role.toUpperCase()}</b>
//             </p>
//             <button
//               onClick={logout}
//               style={logoutStyle}
//               onMouseOver={(e) => hoverIn(e)}
//               onMouseOut={(e) => hoverOut(e)}
//             >
//               Logout
//             </button>
//           </div>

//           <div
//             style={{
//               width: "100%",
//               maxWidth: "1100px",
//               border: "1px solid #333",
//               borderRadius: "10px",
//               overflow: "hidden",
//               boxShadow: "0 0 10px #000"
//             }}
//           >
//             <Suspense fallback={<p style={{ textAlign: "center" }}>Loading Music Library...</p>}>
//               <RemoteSongList role={auth.role} />
//             </Suspense>
//           </div>
//         </>
//       )}
//     </div>
//   );
// }

// // 🔘 Styling
// const inputStyle = {
//   padding: "10px",
//   background: "#1a1a1a",
//   color: "#fff",
//   border: "1px solid #666",
//   borderRadius: "6px",
//   width: "250px",
//   marginBottom: "10px"
// };

// const buttonStyle = {
//   padding: "10px 20px",
//   border: "1px solid #fff",
//   backgroundColor: "transparent",
//   color: "#fff",
//   borderRadius: "6px",
//   fontSize: "16px",
//   cursor: "pointer",
//   transition: "all 0.2s ease"
// };

// const logoutStyle = {
//   ...buttonStyle,
//   marginTop: "10px"
// };

// const hoverIn = (e) => {
//   e.target.style.backgroundColor = "#fff";
//   e.target.style.color = "#000";
// };

// const hoverOut = (e) => {
//   e.target.style.backgroundColor = "transparent";
//   e.target.style.color = "#fff";
// };

// export default App;


import React, { Suspense, useState } from "react";

const RemoteSongList = React.lazy(() => import("music_library/SongList"));

const USERS = {
  admin: { username: "admin", password: "admin123" },
  user: { username: "user", password: "user123" }
};

function App() {
  const stored = JSON.parse(localStorage.getItem("auth"));
  const [auth, setAuth] = useState(stored || null);
  const [selectedRole, setSelectedRole] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleRoleSelect = (role) => {
    setSelectedRole(role);
    setUsername("");
    setPassword("");
    setError("");
  };

  const handleLogin = () => {
    const expected = USERS[selectedRole];
    if (username === expected.username && password === expected.password) {
      const data = { username, role: selectedRole };
      localStorage.setItem("auth", JSON.stringify(data));
      setAuth(data);
    } else {
      setError("❌ Invalid credentials");
    }
  };

  const logout = () => {
    localStorage.removeItem("auth");
    setAuth(null);
    setSelectedRole(null);
    setUsername("");
    setPassword("");
  };

  return (
    <div
      style={{
        backgroundColor: "#0d0d0d",
        color: "#f0f0f0",
        minHeight: "100vh",
        padding: "40px",
        fontFamily: "'Segoe UI', sans-serif",
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
      }}
    >
      <h1
        style={{
          fontSize: "36px",
          textAlign: "center",
          borderBottom: "2px solid #444",
          paddingBottom: "10px",
          marginBottom: "30px"
        }}
      >
        🎧 Music Library Dashboard
      </h1>

      {!auth ? (
        <>
          {!selectedRole ? (
            <div style={{ textAlign: "center" }}>
              <p style={{ fontSize: "18px", marginBottom: "20px" }}>Login as:</p>
              <div style={{ display: "flex", gap: "20px", justifyContent: "center" }}>
                <button onClick={() => handleRoleSelect("admin")} style={buttonStyle} onMouseOver={hoverIn} onMouseOut={hoverOut}>
                  Admin
                </button>
                <button onClick={() => handleRoleSelect("user")} style={buttonStyle} onMouseOver={hoverIn} onMouseOut={hoverOut}>
                  User
                </button>
              </div>
            </div>
          ) : (
            <div style={{ textAlign: "center" }}>
              <p style={{ fontSize: "18px", marginBottom: "10px" }}>Enter {selectedRole.toUpperCase()} credentials:</p>
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                style={inputStyle}
              />
              <br />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={inputStyle}
              />
              <br />
              <button onClick={handleLogin} style={buttonStyle} onMouseOver={hoverIn} onMouseOut={hoverOut}>
                Login
              </button>
              <button onClick={() => setSelectedRole(null)} style={{ ...buttonStyle, marginLeft: "10px" }}>
                Back
              </button>
              {error && <p style={{ color: "#ff4d4d", marginTop: "10px" }}>{error}</p>}
            </div>
          )}
        </>
      ) : (
        <>
          <div style={{ textAlign: "center", marginBottom: "20px" }}>
            <p style={{ fontSize: "18px" }}>
              Logged in as: <b>{auth.role.toUpperCase()}</b>
            </p>
            <button onClick={logout} style={logoutStyle} onMouseOver={hoverIn} onMouseOut={hoverOut}>
              Logout
            </button>
          </div>

          <div
            style={{
              width: "100%",
              maxWidth: "1100px",
              border: "1px solid #333",
              borderRadius: "10px",
              overflow: "hidden",
              boxShadow: "0 0 10px #000"
            }}
          >
            <Suspense fallback={<p style={{ textAlign: "center" }}>Loading Music Library...</p>}>
              <RemoteSongList role={auth.role} />
            </Suspense>
          </div>
        </>
      )}
    </div>
  );
}

// 🔘 Styling
const inputStyle = {
  padding: "10px",
  background: "#1a1a1a",
  color: "#fff",
  border: "1px solid #666",
  borderRadius: "6px",
  width: "250px",
  marginBottom: "10px"
};

const buttonStyle = {
  padding: "10px 20px",
  border: "1px solid #fff",
  backgroundColor: "transparent",
  color: "#fff",
  borderRadius: "6px", 
  fontSize: "16px",
  cursor: "pointer",
  transition: "all 0.2s ease"
};

const logoutStyle = {
  ...buttonStyle,
  marginTop: "10px"
};

const hoverIn = (e) => {
  e.target.style.backgroundColor = "#fff";
  e.target.style.color = "#000";
};

const hoverOut = (e) => {
  e.target.style.backgroundColor = "transparent";
  e.target.style.color = "#fff";
};

export default App;
