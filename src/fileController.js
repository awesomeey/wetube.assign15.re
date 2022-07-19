import { readdir, readFile } from "fs";

const TXT_DIR = "uploads/";

export const getFileList = (req, res) => {
	let fileList = [];
	readdir(TXT_DIR, (error, files) => {
		try{
			files.map((file, index) =>{
				const divide = file.split(/[-.]/);
				const fileData = {
					id: divide[1],
					name:[divide[0], divide[2]].join(".")
				}
				fileList.push(fileData);
			});
			// console.log(`fileList : ${JSON.stringify(fileList)}`);
			return res.render("home", { pageTitle: "TXT2HTML!", fileList });
		}catch(error){
			console.log(error);
			return res.status(400).render("404", { pageTitle: "Error: Data Load", errorMsg: "There was a problem loading the file list😅 Please try again in a few minutes" });
		}
	})
};

export const postFile = (req, res) => {
	const { filename } = req.file;
	const matches = filename.match(/[0-9]{13}/g)
	const fileId = matches.length > 1 ? matches[matches.length - 1] : matches[0];
	return res.redirect(`/read/${fileId}`);
};

export const getfile = (req, res) => {
	const { id } = req.params;

	// 파일 존재 여부 선확인
	// schema static 처럼 공통 함수로 빼고 싶었지만,, 비동기화 + await 형식 promise를 써야하는 듯.
	let fileList = [];
	readdir(TXT_DIR, (error, files) => {
		try{
			files.map((file, index) =>{
				const divide = file.split(/[-.]/);
				const fileData = {
					id: divide[1],
					name:[divide[0], divide[2]].join(".")
				}
				fileList.push(fileData);
			});

			const matchedFile = fileList.filter((file) => file.id === id);
			if(!matchedFile.length){
				return res.render("404", { pageTitle: "Error: Nothing Data!", errorMsg: "파일이 삭제되었거나 잘못된 URL 접근입니다. 확인 후 다시 시도하세요!" });
			}

			const { name } = matchedFile[0];
			const divideDot = name.split(".");
			const fileName = `${divideDot[0]}-${id}.${divideDot[1]}`;
			// console.log(fileName);

			readFile(`${TXT_DIR}/${fileName}`, (error, data) => {
				try{
					return res.render("read", { pageTitle: name, data });
				}catch(error){
					console.log(error);
					return res.status(400).render("404", { pageTitle: "Error: Data Load", errorMsg: "There was a problem loading the file Please try again in a few minutes" });
				}
			});
		}catch(error){
			console.log(error);
			return res.status(400).render("404", { pageTitle: "Error: Data Load", errorMsg: "There was a problem loading the file list😅 Please try again in a few minutes" });
		}
	})
	

	// if(!id)
	// readFile(TXT_DIR, (error, files) => {
	// 	if (error){
	// 		console.log(error);
	// 		return res.render("read", { pageTitle: "TXT2HTML!", errorMsg: "There was a problem loading the file list😅 Please try again in a few minutes" });
	// 	}
	// 	let fileList = [];
	// 	files.map((file, index) =>{
	// 		const divide = file.split(/[-.]/);
	// 		const fileData = {
	// 			id: divide[1],
	// 			name:[divide[0], divide[2]].join(".")
	// 		}
	// 		fileList.push(fileData);
	// 	});
	// 	// console.log(`fileList : ${JSON.stringify(fileList)}`);
	// 	return res.render("read", { pageTitle: "TXT2HTML!", fileList });
	// })
	// console.log(id);
	// return res.redirect("/");
	// const fileList = fs.readdir("uploads", (error, files) => {
	//   if (error) console.log(error);
	// });
	// console.log(fileList);
	// const fileList = fs.readFile()
};
