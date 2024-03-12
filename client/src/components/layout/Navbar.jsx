import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="navbar navbar-dark bg-dark">
      <div className="d-flex flex-row">
        <Link href="/ownCompany" className="p-2 text-white fw-bold">
          自社
        </Link>
        <Link href="/primes" className="p-2 text-white fw-bold">
          元請会社
        </Link>
        <Link href="/subs" className="p-2 text-white fw-bold">
          下請会社
        </Link>
        <Link href="/purchases" className="p-2 text-white fw-bold">
          仕入会社
        </Link>
        <Link href="/cars" className="p-2 text-white fw-bold">
          車両
        </Link>
        <Link href="/projects" className="p-2 text-white fw-bold">
          プロジェクト
        </Link>
        <Link href="/dailies" className="p-2 text-white fw-bold">
          日報
        </Link>
        <Link href="/expenses" className="p-2 text-white fw-bold">
          経費
        </Link>
        <Link href="/option" className="p-2 text-white fw-bold">
          オプション
        </Link>
        <Link href="/purchaseImport" className="p-2 text-white fw-bold">
          仕入インポート
        </Link>
      </div>
      <div className="d-flex flex-row">
        <Link href="/lists/projects" className="p-2 text-white fw-bold">
          プロジェクトリスト
        </Link>
        <Link href="/lists/dailyReports" className="p-2 text-white fw-bold">
          勤怠一覧
        </Link>
        <Link href="/lists/expenseDetails" className="p-2 text-white fw-bold">
          経費一覧
        </Link>
        <Link href="/lists/monthlyReports" className="p-2 text-white fw-bold">
          出納一覧
        </Link>
        <Link href="/lists/purchaseDetails" className="p-2 text-white fw-bold">
          仕入一覧
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
