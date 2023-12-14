// Main.js
import { useState } from "react";
import axios from "axios";
import styles from "./styles.module.css";

const Main = () => {
  const [originalUrl, setOriginalUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [error, setError] = useState("");

  const handleGenerateShortUrl = async () => {
    try {
      const token = localStorage.getItem("token");
      const { data } = await axios.post(
        "http://localhost:8080/api/links",
        { originalUrl },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setShortUrl(data.shortUrl);
    } catch (error) {
      console.error(error);
      setError("Failed to generate short URL");
    }
  };

  const handleOpenShortUrl = () => {
    window.open(shortUrl, "_blank");
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  return (
    <div className={styles.main_container}>
      <nav className={styles.navbar}>
        <h1>Short URL Generator</h1>
        <button className={styles.white_btn} onClick={handleLogout}>
          Logout
        </button>
      </nav>

      <div className={styles.short_url_container}>
        <input
          type="text"
          placeholder="Enter URL"
          value={originalUrl}
          onChange={(e) => setOriginalUrl(e.target.value)}
          className={styles.input}
        />
        <button onClick={handleGenerateShortUrl} className={styles.green_btn}>
          Generate Short URL
        </button>
        {shortUrl && (
          <div className={styles.short_url_result}>
            <p>Short URL:</p>
            <a href={originalUrl} target="_blank" rel="noopener noreferrer">
              {shortUrl}
            </a>
         
          </div>
        )}
        {error && <div className={styles.error_msg}>{error}</div>}
      </div>
    </div>
  );
};

export default Main;

