const router = require("express").Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

//元請会社取得
router.get("/", async (req, res) => {
  const companies = await prisma.company.findMany({
    where: { f_prime: true },
    include: {
      companyBranch: true,
      companyEmployee: {
        include: { companyBranch: { select: { branchName: true } } },
      },
    },
    orderBy: { id: "asc" },
  });

  return res.json(companies);
});

//1社取得
router.get("/branch/:id", async (req, res) => {
  const { id } = req.params;
  const company = await prisma.company.findUnique({
    where: { id: parseInt(id) },
    include: { companyBranch: { include: { companyEmployee: true } } },
  });

  return res.json(company);
});

//店社取得
router.get("/branch/employee/:branchId", async (req, res) => {
  const { branchId } = req.params;
  const branch = await prisma.companyBranch.findUnique({
    where: { id: parseInt(branchId) },
    include: {
      company: {
        select: {
          companyName: true,
          companyBranch: {
            select: {
              id: true,
              branchName: true,
            },
          },
        },
      },
      companyEmployee: true,
    },
  });

  return res.json(branch);
});

//
//会社作成
router.post("/", async (req, res) => {
  try {
    const newPost = await prisma.company.create({
      data: req.body,
    });
    return res.status(201).json(newPost);
  } catch (err) {
    return console.log(err);
  }
});

//支店作成
router.post("/branch", async (req, res) => {
  try {
    const newPost = await prisma.CompanyBranch.create({
      data: req.body,
    });
    return res.status(201).json(newPost);
  } catch (err) {
    return console.log(err);
  }
});

//社員作成
router.post("/emp", async (req, res) => {
  try {
    const newPost = await prisma.companyEmployee.create({
      data: req.body,
    });
    return res.status(201).json(newPost);
  } catch (err) {
    return console.log(err);
  }
});

//会社情報アップデート
router.put("/", async (req, res) => {
  const { formData } = req.body;
  try {
    const update = await prisma.company.update({
      where: {
        id: parseInt(req.query.sel),
      },
      data: formData,
    });
    return res.status(200).json(update);
  } catch (err) {
    return console.log(err);
  }
});

module.exports = router;
