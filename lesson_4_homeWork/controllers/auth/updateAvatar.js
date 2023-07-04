const { User } = require("../../models");
const path = require("path");
const fs = require("fs/promises");
const { HttpCode } = require("../../helpers");
const cloudinary = require("cloudinary");

const { CLOUD_NAME, API_KEY, API_SECRET } = process.env;

cloudinary.config({
  cloud_name: CLOUD_NAME,
  api_key: API_KEY,
  api_secret: API_SECRET,
});

const avatarDir = path.join(__dirname, "../", "../", "public", "avatars");

const updateAvatar = async (req, res) => {
  try {
    const { _id } = req.user;
    const { path: tempPath, originalname } = req.file;
    const imageName = `${_id}-${originalname}`;
    const resultPath = path.join(avatarDir, imageName);

    await fs.rename(tempPath, resultPath);
    const { secure_url } = await cloudinary.v2.uploader.upload(
      resultPath,
      { public_id: `avatars/${imageName}`, folder: "avatars" },
      async (err, result) => {
        if (err) throw err;
        await fs.unlink(resultPath);
        return result;
      }
    );

    //
    // const avatarURL = path.join("public", "avatars", imageName);
    //
    await User.findByIdAndUpdate(_id, { avatarURL: secure_url });

    res.json({
      status: "success",
      code: HttpCode.OK,
      data: {
        avatarURL: secure_url,
      },
    });
  } catch (error) {
    await fs.unlink(avatarDir);
    throw error;
  }
};

module.exports = updateAvatar;
