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
    </nav>
  );
};

export default Navbar;
