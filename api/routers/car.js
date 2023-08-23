const router = require("express").Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

//-----------get---------------------------
router.get("/", async (req, res) => {
  const cars = await prisma.car.findMany();
  res.json(cars);
});

module.exports = router;
