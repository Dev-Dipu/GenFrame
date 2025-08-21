require("dotenv").config();
let ImageKit = require("imagekit");

let imagekit = new ImageKit({
    publicKey : process.env.IMGKIT_PUBLIC_KEY,
    privateKey : process.env.IMGKIT_PRIVATE_KEY,
    urlEndpoint : process.env.IMGKIT_ENDPOINT
});

const uploadFile = async (file, fileName) => {
    const result = await imagekit.upload({file, fileName});
    return result;
}

module.exports = uploadFile