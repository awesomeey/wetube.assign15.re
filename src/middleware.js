import multer from "multer";
import path from "path";

// const addZero = (i) => {
// 	if (i < 10) {
// 			i = "0" + i;
// 	}
// 	return i;
// }

let storage = multer.diskStorage({
	destination: function(req, file, cb) {
		cb(null, 'uploads/');
	},
	filename: function(req, file, cb) {
	// 	let originalFileName = file.originalname;
	// 	let originalFileFrgs = originalFileName.split(".");

	// 	// const today = new Date();
	// 	// const fullYear = today.getFullYear();
	// 	// const month = addZero(today.getMonth());
	// 	// const day = addZero(today.getDate());
	// 	// const Hours = today.getHours();
	// 	// const Mins = today.getMinutes();
	// 	// const Secs = today.getSeconds();
	// 	// let fileSuffix = [fullYear, month, day].join("") + "-" + [Hours, Mins, Secs].join("");
	// 	const fileSuffix = Date.now();

	// 	originalFileFrgs[0] += '-' + fileSuffix;
	// 	file.filename = originalFileFrgs.join(".");
	// cb(null, file.filename)
		const extension = path.extname(file.originalname);
		const basename = path.basename(file.originalname, extension);
		cb(null, basename + "-" + Date.now() + extension);
	}
});

export const uploadFile = multer({ storage });

