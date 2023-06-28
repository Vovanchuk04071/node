const { User } = require("../../models");
const path = require("path");
const fs = require("fs/promises");

const avatarDir = path.join(__dirname, "../../", "public", "avatars");

const updateAvatar = async (req, res) => {
  const { _id } = req.user;
  console.log(_id);
  const { path: tempPath, originalname } = req.file;
  const imageName = `${_id}-${originalname}`;

  try {
    const resultPath = path.join(avatarDir, imageName);

    await fs.rename(tempPath, resultPath);

    const avatarURL = path.join("public", "avatars", imageName);

    await User.findByIdAndUpdate(_id, { avatarURL });

    res.json({
      status: "success",
      code: 200,
      data: {
        avatarURL,
      },
    });
  } catch (error) {
    await fs.unlink(avatarDir);
    throw error;
  }
};

module.exports = updateAvatar;
