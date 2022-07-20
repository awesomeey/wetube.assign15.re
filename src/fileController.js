import { readdir, readFile } from "fs";

const TXT_DIR = "uploads/";

export const getFileList = (req, res) => {
  let fileList = [];
  readdir(TXT_DIR, (error, files) => {
    try {
      if (files === undefined || !files.length) {
        return res.status(400).render("home", {
          pageTitle: "TXT2HTML!",
          errorMsg:
            "There is no list, because there are no files running the converter yet! Be the first to experience it😊"
        });
      }

      files.map((file) => {
        const divide = file.split(/[-.]/);
        const fileData = {
          id: divide[1],
          name: [divide[0], divide[2]].join(".")
        };
        fileList.push(fileData);
      });
      return res.render("home", { pageTitle: "TXT2HTML!", fileList });
    } catch (error) {
      console.log(error);
      return res.status(400).render("home", {
        pageTitle: "TXT2HTML!",
        errorMsg:
          "There was a problem loading the file list😅 Please try again in a few minutes"
      });
    }
  });
};

export const postFile = (req, res) => {
  const { filename } = req.file;
  const matches = filename.match(/[0-9]{13}/g);
  const fileId = matches.length > 1 ? matches[matches.length - 1] : matches[0];
  req.session.fileId = fileId;
  return res.redirect("/read");
};

export const getfile = (req, res) => {
  const { id } = req.params;
  const targetId = id ? id : req.session.fileId;

  // 파일 존재 여부 선확인
  // schema static 처럼 중복 코드를 공통 함수로 빼고 싶었지만,, 비동기화 + await 형식의 promise를 써야하는 듯.
  let fileList = [];
  readdir(TXT_DIR, (error, files) => {
    try {
      files.map((file) => {
        const divide = file.split(/[-.]/);
        const fileData = {
          id: divide[1],
          name: [divide[0], divide[2]].join(".")
        };
        fileList.push(fileData);
      });

      const matchedFile = fileList.filter((file) => file.id === targetId);
      if (!matchedFile.length) {
        return res.render("404", {
          pageTitle: "Error: Nothing Data!",
          errorMsg:
            "The file has been deleted or has an invalid URL access. Please check and try again!"
        });
      }

      const { name } = matchedFile[0];
      const divideDot = name.split(".");
      const fileName = `${divideDot[0]}-${targetId}.${divideDot[1]}`;

      readFile(`${TXT_DIR}${fileName}`, (error, data) => {
        try {
          return res.render("read", { pageTitle: name, data });
        } catch (error) {
          console.log(error);
          return res.status(400).render("404", {
            pageTitle: "Error: Data Load",
            errorMsg:
              "There was a problem loading the file😅 Please try again in a few minutes"
          });
        }
      });
    } catch (error) {
      console.log(error);
      return res.status(400).render("404", {
        pageTitle: "Error: Data Load",
        errorMsg:
          "There was a problem loading the file list😅 Please try again in a few minutes"
      });
    }
  });
};
