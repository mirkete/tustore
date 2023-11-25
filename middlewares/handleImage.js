import multer from "multer"

function filterFileType (req, file, cb) {
  const allowedTypes = ["image/jpeg", "image/png"]
  const responseBool = allowedTypes.includes(file.mimetype)

  return cb(null, responseBool)
}

const storage = multer.memoryStorage()
const upload = multer({ storage, fileFilter: filterFileType })

export function handleImage () {
  return upload.single("image")
}