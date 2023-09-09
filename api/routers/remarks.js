const router = require("express").Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const multer = require("multer");

//--------post-------------------
router.post("/", async (req, res) => {
  const { postData } = req.body;

  if (!postData || typeof postData !== "object") {
    return res.status(400).json({ error: "Invalid or missing data." });
  }

  try {
    const newItem = await prisma.remark.create({ data: postData });
    return res.status(201).json(newItem);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to create remark." });
  }
});

// const storage = multer.memoryStorage(); // メモリストレージを使用してファイルデータを一時的に保存
// const upload = multer({ storage: storage });

// router.post("/", upload.single("file"), async (req, res) => {
//   try {
//     const fileData = req.file.buffer; // メモリストレージからバイナリデータを取得
//     const mimeType = req.file.mimetype; // MIMEタイプを取得
//     const newRemark = await prisma.remark.create({
//       data: {
//         fileData,
//         mimeType,
//         ...req.body,
//       },
//     });
//     return res.status(201).json(newRemark);
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ error: "Failed to save the file data." });
//   }
// });

//---------get-----------------------
router.get("/", async (req, res) => {
  try {
    const items = await prisma.remark.findMany({
      where: req.query,
      select: { id: true, remark: true, fileName: true, date: true },
    });

    // const processedItems = items.map((item) => {
    //   const base64Image = Buffer.from(item.fileData).toString("base64");
    //   return {
    //     id: item.id,
    //     fileName: item.fileName,
    //     mimeType: item.mimeType,
    //     remark: item.remark,
    //     data: `data:${item.mimeType};base64,${base64Image}`,
    //   };
    // });

    return res.json(items);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to fetch remark." });
  }
});

//---------put-----------------------------
router.put("/", async (req, res) => {
  const { updatedData } = req.body;

  if (!updatedData || typeof updatedData !== "object" || !updatedData.id) {
    return res.status(400).json({ error: "Invalid or missing data." });
  }

  try {
    const updateItem = await prisma.remark.update({
      where: { id: updatedData.id },
      data: updatedData,
    });
    return res.status(200).json(updateItem);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to update the remark." });
  }
});

//---------delete--------------------------
router.delete("/:id", async (req, res) => {
  try {
    await prisma.remark.delete({ where: { id: req.params.id } });
    return res.status(204).send();
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to delete the remark." });
  }
});

module.exports = router;
