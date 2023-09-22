const router = require("express").Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "C:\\Users\\006kenta\\dev\\file"); // アップロードフォルダ
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage: storage });

//--------create-------------------
router.post("/", async (req, res) => {
  const { postData } = req.body;

  try {
    const newItem = await prisma.remark.create({ data: postData });
    return res.status(201).json(newItem);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to create remark." });
  }
});

//---------get-----------------------
router.get("/", async (req, res) => {
  try {
    const items = await prisma.remark.findMany({
      where: req.query,
    });

    return res.json(items);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to fetch remark." });
  }
});

//データファイル
router.get("/download/:remarkId", async (req, res) => {
  const { remarkId } = req.params;

  try {
    // データベースから対応するファイルのパスを取得する
    const record = await prisma.remark.findUnique({ where: { id: remarkId } });
    if (!record) {
      return res.status(404).send("Record not found.");
    }
    const filePath = record.filePath;
    const downloadFileName = record.fileName;

    res.download(filePath, encodeURIComponent(downloadFileName));
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to download the file." });
  }
});

//---------update-----------------------------
router.put("/:remarkId", upload.single("file"), async (req, res) => {
  const { file } = req;
  const { remarkId } = req.params;
  const updateData = JSON.parse(req.body.updateData);

  try {
    if (file) {
      // ファイルの保存先となるディレクトリのパスを生成
      const dirPath = path.join(file.destination, remarkId);

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

    const updateItem = await prisma.remark.update({
      where: { id: remarkId },
      data: updateData,
    });

    return res.status(200).json(updateItem);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to update the remark." });
  }
});

//---------delete--------------------------
router.delete("/:remarkId", async (req, res) => {
  const { remarkId } = req.params;

  try {
    // データベースからレコードを取得
    const record = await prisma.remark.findUnique({ where: { id: remarkId } });
    if (!record) {
      return res.status(404).send("Record not found.");
    }

    // レコードのfilePathが存在する場合、関連するフォルダを削除
    if (record.filePath) {
      const dirPath = path.dirname(record.filePath);
      await fs.promises.rm(dirPath, { recursive: true });
    }

    // データベースからレコードを削除
    await prisma.remark.delete({ where: { id: remarkId } });

    return res.send(
      "Record and associated folder (if any) deleted successfully."
    );
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to delete the remark." });
  }
});

module.exports = router;
