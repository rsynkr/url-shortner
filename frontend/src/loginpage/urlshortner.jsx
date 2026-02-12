import { useState } from "react";

const Urlshortener = () => {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const API = "http://localhost:5000";

  const handleShorten = async () => {
    setError("");
    setShortUrl("");

    if (!url) {
      setError("Enter a URL");
      return;
    }

    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      const res = await fetch(`${API}/shorten`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ url }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message);

      setShortUrl(`${API}/${data.code}`);

    } catch (err) {
      setError(err.message || "Failed");
    } finally {
      setLoading(false);
    }
  };

  const copy = () => {
    navigator.clipboard.writeText(shortUrl);
  };

  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-md w-[420px]">

        <h2 className="text-2xl font-bold mb-6 text-center">
          URL Shortener
        </h2>

        {error && (
          <p className="text-red-500 text-sm mb-3">{error}</p>
        )}

        <input
          placeholder="Paste long URL..."
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="w-full p-3 border rounded-lg mb-4"
        />

        <button
          onClick={handleShorten}
          disabled={loading}
          className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600"
        >
          {loading ? "Shortening..." : "Shorten URL"}
        </button>

        {shortUrl && (
          <div className="mt-6 text-center">
            <p className="mb-2 text-sm text-gray-600">
              Your short link:
            </p>

            <div className="flex gap-2">
              <input
                value={shortUrl}
                readOnly
                className="flex-1 p-2 border rounded-lg"
              />

              <button
                onClick={copy}
                className="bg-green-500 text-white px-4 rounded-lg"
              >
                Copy
              </button>
            </div>
          </div>
        )}

        <button
          onClick={logout}
          className="mt-6 w-full text-red-500 border border-red-500 p-2 rounded-lg hover:bg-red-50"
        >
          Logout
        </button>

      </div>
    </div>
  );
};

export default Urlshortener;
