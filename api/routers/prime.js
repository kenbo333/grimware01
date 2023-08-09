const router = require("express").Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

//------------get-------------------------------------------------
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
    where: { id },
    include: { companyBranch: { include: { companyEmployee: true } } },
  });

  return res.json(company);
});

//店社取得
router.get("/branch/employee/:branchId", async (req, res) => {
  const { branchId } = req.params;
  const branch = await prisma.companyBranch.findUnique({
    where: { id: branchId },
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

//------create------------------------------------------
//会社作成
router.post("/", async (req, res) => {
  try {
    const newCompany = await prisma.company.create({
      data: req.body,
    });
    return res.status(201).json(newCompany);
  } catch (err) {
    return console.log(err);
  }
});

//支店作成
router.post("/branch", async (req, res) => {
  try {
    const newBranch = await prisma.CompanyBranch.create({
      data: req.body,
    });
    return res.status(201).json(newBranch);
  } catch (err) {
    return console.log(err);
  }
});

//社員作成
router.post("/branch/employee", async (req, res) => {
  try {
    const newEmp = await prisma.companyEmployee.create({
      data: req.body,
    });
    return res.status(201).json(newEmp);
  } catch (err) {
    return console.log(err);
  }
});

//------update-------------------------------------------------
//会社情報アップデート
router.put("/", async (req, res) => {
  const { formData } = req.body;
  try {
    const putCompany = await prisma.company.update({
      where: {
        id: req.query.sel,
      },
      data: formData,
    });
    return res.status(200).json(putCompany);
  } catch (err) {
    return console.log(err);
  }
});

//店社情報アップデート
router.put("/branch/:id", async (req, res) => {
  const { formData } = req.body;
  try {
    const putBranch = await prisma.companyBranch.update({
      where: {
        id: req.query.sel,
      },
      data: formData,
    });
    return res.status(200).json(putBranch);
  } catch (err) {
    return console.log(err);
  }
});

//社員情報アップデート
router.put("/branch/employee/:id", async (req, res) => {
  const { formData } = req.body;
  try {
    const putEmp = await prisma.companyEmployee.update({
      where: {
        id: req.query.sel,
      },
      data: formData,
    });
    return res.status(200).json(putEmp);
  } catch (err) {
    return console.log(err);
  }
});

//-------delete----------------------------------------------
//会社削除
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deleteCompany = await prisma.company.delete({
      where: { id },
    });
    return res.json(deleteCompany);
  } catch (err) {
    return console.log(err);
  }
});

//店社削除
router.delete("/branch/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deleteBranch = await prisma.companyBranch.delete({
      where: { id },
    });
    return res.json(deleteBranch);
  } catch (err) {
    return console.log(err);
  }
});

//社員削除
router.delete("/branch/employee/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deleteEmployee = await prisma.companyEmployee.delete({
      where: { id },
    });
    return res.json(deleteEmployee);
  } catch (err) {
    return console.log(err);
  }
});

module.exports = router;
