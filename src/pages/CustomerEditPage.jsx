import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import "./CustomerEditPage.css";
import Header from "../components/Header";

function CustomerEditPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [customerName, setCustomerName] = useState("");
  const [addressName1, setAddressName1] = useState("");
  const [nickname, setNickname] = useState("");
  const [addressName2, setAddressName2] = useState("");
  const [storeName, setStoreName] = useState("");
  const [nomination, setNomination] = useState("");
  const [remarks, setRemarks] = useState("");
  const [notFound, setNotFound] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

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

        setCustomerName(data.customerName);
        setAddressName1(data.addressName1);
        setNickname(data.nickname || "");
        setAddressName2(data.addressName2 || "");
        setStoreName(data.storeName || "");
        setNomination(data.nomination || "");
        setRemarks(data.remarks || "");
      }
    };

    fetchCustomer();
  }, [id, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (customerName.trim() === "" || addressName1.trim() === "") {
      setErrorMessage("お客様名と宛名1を入力してください");
      return;
    }

    setErrorMessage("");

    const response = await fetch(`http://localhost:8080/customers/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        customerName,
        addressName1,
        nickname,
        addressName2,
        storeName,
        nomination,
        remarks,
      }),
    });

    if (response.status === 401) {
      navigate("/login");
      return;
    }

    if (response.status === 400) {
      alert("入力内容を確認してください");
      return;
    }

    if (response.status === 404) {
      setNotFound(true);
      return;
    }

    if (response.ok) {
      navigate(`/customers/${id}`);
    }
  };

  const handleDelete = async () => {
    const confirmed = window.confirm("本当に削除しますか？");

    if (!confirmed) {
      return;
    }

    const response = await fetch(`http://localhost:8080/customers/${id}`, {
      method: "DELETE",
      credentials: "include",
    });

    if (response.status === 401) {
      navigate("/login");
      return;
    }

    if (response.ok) {
      navigate("/customers");
    }
  };

  if (notFound) {
    return (
      <main>
        <h1>顧客が見つかりません</h1>
        <Link to="/customers">一覧へ戻る</Link>
      </main>
    );
  }

  return (
    <>
      <Header />

      <main className="customer-edit-page">
        <div className="customer-edit-container">
          <h1 className="customer-edit-title">顧客編集</h1>

          <form className="customer-edit-form" onSubmit={handleSubmit}>
            {errorMessage && (
              <p className="customer-edit-error">{errorMessage}</p>
            )}

            <div className="customer-edit-group">
              <label htmlFor="customerName">
                <span className="customer-edit-label-text">お客様名</span>
                <span className="required-badge">必須</span>
              </label>
              <input
                id="customerName"
                type="text"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
              />
            </div>

            <div className="customer-edit-group">
              <label htmlFor="addressName1">
                <span className="customer-edit-label-text">宛名1</span>
                <span className="required-badge">必須</span>
              </label>
              <input
                id="addressName1"
                type="text"
                value={addressName1}
                onChange={(e) => setAddressName1(e.target.value)}
              />
            </div>

            <div className="customer-edit-group">
              <label htmlFor="nickname">
                <span className="customer-edit-label-text">ニックネーム</span>
                <span className="optional-badge">任意</span>
              </label>
              <input
                id="nickname"
                type="text"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
              />
            </div>

            <div className="customer-edit-group">
              <label htmlFor="addressName2">
                <span className="customer-edit-label-text">宛名2</span>
                <span className="optional-badge">任意</span>
              </label>
              <input
                id="addressName2"
                type="text"
                value={addressName2}
                onChange={(e) => setAddressName2(e.target.value)}
              />
            </div>

            <div className="customer-edit-group">
              <label htmlFor="storeName">
                <span className="customer-edit-label-text">店舗名</span>
                <span className="optional-badge">任意</span>
              </label>
              <input
                id="storeName"
                type="text"
                value={storeName}
                onChange={(e) => setStoreName(e.target.value)}
              />
            </div>

            <div className="customer-edit-group">
              <label htmlFor="nomination">
                <span className="customer-edit-label-text">指名</span>
                <span className="optional-badge">任意</span>
              </label>
              <input
                id="nomination"
                type="text"
                value={nomination}
                onChange={(e) => setNomination(e.target.value)}
              />
            </div>

            <div className="customer-edit-group">
              <label htmlFor="remarks">
                <span className="customer-edit-label-text">備考</span>
                <span className="optional-badge">任意</span>
              </label>
              <textarea
                id="remarks"
                value={remarks}
                onChange={(e) => setRemarks(e.target.value)}
              />
            </div>

            <div className="customer-edit-actions">
              <button className="customer-edit-button" type="submit">
                更新する
              </button>

              <Link className="customer-edit-back-link" to={`/customers/${id}`}>
                戻る
              </Link>
            </div>

            <button
              className="customer-edit-delete-button"
              type="button"
              onClick={handleDelete}
            >
              削除する
            </button>
          </form>
        </div>
      </main>
    </>
  );
}

export default CustomerEditPage;
