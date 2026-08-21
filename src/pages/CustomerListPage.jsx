import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import "./CustomerListPage.css";
import Header from "../components/Header";

function CustomerListPage() {
  const [customers, setCustomers] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [hasSearched, setHasSearched] = useState(false);
  const [searchError, setSearchError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchCustomers = async () => {
      const response = await fetch("http://localhost:8080/customers", {
        credentials: "include",
      });

      if (response.status === 401) {
        navigate("/login");
        return;
      }

      if (response.ok) {
        const data = await response.json();
        setCustomers(data);
      }
    };

    fetchCustomers();
  }, [navigate]);

  const handleSearch = async (e) => {
    e.preventDefault();

    if (keyword.trim() === "") {
      setSearchError("検索キーワードを入力してください");
      return;
    }

    setSearchError("");

    const response = await fetch(
      `http://localhost:8080/customers/search?keyword=${encodeURIComponent(keyword)}`,
      {
        credentials: "include",
      },
    );

    if (response.status === 401) {
      navigate("/login");
      return;
    }

    if (response.ok) {
      const data = await response.json();
      setCustomers(data);
      setHasSearched(true);
    }
  };

  return (
    <>
      <Header />

      <main className="customer-list-page">
        <div className="customer-list-container">
          <h1 className="customer-list-title">顧客一覧</h1>

          <div className="customer-list-tools">
            <form className="customer-search-form" onSubmit={handleSearch}>
              <input
                className="customer-search-input"
                type="text"
                placeholder="顧客名・宛名・ニックネーム・指名"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
              />
              <button className="customer-search-button" type="submit">
                検索
              </button>
            </form>

            <div className="customer-list-actions">
              <Link className="customer-create-link" to="/customers/new">
                新規登録
              </Link>
            </div>
          </div>

          {searchError && (
            <p className="customer-search-error">{searchError}</p>
          )}

          {hasSearched && customers.length === 0 && (
            <p className="customer-empty-message">
              該当する顧客が見つかりません
            </p>
          )}

          {customers.length > 0 && (
            <table className="customer-table">
              <thead>
                <tr>
                  <th>顧客名</th>
                  <th>宛名1</th>
                  <th>店舗名</th>
                  <th>詳細</th>
                </tr>
              </thead>

              <tbody>
                {customers.map((customer) => (
                  <tr key={customer.id}>
                    <td>{customer.customerName}</td>
                    <td>{customer.addressName1}</td>
                    <td>{customer.storeName || "-"}</td>
                    <td>
                      <Link
                        className="customer-detail-link"
                        to={`/customers/${customer.id}`}
                      >
                        詳細
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </main>
    </>
  );
}

export default CustomerListPage;
