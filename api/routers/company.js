const router = require("express").Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// 全会社取得
router.get("/", async (req, res) => {
  const companies = await prisma.company.findMany({
    // take: 10,
    include: { companyBranch: true, companyEmployee: true },
  });

  return res.json(companies);
});

// 1社取得
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const company = await prisma.company.findUnique({
    where: { id: parseInt(id) },
    include: { companyBranch: { include: { companyEmployee: true } } },
  });

  return res.json(company);
});

// 1支店取得
router.get("/branch/:id", async (req, res) => {
  const { id } = req.params;
  const branch = await prisma.companyBranch.findUnique({
    where: { id: parseInt(id) },
    include: { company: true, companyEmployee: true },
  });

  return res.json(branch);
});

//
//post
router.post("/", async (req, res) => {
  try {
    const newPost = await prisma.company.create({
      data: req.body,
    });
    res.status(201).json(newPost);
  } catch (err) {
    console.log(err);
  }
});

router.post("/branch", async (req, res) => {
  try {
    const newPost = await prisma.companyBranch.create({
      data: req.body,
    });
    res.status(201).json(newPost);
  } catch (err) {
    console.log(err);
  }
});

router.post("/employee", async (req, res) => {
  try {
    const newPost = await prisma.companyEmployee.create({
      data: req.body,
    });
    res.status(201).json(newPost);
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
