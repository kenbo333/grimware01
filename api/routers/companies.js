const router = require("express").Router();
const { PrismaClient } = require("@prisma/client");
const { queryObject } = require("../conditions");
const prisma = new PrismaClient();

//------create------------------------------------------
const createEntity = async (model, data, res) => {
  try {
    const newEntity = await model.create({ data });
    return res.status(201).json(newEntity);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to create entity" });
  }
};

// 会社作成
router.post("/", (req, res) => {
  createEntity(prisma.company, req.body, res);
});

// 支店作成
router.post("/:companyId/branches", (req, res) => {
  createEntity(prisma.companyBranch, req.body, res);
});

// 社員作成
router.post("/:companyId/branches/:branchId/employees", (req, res) => {
  createEntity(prisma.companyEmployee, req.body, res);
});

//------------get-------------------------------------------------
//会社取得
router.get("/", async (req, res) => {
  const companies = await prisma.company.findMany({
    where: queryObject(req.query),
    include: {
      companyBranch: { where: { isStatus: true } },
      companyEmployee: {
        where: {
          isStatus: true,
        },
        include: {
          companyBranch: {
            select: { name: true },
          },
        },
      },
    },
    orderBy: {
      id: "asc",
    },
  });
  return res.status(200).json(companies);
});

//1社取得
router.get("/:companyId", async (req, res) => {
  const company = await prisma.company.findUnique({
    where: { id: req.params.companyId },
    select: {
      name: true,
      companyBranch: {
        include: {
          companyEmployee: {
            where: {
              isStatus: true,
            },
          },
        },
      },
    },
  });
  return res.status(200).json(company);
});

//店社取得
router.get("/:companyId/branches/:branchId", async (req, res) => {
  const branch = await prisma.companyBranch.findUnique({
    where: { id: req.params.branchId },
    select: {
      name: true,
      companyEmployee: true,
      company: {
        select: {
          name: true,
          companyBranch: {
            where: { isStatus: true },
            select: {
              id: true,
              name: true,
            },
          },
        },
      },
    },
  });
  return res.status(200).json(branch);
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
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to update entity" });
  }
};

// 会社情報アップデート
router.put("/:companyId", (req, res) => {
  updateEntity(prisma.company, req.params.companyId, req.body, res);
});

// 店社情報アップデート
router.put("/:companyId/branches/:branchId", (req, res) => {
  updateEntity(prisma.companyBranch, req.params.branchId, req.body, res);
});

// 社員情報アップデート
router.put(
  "/:companyId/branches/:branchId/employees/:employeeId",
  (req, res) => {
    updateEntity(prisma.companyEmployee, req.params.employeeId, req.body, res);
  }
);

//
//-------delete----------------------------------------------
const deleteEntity = async (model, id, res) => {
  try {
    await model.delete({
      where: { id },
    });
    return res.status(204).send();
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to delete entity" });
  }
};

// 会社削除
router.delete("/:companyId", (req, res) => {
  deleteEntity(prisma.company, req.params.companyId, res);
});

// 店社削除
router.delete("/:companyId/branches/:branchId", (req, res) => {
  deleteEntity(prisma.companyBranch, req.params.branchId, res);
});

// 社員削除
router.delete(
  "/:companyId/branches/:branchId/employees/:employeeId",
  (req, res) => {
    deleteEntity(prisma.companyEmployee, req.params.employeeId, res);
  }
);

module.exports = router;
