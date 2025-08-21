import React, { useState } from "react"
import api from "../utils/AxiosInstance"
import { useNavigate } from "react-router"

const FormPage = () => {
  const navigate = useNavigate();
  const [image, setImage] = useState(null)
  const [caption, setCaption] = useState("")
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!image || !caption) {
      setMessage("Please select an image and add a caption.")
      return
    }

    const formData = new FormData()
    formData.append("imagefile", image)
    formData.append("caption", caption)

    try {
      setLoading(true)
      setMessage("")
      await api.post("/posts", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      setMessage("Post created successfully! 🎉")
      setCaption("")
      setTimeout(() => {
        navigate('/')
      }, 1500);
      setImage(null)
      e.target.reset()
    } catch (err) {
      setMessage("Something went wrong ❌")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex justify-center items-center min-h-[70vh]">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-zinc-900/80 p-6 rounded-md shadow-lg border border-white/10 backdrop-blur-md"
      >
        <h2 className="text-xl font-semibold mb-6 text-center tracking-wide">
          Create a Post
        </h2>

        {/* Image Upload */}
        <label className="block mb-4">
          <span className="text-sm text-gray-400">Upload Image</span>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
            className="mt-2 block w-full text-sm text-gray-300 
              file:mr-4 file:py-2 file:px-4 
              file:rounded-md file:border-0 
              file:text-sm file:font-semibold 
              file:bg-zinc-800 file:text-gray-200 
              hover:file:bg-zinc-700 cursor-pointer"
          />
        </label>

        {/* Caption Input */}
        <label className="block mb-6">
          <span className="text-sm text-gray-400">Caption</span>
          <textarea
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            placeholder="Write something..."
            className="mt-2 w-full rounded-md bg-zinc-800 text-gray-200 px-3 py-2 text-sm outline-none border border-white/10 focus:border-white/30 resize-none"
            rows="3"
          ></textarea>
        </label>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full cursor-pointer py-2 rounded-md bg-gradient-to-r bg-green-400 text-zinc-900 font-semibold hover:opacity-90 transition"
        >
          {loading ? "Posting..." : "Post"}
        </button>

        {/* Status Message */}
        {message && (
          <p className="mt-4 text-center text-sm text-gray-400">{message}</p>
        )}
      </form>
    </div>
  )
}

export default FormPage
