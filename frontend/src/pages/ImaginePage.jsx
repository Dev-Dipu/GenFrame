import React, { useState } from "react"
import api from "../utils/AxiosInstance"
import { useNavigate } from "react-router"


const ImaginePage = () => {
  const [prompt, setPrompt] = useState("")
  const [imageUrl, setImageUrl] = useState(null)
  const [loading, setLoading] = useState(false)
  const [posting, setPosting] = useState(false)
  const [message, setMessage] = useState("")
  const navigate = useNavigate()

  // Fake image generator (replace with real API later)
  const generateImage = async () => {
  if (!prompt.trim()) return setMessage("Please enter a prompt first.")

  setLoading(true)
  setImageUrl(null)
  setMessage("")

  try {
    const res = await api.post("/imagine", {
      prompt,
    })

    if (res.data?.data?.url) {
      setImageUrl(res.data.data.url) // backend se ai generated image ka url
      setMessage("Image generated successfully ✅")
    } else {
      setMessage("Something went wrong ❌")
    }
  } catch (err) {
    console.error(err)
    setMessage("Failed to generate image ❌")
  } finally {
    setLoading(false)
  }
}

  // Post to backend
  const handlePost = async () => {
    if (!imageUrl || !prompt) return

    try {
      setPosting(true)
      setMessage("")

      // Backend expects FormData (imagefile + caption)
      const blob = await fetch(imageUrl).then((res) => res.blob())
      const file = new File([blob], "generated.jpg", { type: "image/jpeg" })

      const formData = new FormData()
      formData.append("imagefile", file)
      formData.append("caption", prompt)

      await api.post("/posts", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })

      setMessage("✨ Image posted successfully!")
      setPrompt("")
      setTimeout(() => {
        navigate('/')
      }, 1500);
      setImageUrl(null)
    } catch (err) {
      setMessage("Something went wrong while posting ❌")
    } finally {
      setPosting(false)
    }
  }

  return (
    <div className="flex justify-center items-center min-h-[70vh]">
      <div className="w-full max-w-2xl bg-zinc-900/80 p-6 rounded-md shadow-lg border border-white/10 backdrop-blur-md">
        <h2 className="text-xl font-semibold mb-6 text-center tracking-wide">
          Imagine & Create
        </h2>

        {/* Prompt Box */}
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Describe something magical..."
          className="w-full rounded-md bg-zinc-800 text-gray-200 px-3 py-3 text-sm outline-none border border-white/10 focus:border-white/30 resize-none"
          rows="3"
        ></textarea>

        {/* Actions */}
        <div className="flex justify-center gap-4 mt-4">
          <button
            onClick={generateImage}
            disabled={loading}
            className="px-6 py-2 rounded-md bg-gradient-to-r bg-blue-400 cursor-pointer text-zinc-900 font-semibold hover:opacity-90 transition disabled:opacity-50"
          >
            {loading ? "Generating..." : "Generate Image"}
          </button>
        </div>

        {/* Preview */}
        <div className="mt-6">
          {loading && (
            <div className="w-full h-64 rounded-md bg-zinc-800 animate-pulse"></div>
          )}
          {imageUrl && (
            <div className="flex flex-col items-center gap-4">
              <img
                src={imageUrl}
                alt="Generated"
                className="rounded-md max-h-[400px] object-cover border border-white/10"
              />
              <button
                onClick={handlePost}
                disabled={posting}
                className="px-6 py-2 rounded-md bg-gradient-to-r bg-green-400 cursor-pointer text-zinc-900 font-semibold hover:opacity-90 transition disabled:opacity-50"
              >
                {posting ? "Posting..." : "Post This"}
              </button>
            </div>
          )}
        </div>

        {/* Message */}
        {message && (
          <p className="mt-4 text-center text-sm text-gray-400">{message}</p>
        )}
      </div>
    </div>
  )
}

export default ImaginePage
