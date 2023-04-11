const {User} = require('../../models/user');
const path = require('path');
const fs = require('fs/promises');
const Jimp = require("jimp");

const updateAvatar = async (req, res) => {
    const {path: tempUpload, originalname} = req.file;
    const {_id} = req.user;
    const imageName = `${_id}_${originalname}`;
    const avatarPath = path.join(__dirname, '../../', 'public', 'avatars', imageName);
    Jimp.read(tempUpload, (err, image) => {
        if (err) throw err;
        image.resize(250, 250).quality(60).write(`./public/avatars/${imageName}`);
      });
    try {
        await fs.rename(tempUpload, avatarPath);
        const avatarURL = path.join('avatars', imageName);
        await User.findByIdAndUpdate(_id, {avatar: avatarURL});
        res.status(200).json({ 
           avatar: avatarURL,
       });
    } catch (error) {
        await fs.unlink(tempUpload);
        res.status(401).json({
            message: 'Not authorized'
        });
    }
}

module.exports = updateAvatar;