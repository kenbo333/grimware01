import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="navbar navbar-light bg-light">
      <div className="d-flex flex-row bd-highlight">
        <div className="p-2 bd-highlight">
          <Link href="/ownCompany">自社</Link>
        </div>
        <div className="p-2 bd-highlight">
          <Link href="/primes">元請会社</Link>
        </div>
        <div className="p-2 bd-highlight">
          <Link href="/subs">下請会社</Link>
        </div>
        <div className="p-2 bd-highlight">
          <Link href="/purchases">仕入会社</Link>
        </div>
        <div className="p-2 bd-highlight">
          <Link href="/cars">車両</Link>
        </div>
        <div className="p-2 bd-highlight">
          <Link href="/projects">プロジェクト</Link>
        </div>
        <div className="p-2 bd-highlight">
          <Link href="/daily">日報</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
