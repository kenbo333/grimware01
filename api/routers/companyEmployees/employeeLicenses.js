const router = require("express").Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "C:\\Users\\006kenta\\dev\\file\\employeeLicense"); // アップロードフォルダ
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage: storage });

//--------create-------------------
router.post("/:companyEmployeeId/employeeLicenses", async (req, res) => {
  const { postData } = req.body;

  try {
    const newItem = await prisma.employeeLicense.create({ data: postData });
    return res.status(201).json(newItem);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to create employeeLicense." });
  }
});

//---------get-----------------------
router.get("/:companyEmployeeId/employeeLicenses", async (req, res) => {
  try {
    const items = await prisma.employeeLicense.findMany({
      where: {
        fk_companyEmployee: req.params.companyEmployeeId,
      },
    });

    return res.json(items);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to fetch employeeLicense." });
  }
});

//データファイル
router.get("/download/:employeeLicenseId", async (req, res) => {
  const { employeeLicenseId } = req.params;

  try {
    // データベースから対応するファイルのパスを取得する
    const record = await prisma.employeeLicense.findUnique({
      where: { id: employeeLicenseId },
    });
    if (!record) {
      return res.status(404).send("Record not found.");
    }
    const filePath = record.filePath;
    const downloadFileName = record.fileName;
    const fileType = record.fileType;

    // 特定のファイルタイプの場合、inlineでContent-Dispositionヘッダーを設定
    if (["image/jpeg", "image/png", "application/pdf"].includes(fileType)) {
      res.setHeader(
        "Content-Disposition",
        `inline; filename*=UTF-8''${encodeURIComponent(downloadFileName)}`
      );
    } else {
      // それ以外のファイルタイプの場合、attachmentでContent-Dispositionヘッダーを設定
      res.setHeader(
        "Content-Disposition",
        `attachment; filename*=UTF-8''${encodeURIComponent(downloadFileName)}`
      );
    }

    res.sendFile(filePath);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to download the file." });
  }
});

//---------update-----------------------------
router.put(
  "/:companyEmployeeId/employeeLicenses/:employeeLicenseId",
  upload.single("file"),
  async (req, res) => {
    const { file } = req;
    const { employeeLicenseId } = req.params;
    const updateData = JSON.parse(req.body.updateData);

    try {
      if (file) {
        // ファイルの保存先となるディレクトリのパスを生成
        const dirPath = path.join(file.destination, employeeLicenseId);

        // ディレクトリが存在する場合、それを完全に削除
        if (fs.existsSync(dirPath)) {
          fs.rmSync(dirPath, { recursive: true });
        }

        // 新しいディレクトリを作成
        fs.mkdirSync(dirPath);

        // ファイルを新しい場所に移動
        const newFilePath = path.join(dirPath, file.originalname);
        fs.renameSync(file.path, newFilePath);

        updateData.fileType = file.mimetype;
        updateData.filePath = newFilePath;
      }

      const updateItem = await prisma.employeeLicense.update({
        where: { id: employeeLicenseId },
        data: updateData,
      });

      return res.status(200).json(updateItem);
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ error: "Failed to update the employeeLicense." });
    }
  }
);

//---------delete--------------------------
router.delete(
  "/:companyEmployeeId/employeeLicenses/:employeeLicenseId",
  async (req, res) => {
    const { employeeLicenseId } = req.params;

    try {
      // データベースからレコードを取得
      const record = await prisma.employeeLicense.findUnique({
        where: { id: employeeLicenseId },
      });
      if (!record) {
        return res.status(404).send("Record not found.");
      }

      // レコードのfilePathが存在する場合、関連するフォルダを削除
      if (record.filePath) {
        const dirPath = path.dirname(record.filePath);
        await fs.promises.rm(dirPath, { recursive: true });
      }

      // データベースからレコードを削除
      await prisma.employeeLicense.delete({ where: { id: employeeLicenseId } });

      return res.send(
        "Record and associated folder (if any) deleted successfully."
      );
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ error: "Failed to delete the employeeLicense." });
    }
  }
);

module.exports = router;
