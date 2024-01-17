const router = require("express").Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

//------create--------------------------------
router.post("/", async (req, res) => {
  try {
    const newItem = await prisma.option.create({
      data: {
        projType1: {
          create: {},
        },
        projType2: {
          create: {},
        },
      },
    });
    return res.status(201).json(newItem);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to create a new option." });
  }
});

//-----------read------------------------------------
router.get("/", async (req, res) => {
  try {
    const items = await prisma.option.findUnique({
      where: { id: "1" },
      include: {
        projType1: true,
        projType2: true,
      },
    });
    return res.status(200).json(items);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to fetch option." });
  }
});

//-----update--------------------------------------
router.put("/:optionId", async (req, res) => {
  try {
    const updateItem = await prisma.option.update({
      where: { id: req.params.optionId },
      data: req.body,
    });
    return res.status(200).json(updateItem);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to update the option." });
  }
});

router.put("/:optionId/projType1/:projType1Id", async (req, res) => {
  try {
    const updateItem = await prisma.projType1.update({
      where: { id: req.params.optionId },
      data: req.body,
    });
    return res.status(200).json(updateItem);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to update the option." });
  }
});

router.put("/:optionId/projType2/:projType2Id", async (req, res) => {
  try {
    const updateItem = await prisma.projType2.update({
      where: { id: req.params.optionId },
      data: req.body,
    });
    return res.status(200).json(updateItem);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to update the option." });
  }
});

//------delete-----------------------------------
// router.delete("/:optionId", async (req, res) => {
//   try {
//     await prisma.option.delete({ where: { id: req.params.optionId } });
//     return res.status(204).send();
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ error: "Failed to delete the option." });
//   }
// });

module.exports = router;
