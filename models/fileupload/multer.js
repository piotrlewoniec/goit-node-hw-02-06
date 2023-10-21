const path = require("path");
const fs = require("fs").promises;

const multer = require("multer");

const Jimp = require("jimp");

const uploadDir = path.join(process.cwd(), "tmp");
const uploadDirAvatar = path.join(process.cwd(), "public/avatars");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
  limits: {
    fileSize: 1048576,
  },
});

const upload = multer({
  storage: storage,
});

const uploadAvatar = async (req, res, next) => {
  const user = req.user;
  const { path: pathWithFileName, originalname } = req.file;
  const pathWithFileNameFinal = path.join(
    uploadDirAvatar,
    user.email + path.extname(originalname)
  );
  const avatarUrl = "/avatars/" + user.email + path.extname(originalname);
  try {
    const image = await Jimp.read(pathWithFileName);
    image.resize(250, 250).write(pathWithFileName);
    await fs.rename(pathWithFileName, pathWithFileNameFinal);
  } catch (err) {
    await fs.unlink(pathWithFileName);
    console.log(`Error: ${err.message}`);
    return next(err);
  }
  req.user.avatarURL = avatarUrl;
  next();
};

module.exports = { upload, uploadAvatar };
