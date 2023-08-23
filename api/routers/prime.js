const router = require("express").Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

//------------get-------------------------------------------------
const getIsStatus = (query) => query.isStatus !== "false";
//元請会社取得
router.get("/", async (req, res) => {
  const isStatus = getIsStatus(req.query);

  const companies = await prisma.company.findMany({
    where: { f_prime: true, f_status: isStatus },
    include: {
      companyBranch: { where: { f_status: true } },
      companyEmployee: {
        where: {
          f_status: true,
        },
        include: {
          companyBranch: {
            select: { branchName: true },
          },
        },
      },
    },
    orderBy: { id: "asc" },
  });
  return res.status(200).json(companies);
});

//1社取得
router.get("/branch/:id", async (req, res) => {
  const isStatus = getIsStatus(req.query);
  const { id } = req.params;

  const company = await prisma.company.findUnique({
    where: { id },
    select: {
      companyName: true,
      companyBranch: {
        where: { f_status: isStatus },
        include: {
          companyEmployee: {
            where: {
              f_status: true,
            },
          },
        },
      },
    },
  });
  return res.status(200).json(company);
});

//店社取得
router.get("/branch/employee/:branchId", async (req, res) => {
  const isStatus = getIsStatus(req.query);

  const { branchId } = req.params;

  const branch = await prisma.companyBranch.findUnique({
    where: { id: branchId },
    select: {
      branchName: true,
      company: {
        select: {
          companyName: true,
          companyBranch: {
            where: { f_status: true },
            select: {
              id: true,
              branchName: true,
            },
          },
        },
      },
      companyEmployee: { where: { f_status: isStatus } },
    },
  });
  return res.status(200).json(branch);
});

//
//------create------------------------------------------
const createEntity = async (model, data, res) => {
  try {
    const newEntity = await model.create({ data });
    return res.status(201).json(newEntity);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Failed to create entity" });
  }
};

// 会社作成
router.post("/", (req, res) => {
  createEntity(prisma.company, req.body, res);
});

// 支店作成
router.post("/branch/:id", (req, res) => {
  createEntity(prisma.companyBranch, req.body, res);
});

// 社員作成
router.post("/branch/employee/:id", (req, res) => {
  createEntity(prisma.companyEmployee, req.body, res);
});

//
//-------delete----------------------------------------------
const deleteEntity = async (model, id, res) => {
  try {
    await model.delete({
      where: { id },
    });
    return res.status(204).send();
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Failed to delete entity" });
  }
};

// 会社削除
router.delete("/", (req, res) => {
  deleteEntity(prisma.company, req.query.sel, res);
});

// 店社削除
router.delete("/branch/:id", (req, res) => {
  deleteEntity(prisma.companyBranch, req.query.sel, res);
});

// 社員削除
router.delete("/branch/employee/:id", (req, res) => {
  deleteEntity(prisma.companyEmployee, req.query.sel, res);
});

//
//------update-------------------------------------------------
const updateEntity = async (model, id, data, res) => {
  try {
    const updatedEntity = await model.update({
      where: { id },
      data,
    });
    return res.status(200).json(updatedEntity);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Failed to update entity" });
  }
};

// 会社情報アップデート
router.put("/", (req, res) => {
  updateEntity(prisma.company, req.query.sel, req.body.formData, res);
});

// 店社情報アップデート
router.put("/branch/:id", (req, res) => {
  updateEntity(prisma.companyBranch, req.query.sel, req.body.formData, res);
});

// 社員情報アップデート
router.put("/branch/employee/:id", (req, res) => {
  updateEntity(prisma.companyEmployee, req.query.sel, req.body.formData, res);
});

module.exports = router;
