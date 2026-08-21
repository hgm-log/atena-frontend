import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import "./CustomerDetailPage.css";
import Header from "../components/Header";

function CustomerDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [customer, setCustomer] = useState(null);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const fetchCustomer = async () => {
      const response = await fetch(`http://localhost:8080/customers/${id}`, {
        credentials: "include",
      });

      if (response.status === 401) {
        navigate("/login");
        return;
      }

      if (response.status === 404) {
        setNotFound(true);
        return;
      }

      if (response.ok) {
        const data = await response.json();
        setCustomer(data);
      }
    };

    fetchCustomer();
  }, [id, navigate]);

  if (notFound) {
    return (
      <main>
        <h1>顧客が見つかりません</h1>
        <Link to="/customers">一覧へ戻る</Link>
      </main>
    );
  }

  if (!customer) {
    return <p>読み込み中...</p>;
  }

  return (
    <>
      <Header />

      <main className="customer-detail-page">
        <div className="customer-detail-container">
          <h1 className="customer-detail-title">顧客詳細</h1>

          <div className="customer-detail-info">
            <p className="customer-detail-name">{customer.customerName}</p>

            <p className="customer-detail-nickname">
              ニックネーム：{customer.nickname || "-"}
            </p>

            <p className="customer-detail-row customer-detail-address-row">
              <span className="customer-detail-label">宛名1</span>
              <span>{customer.addressName1}</span>
            </p>

            <p className="customer-detail-row customer-detail-address-row">
              <span className="customer-detail-label">宛名2</span>
              <span>{customer.addressName2 || "-"}</span>
            </p>

            <p className="customer-detail-row">
              <span className="customer-detail-label">店舗名</span>
              <span>{customer.storeName || "-"}</span>
            </p>

            <p className="customer-detail-row">
              <span className="customer-detail-label">指名</span>
              <span>{customer.nomination || "-"}</span>
            </p>

            <p className="customer-detail-remarks">
              <span className="customer-detail-label">備考</span>
              <span className="customer-detail-remarks-text">
                {customer.remarks || "-"}
              </span>
            </p>
          </div>

          <div className="customer-detail-actions">
            <Link
              className="customer-detail-edit-link"
              to={`/customers/${id}/edit`}
            >
              編集する
            </Link>

            <Link className="customer-detail-back-link" to="/customers">
              一覧へ戻る
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}

export default CustomerDetailPage;
