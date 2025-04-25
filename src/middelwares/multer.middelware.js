import multer from "multer";


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "./public/temp")
    },
    filename: function (req, file, cb) {
      
      cb(null, file.originalname)   //original name emeans the name same as the uploaded by the useer
    }
  })
  
  export const upload = multer({ storage, })