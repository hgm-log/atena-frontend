import { Link, useNavigate } from "react-router";
import "./Header.css";

function Header() {
  const navigate = useNavigate();
  const handleLogout = async () => {
    const response = await fetch("http://localhost:8080/users/logout", {
      method: "POST",
      credentials: "include",
    });

    if (response.ok) {
      navigate("/login");
    }
  };

  return (
    <header className="header">
      <div className="header-logo">Atena?</div>

      <div className="header-actions">
        <Link className="header-customer-link" to="/customers">
          顧客一覧
        </Link>

        <button
          className="header-logout-button"
          type="button"
          onClick={handleLogout}
        >
          ログアウト
        </button>
      </div>
    </header>
  );
}

export default Header;
