const Image = require('../models/Image.js')
const path  = require('path')
const fs    = require('fs')    


const uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' })
    }

    const image = await Image.create({
      imageUrl:   req.file.path.replace(/\\/g, '/'),
      filename:   req.file.originalname,
      uploadedBy: req.userId
    })

    res.status(201).json({ message: 'Image uploaded successfully', image })

  } catch (err) {
    res.status(500).json({ message: 'Server error' })
  }
}


const getImages = async (req, res) => {
  try {
    const images = await Image.find({ uploadedBy: req.userId })
      .sort({ createdAt: -1 })

    res.status(200).json(images)

  } catch (err) {
    res.status(500).json({ message: 'Server error' })
  }
}


const getImageFile = async (req, res) => {
  try {
    const filename  = req.params.filename
    const imagePath = path.join(__dirname, '..', 'uploads', filename)

 
    if (!fs.existsSync(imagePath)) {
      return res.status(404).json({ message: 'Image not found' })  
    }

    
    const image = await Image.findOne({
      imageUrl:   `uploads/${filename}`,   
      uploadedBy: req.userId
    })
 
    if (!image) {
      return res.status(403).json({ message: 'Access denied' })
    }

    res.sendFile(imagePath)

  } catch (err) {
    res.status(500).json({ message: 'Server error' })
  }
}

module.exports = { uploadImage, getImages, getImageFile }