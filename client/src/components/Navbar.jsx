import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="navbar navbar-light bg-light">
      <div className="d-flex flex-row bd-highlight">
        <div className="p-2 bd-highlight">
          <Link href="/prime">元請会社</Link>
        </div>

        <div className="p-2 bd-highlight">
          <Link href="/sub">下請会社</Link>
        </div>
        <div className="p-2 bd-highlight">
          {/* <Link href="/company">About</Link> */}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
