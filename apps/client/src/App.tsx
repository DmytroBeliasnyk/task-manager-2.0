import { useEffect, useState } from "react";

export default function App() {
  const [msg, setMsg] = useState("loading...");

  useEffect(() => {
    fetch("/api/hello")
      .then((r) => r.json())
      .then((d) => setMsg(d.message))
      .catch(() => setMsg("error"));
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h1>Frontend (Vite + React + TS)</h1>
      <p>API says: {msg}</p>
    </div>
  );
}
