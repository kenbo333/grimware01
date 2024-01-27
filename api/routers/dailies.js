const router = require("express").Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

//---------create--------------------------------
router.post("/", async (req, res) => {
  try {
    const newItem = await prisma.daily.create({ data: req.body });
    return res.status(201).json(newItem);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to create a new daily." });
  }
});

router.post("/:dailyId/dailyReports", async (req, res) => {
  try {
    const newItem = await prisma.dailyReport.create({
      data: {
        fk_dailyId: req.params.dailyId,
      },
    });
    return res.status(201).json(newItem);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: "Failed to create a new dailyReport." });
  }
});

//-----------read--------------------------------
router.get("/", async (req, res) => {
  try {
    const items = await prisma.daily.findMany({});
    return res.status(200).json(items);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to fetch dailies." });
  }
});

router.get("/:dailyId/dailyReports", async (req, res) => {
  const { dailyId } = req.params;
  try {
    const items = await prisma.dailyReport.findMany({
      where: { fk_dailyId: dailyId },
    });
    return res.status(200).json(items);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to fetch dailyReports." });
  }
});

//------update-------------------------------------------------
router.put("/:dailyId/dailyReports/:dailyReportId", async (req, res) => {
  try {
    const {
      fk_monthlyReportId,
      fk_carId,
      fk_companyEmployeeId,
      fk_paidLeaveId,
      ...otherData
    } = req.body;

    //燃料代の計算
    let calcFuelCost = null;
    if (fk_carId) {
      const car = await prisma.car.findUnique({
        where: { id: fk_carId },
      });
      const option = await prisma.option.findFirst();
      const fuelUnitPrice = option[car.fuelType];
      //op:燃料単価 × 距離 × 運転÷ car:燃費
      calcFuelCost =
        (fuelUnitPrice * req.body.distance * req.body.driving) /
        car.fuelConsumption;
    }

    //労務原価の計算
    let calcLaborCost = null;
    if (fk_companyEmployeeId) {
      const emp = await prisma.companyEmployee.findUnique({
        where: { id: fk_companyEmployeeId },
      });
      const op = await prisma.option.findFirst();
      //日勤 + 夜勤 + 残業 + 深夜残業 + 運転手当 + 出張手当 + 夜食手当
      calcLaborCost = Math.ceil(
        emp.laborCostDayShift * (Number(req.body.day) || 0) +
          emp.laborCostNightShift * (Number(req.body.night) || 0) +
          emp.laborCostOvertime * (Number(req.body.overtime) || 0) +
          emp.laborCostLateOvertime * (Number(req.body.lateOvertime) || 0) +
          op.allowanceDriving * (Number(req.body.driving) || 0) +
          op.allowanceBusinessTrip * (Number(req.body.isBusinessTrip) || 0) +
          op.allowanceNightMeal * (Number(req.body.isNightMeal) || 0)
      );
    }

    // //有休テーブルに入力
    // if (req.body.isPaidLeave) {
    //   const paidLeaves = await prisma.paidLeave.findMany({
    //     where: {
    //       fk_companyEmployeeId,
    //       isExpiration: false,
    //       expirationDate: {
    //         gte: req.body.fk_dailyId, //失効日 以上のデータ
    //       },
    //     },
    //     orderBy: {
    //       expirationDate: "asc", //失効日が近い順にソート
    //     },
    //   });
    //   //有休が取得できるレコード (付与日数 >= 取得日数)
    //   const paidLeaveToUpdate = paidLeaves.find(
    //     (paidLeave) => paidLeave.grantDay >= paidLeave.takenDates.length
    //   );
    //   // 条件を満たす要素が見つかった場合、更新を行う
    //   if (paidLeaveToUpdate) {
    //     paidLeaveToUpdate.takenDates.push(req.body.fk_dailyId);
    //     await prisma.paidLeave.update({
    //       where: { id: paidLeaveToUpdate.id },
    //       data: { takenDates: paidLeaveToUpdate.takenDates },
    //     });
    //   }
    // }

    //空文字列の場合、nullを代入してdataまとめる
    const updateData = {
      ...otherData,
      fk_monthlyReportId: fk_monthlyReportId || null,
      fk_carId: fk_carId || null,
      fk_companyEmployeeId: fk_companyEmployeeId || null,
      fk_paidLeaveId: fk_paidLeaveId || null,
      calcFuelCost,
      calcLaborCost,
    };

    const updateItem = await prisma.dailyReport.update({
      where: { id: req.params.dailyReportId },
      data: updateData,
    });
    return res.status(200).json(updateItem);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to update the dailyReport." });
  }
});

//-----------delete--------------------------------
router.delete("/:dailyId/dailyReports/:dailyReportId", async (req, res) => {
  try {
    await prisma.dailyReport.delete({
      where: {
        id: req.params.dailyReportId,
      },
    });
    return res.status(204).send();
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: "Failed to delete the dailyReport record." });
  }
});

module.exports = router;
