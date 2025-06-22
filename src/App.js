import React, { Suspense, useState } from "react";

const RemoteSongList = React.lazy(() => import("music_library/SongList"));

function App() {
  const [role, setRole] = useState(localStorage.getItem("role") || "");

  const handleLogin = (r) => {
    localStorage.setItem("role", r);
    setRole(r);
  };

  const logout = () => {
    localStorage.removeItem("role");
    setRole("");
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

      {!role ? (
        <div style={{ textAlign: "center" }}>
          <p style={{ fontSize: "18px", marginBottom: "20px" }}>Select your role to continue:</p>
          <div style={{ display: "flex", gap: "20px", justifyContent: "center" }}>
            <button
              onClick={() => handleLogin("admin")}
              style={buttonStyle}
              onMouseOver={(e) => hoverIn(e)}
              onMouseOut={(e) => hoverOut(e)}
            >
              Login as Admin
            </button>
            <button
              onClick={() => handleLogin("user")}
              style={buttonStyle}
              onMouseOver={(e) => hoverIn(e)}
              onMouseOut={(e) => hoverOut(e)}
            >
              Login as User
            </button>
          </div>
        </div>
      ) : (
        <>
          <div style={{ textAlign: "center", marginBottom: "20px" }}>
            <p style={{ fontSize: "18px" }}>
              Logged in as: <b>{role.toUpperCase()}</b>
            </p>
            <button
              onClick={logout}
              style={logoutStyle}
              onMouseOver={(e) => hoverIn(e)}
              onMouseOut={(e) => hoverOut(e)}
            >
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
              <RemoteSongList role={role} />
            </Suspense>
          </div>
        </>
      )}
    </div>
  );
}

// 🔘 Styling for buttons
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
