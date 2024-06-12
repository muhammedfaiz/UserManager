import multer from "multer";
import path from "path"
import fs from 'fs';


const ensureDirectoryExistence = (dir) => {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
  };
  
const storage = multer.diskStorage({
    destination:function(req,file,cb){
        const uploadPath = path.join(path.resolve(),'backend/uploads');
        ensureDirectoryExistence(uploadPath);
        cb(null,uploadPath)
    },
    filename:function(req,file,cb){
        cb(null,file.fieldname+'-'+Date.now()+path.extname(file.originalname))
    }
})

export const upload = multer({storage:storage});