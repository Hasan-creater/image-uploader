import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useAuth } from '../context/AuthContext'

export default function Dashboard() {

  const [images, setImages]       = useState([])
  const [file, setFile]           = useState(null)
  const [uploading, setUploading] = useState(false)
  const [loading, setLoading]     = useState(true)
  const [error, setError]         = useState('')

  const { token, logout } = useAuth()
  const navigate = useNavigate()

  const fetchImages = async () => {
   const response = await axios.get('http://localhost:5000/api/images/my-images', {
  headers: {
    Authorization: `Bearer ${token.trim()}`   
  }
})
try {
      setImages(response.data)
      setLoading(false)
    
    } catch (err) {
      setError('Failed to load images.')
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchImages()
  }, [token])

  const handleUpload = async () => {
    if (!file) return

    setUploading(true)
    setError('')

    try {
      const formData = new FormData()
      formData.append('image', file)

      await axios.post('http://localhost:5000/api/images/upload', formData, {
  headers: {
    Authorization: `Bearer ${token.trim()}`,  
    'Content-Type': 'multipart/form-data'
  }
})

      await fetchImages()
      setFile(null)
      setUploading(false)

    } catch (err) {
      setError('Failed to upload image.')
      setUploading(false)
    }
  }

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <div>

      
      <div>
        <h2>My Dashboard</h2>
        <button onClick={handleLogout}>Logout</button>
      </div>

      
      <div>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setFile(e.target.files[0])}
        />
        <button
          onClick={handleUpload}
          disabled={uploading}
        >
          {uploading ? 'Uploading...' : 'Upload Image'}
        </button>
      </div>

      
      {error && <p style={{ color: 'red' }}>{error}</p>}

      
      <div>
        {loading ? (
          <p>Loading images...</p>

        ) : images.length === 0 ? (
          <p>No images uploaded yet.</p>

        ) : (
          images.map((image, index) => (
            <div key={index}>
              <img
              src={`http://localhost:5000/api/images/file/${image.imageUrl.split('/').pop()}?token=${token}`}
                alt={image.filename}
                width="200"
              />
              <p>{image.filename}</p>
            </div>
          ))
        )}
      </div>

    </div>
  )
}
