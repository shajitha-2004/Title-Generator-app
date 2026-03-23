import { useState } from "react";

const TONES = [
  "🔥 Bold & Provocative",
  "😂 Witty & Humorous",
  "📊 Data-Driven",
  "💡 Inspirational",
  "🎯 How-To",
  "🤔 Thought-Provoking",
];

const FORMATS = [
  "Listicle",
  "Question",
  "How-To Guide",
  "Ultimate Guide",
  "Case Study",
  "Opinion",
];

const COUNTS = [3, 5, 7, 10];

export default function App() {
  const [topic, setTopic] = useState("");
  const [tone, setTone] = useState(TONES[0]);
  const [format, setFormat] = useState(FORMATS[0]);
  const [count, setCount] = useState(5);
  const [titles, setTitles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(null);
  const [favorites, setFavorites] = useState([]);

  const generateTitles = () => {
    if (!topic.trim()) {
      setError("Please enter a blog topic first!");
      return;
    }

    setLoading(true);
    setError("");
    setTitles([]);

    const toneName = tone.replace(/^[^ ]+ /, "");
    const generated = [];

    for (let i = 1; i <= count; i++) {
      generated.push(
        `${format}: ${topic} (${toneName}) - Creative Blog Title ${i}`
      );
    }

    setTimeout(() => {
      setTitles(generated);
      setLoading(false);
    }, 1200);
  };

  const copyTitle = (title, i) => {
    navigator.clipboard.writeText(title);
    setCopied(i);
    setTimeout(() => setCopied(null), 1800);
  };

  const toggleFav = (title) => {
    setFavorites((prev) =>
      prev.includes(title)
        ? prev.filter((t) => t !== title)
        : [...prev, title]
    );
  };

  const copyAll = () => {
    navigator.clipboard.writeText(titles.join("\n"));
    setCopied("all");
    setTimeout(() => setCopied(null), 1800);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0f0e17",
        fontFamily: "'Syne', 'DM Sans', sans-serif",
        padding: "32px 16px",
        color: "#fffffe",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;700;800&family=DM+Sans:wght@400;500;600&display=swap');
        * { box-sizing: border-box; }
        .panel { background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.09); border-radius: 20px; padding: 24px; margin-bottom: 16px; backdrop-filter: blur(10px); }
        .label { font-family: 'Syne', sans-serif; font-size: 11px; font-weight: 700; letter-spacing: 0.15em; text-transform: uppercase; color: #a7a9be; margin-bottom: 10px; display: block; }
        .pill { display: inline-flex; align-items: center; gap: 5px; padding: 8px 16px; border-radius: 999px; border: 1.5px solid rgba(255,255,255,0.12); cursor: pointer; font-size: 13px; font-family: 'DM Sans', sans-serif; font-weight: 500; background: transparent; color: #fffffe; margin: 4px; transition: all 0.2s; }
        .pill:hover { border-color: #ff8906; color: #ff8906; }
        .pill.active { background: #ff8906; border-color: #ff8906; color: #0f0e17; font-weight: 700; }
        .count-pill { display: inline-flex; align-items: center; justify-content: center; width: 44px; height: 44px; border-radius: 12px; border: 1.5px solid rgba(255,255,255,0.12); cursor: pointer; font-size: 15px; font-family: 'Syne', sans-serif; font-weight: 700; background: transparent; color: #fffffe; margin: 4px; transition: all 0.2s; }
        .count-pill:hover { border-color: #ff8906; color: #ff8906; }
        .count-pill.active { background: #ff8906; border-color: #ff8906; color: #0f0e17; }
        .gen-btn { width: 100%; background: linear-gradient(135deg, #ff8906, #f25f4c); color: #0f0e17; border: none; border-radius: 14px; padding: 16px 32px; font-size: 16px; font-family: 'Syne', sans-serif; font-weight: 800; cursor: pointer; transition: all 0.2s; letter-spacing: 0.05em; }
        .gen-btn:hover:not(:disabled) { transform: translateY(-2px); box-shadow: 0 12px 32px rgba(255,137,6,0.35); }
        .gen-btn:disabled { opacity: 0.5; cursor: not-allowed; }
        .topic-input { width: 100%; background: rgba(255,255,255,0.06); border: 1.5px solid rgba(255,255,255,0.12); border-radius: 14px; padding: 14px 18px; font-size: 16px; font-family: 'DM Sans', sans-serif; color: #fffffe; outline: none; transition: border-color 0.2s; }
        .topic-input:focus { border-color: #ff8906; background: rgba(255,137,6,0.06); }
        .topic-input::placeholder { color: #a7a9be; }
        .title-card { background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08); border-radius: 16px; padding: 18px 20px; margin-bottom: 10px; display: flex; align-items: flex-start; gap: 14px; transition: all 0.25s; animation: slideIn 0.4s ease forwards; opacity: 0; cursor: default; }
        .title-card:hover { border-color: rgba(255,137,6,0.4); background: rgba(255,137,6,0.05); transform: translateX(4px); }
        @keyframes slideIn { from { opacity: 0; transform: translateX(-16px); } to { opacity: 1; transform: translateX(0); } }
        .title-num { font-family: 'Syne', sans-serif; font-size: 11px; font-weight: 800; color: #ff8906; min-width: 22px; padding-top: 2px; }
        .title-text { font-family: 'DM Sans', sans-serif; font-size: 16px; font-weight: 500; line-height: 1.5; color: #fffffe; flex: 1; }
        .icon-btn { background: none; border: none; cursor: pointer; font-size: 16px; padding: 4px 6px; border-radius: 8px; transition: all 0.15s; color: #a7a9be; }
        .icon-btn:hover { background: rgba(255,255,255,0.08); color: #fffffe; }
        .fav { color: #ff8906 !important; }
        .shimmer { background: linear-gradient(90deg, rgba(255,255,255,0.03) 25%, rgba(255,255,255,0.08) 50%, rgba(255,255,255,0.03) 75%); background-size: 200% 100%; animation: shimmer 1.5s infinite; border-radius: 12px; height: 60px; margin-bottom: 10px; }
        @keyframes shimmer { 0% { background-position: -200% 0; } 100% { background-position: 200% 0; } }
        .copy-all-btn { background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.12); color: #fffffe; border-radius: 10px; padding: 8px 16px; font-size: 13px; font-family: 'DM Sans', sans-serif; font-weight: 600; cursor: pointer; transition: all 0.15s; }
        .copy-all-btn:hover { background: rgba(255,255,255,0.1); }
        .badge { display: inline-block; background: rgba(255,137,6,0.15); color: #ff8906; border-radius: 6px; padding: 2px 8px; font-size: 11px; font-weight: 700; font-family: 'Syne', sans-serif; letter-spacing: 0.08em; }
      `}</style>

      <div style={{ maxWidth: 680, margin: "0 auto" }}>
        <div style={{ marginBottom: 36, textAlign: "center" }}>
          <div style={{ marginBottom: 16 }}>
            <span className="badge">AI-POWERED</span>
          </div>
          <h1
            style={{
              fontFamily: "'Syne', sans-serif",
              fontSize: "clamp(32px, 8vw, 56px)",
              fontWeight: 800,
              margin: "0 0 10px",
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
            }}
          >
            Blog Title
            <br />
            <span
              style={{
                background: "linear-gradient(135deg, #ff8906, #f25f4c)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Generator
            </span>
          </h1>
          <p
            style={{
              color: "#a7a9be",
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 15,
              margin: 0,
            }}
          >
            Stop staring at a blank title. Generate scroll-stopping headlines in seconds.
          </p>
        </div>

        <div className="panel">
          <span className="label">Your Blog Topic</span>
          <input
            className="topic-input"
            type="text"
            placeholder="e.g. remote work productivity, crypto investing, sourdough baking..."
            value={topic}
            onChange={(e) => {
              setTopic(e.target.value);
              setError("");
            }}
            onKeyDown={(e) => e.key === "Enter" && generateTitles()}
          />
        </div>

        <div className="panel">
          <span className="label">Tone & Style</span>
          <div>
            {TONES.map((t) => (
              <span
                key={t}
                className={`pill ${tone === t ? "active" : ""}`}
                onClick={() => setTone(t)}
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        <div
          className="panel"
          style={{ display: "flex", gap: 28, flexWrap: "wrap" }}
        >
          <div style={{ flex: 1, minWidth: 200 }}>
            <span className="label">Format</span>
            <div>
              {FORMATS.map((f) => (
                <span
                  key={f}
                  className={`pill ${format === f ? "active" : ""}`}
                  onClick={() => setFormat(f)}
                  style={{ padding: "6px 12px", fontSize: 12 }}
                >
                  {f}
                </span>
              ))}
            </div>
          </div>
          <div>
            <span className="label">How Many?</span>
            <div style={{ display: "flex", gap: 4, marginTop: 2 }}>
              {COUNTS.map((c) => (
                <span
                  key={c}
                  className={`count-pill ${count === c ? "active" : ""}`}
                  onClick={() => setCount(c)}
                >
                  {c}
                </span>
              ))}
            </div>
          </div>
        </div>

        {error && (
          <p
            style={{
              color: "#f25f4c",
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 14,
              fontWeight: 600,
              textAlign: "center",
              margin: "0 0 12px",
            }}
          >
            {error}
          </p>
        )}

        <button className="gen-btn" onClick={generateTitles} disabled={loading}>
          {loading ? "⚡ Generating titles..." : "⚡ Generate Titles"}
        </button>

        {loading && (
          <div style={{ marginTop: 28 }}>
            {[...Array(count > 3 ? 3 : count)].map((_, i) => (
              <div
                key={i}
                className="shimmer"
                style={{ animationDelay: `${i * 0.15}s` }}
              />
            ))}
          </div>
        )}

        {titles.length > 0 && !loading && (
          <div style={{ marginTop: 28 }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 16,
              }}
            >
              <span
                style={{
                  fontFamily: "'Syne', sans-serif",
                  fontWeight: 700,
                  fontSize: 15,
                }}
              >
                {titles.length} Titles Generated
              </span>
              <button className="copy-all-btn" onClick={copyAll}>
                {copied === "all" ? "✅ Copied!" : "📋 Copy All"}
              </button>
            </div>

            {titles.map((title, i) => (
              <div
                key={i}
                className="title-card"
                style={{ animationDelay: `${i * 0.08}s` }}
              >
                <span className="title-num">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="title-text">{title}</span>
                <div style={{ display: "flex", gap: 4, flexShrink: 0 }}>
                  <button
                    className={`icon-btn ${
                      favorites.includes(title) ? "fav" : ""
                    }`}
                    onClick={() => toggleFav(title)}
                    title="Favorite"
                  >
                    {favorites.includes(title) ? "★" : "☆"}
                  </button>
                  <button
                    className="icon-btn"
                    onClick={() => copyTitle(title, i)}
                    title="Copy"
                  >
                    {copied === i ? "✅" : "📋"}
                  </button>
                </div>
              </div>
            ))}

            {favorites.length > 0 && (
              <div
                style={{
                  marginTop: 24,
                  padding: "18px",
                  background: "rgba(255,137,6,0.07)",
                  borderRadius: 16,
                  border: "1px solid rgba(255,137,6,0.2)",
                }}
              >
                <span className="label" style={{ color: "#ff8906" }}>
                  ⭐ Your Favorites
                </span>
                {favorites.map((t, i) => (
                  <div
                    key={i}
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: 14,
                      padding: "8px 0",
                      borderBottom:
                        i < favorites.length - 1
                          ? "1px solid rgba(255,137,6,0.12)"
                          : "none",
                      color: "#fffffe",
                    }}
                  >
                    {t}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}