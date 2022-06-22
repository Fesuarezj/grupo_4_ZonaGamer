const path = require('path');
const multer = require('multer');

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, './public/images/products');
	},
	filename: (req, file, cb) => {
		let filename = `${Date.now()}_img${path.extname(file.originalname)}`;
		cb(null, filename);
	}
})

const uploadFile = multer({ storage });

module.exports = uploadFile;