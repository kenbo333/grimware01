const router = require("express").Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

/**
 * 現在の日付と比較して財務年度を計算します。財務年度は、指定された締め月を基に決定されます。
 * 現在の月が締め月以下の場合、前の年を財務年度とします。それ以外の場合は現在の年が財務年度です。
 * 財務年度は、年の下二桁の形式で返されます。
 *
 * @param {number} closingMonth - 財務年度の締め月（1から12の数値）。
 * @returns {string} 財務年度の下二桁を表す文字列。
 */
const getFiscalYear = (closingMonth) => {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth() + 1; // JavaScriptの月は0から始まるため、1を加算

  // 現在の月が締め月以下かどうかに基づいて財務年度を計算し、結果を下二桁の文字列で返す
  return ((month <= closingMonth ? year - 1 : year) % 100)
    .toString()
    .padStart(2, "0");
};

/**
 * 指定されたプレフィックスに基づいて、データベースから次の利用可能なプロジェクト番号を生成します。
 * プロジェクト番号は、指定されたプレフィックスに続く最後のプロジェクト番号の次の番号として計算されます。
 * 利用可能なプロジェクトがない場合、1を返します。
 *
 * @param {string} prefix - プロジェクト番号のプレフィックス。
 * @returns {Promise<number>} 次のプロジェクト番号を表す数値。
 */
const getNextProjectNumber = async (prefix) => {
  // プレフィックスに基づいて、最後のプロジェクトをデータベースから検索
  const lastProject = await prisma.project.findFirst({
    where: { projectNumber: { startsWith: prefix } },
    orderBy: { projectNumber: "desc" },
  });

  // 最後のプロジェクト番号が存在する場合は、その番号の後続の番号を計算し返す。
  // 存在しない場合は、1を返す。
  return lastProject ? parseInt(lastProject.projectNumber.slice(-4)) + 1 : 1;
};

//------create----------------------------------------------------------------
router.post("/", async (req, res) => {
  const { selectType, closingMonth, newFormData } = req.body;

  if (!selectType || selectType.length !== 2 || !closingMonth) {
    return res.status(400).json({ error: "Invalid input" });
  }

  try {
    const prefix = getFiscalYear(closingMonth) + selectType;
    const nextNumber = await getNextProjectNumber(prefix);
    const newProjectNumber = `${prefix}${nextNumber
      .toString()
      .padStart(4, "0")}`;

    const newItem = await prisma.project.create({
      data: { projectNumber: newProjectNumber, ...newFormData },
    });

    return res.json(newItem);
  } catch (error) {
    console.error("Error creating project:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
