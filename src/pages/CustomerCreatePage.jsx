import { useState } from "react";
import { Link, useNavigate } from "react-router";
import "./CustomerCreatePage.css";
import Header from "../components/Header";

function CustomerCreatePage() {
  const [customerName, setCustomerName] = useState("");
  const [addressName1, setAddressName1] = useState("");
  const [nickname, setNickname] = useState("");
  const [addressName2, setAddressName2] = useState("");
  const [storeName, setStoreName] = useState("");
  const [nomination, setNomination] = useState("");
  const [remarks, setRemarks] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (customerName.trim() === "" || addressName1.trim() === "") {
      setErrorMessage("お客様名と宛名1を入力してください");
      return;
    }

    setErrorMessage("");

    const response = await fetch("http://localhost:8080/customers", {
      method: "POST",
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

    if (response.ok) {
      navigate("/customers");
    }
  };

  return (
    <>
      <Header />

      <main className="customer-create-page">
        <div className="customer-create-container">
          <h1 className="customer-create-title">顧客登録</h1>

          <form className="customer-create-form" onSubmit={handleSubmit}>
            {errorMessage && (
              <p className="customer-create-error">{errorMessage}</p>
            )}
            <div className="customer-create-group">
              <label htmlFor="customerName">
                <span className="customer-create-label-text">お客様名</span>
                <span className="required-badge">必須</span>
              </label>
              <input
                id="customerName"
                type="text"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
              />
            </div>

            <div className="customer-create-group">
              <label htmlFor="addressName1">
                <span className="customer-create-label-text">宛名1</span>
                <span className="required-badge">必須</span>
              </label>
              <input
                id="addressName1"
                type="text"
                value={addressName1}
                onChange={(e) => setAddressName1(e.target.value)}
              />
            </div>

            <div className="customer-create-group">
              <label htmlFor="nickname">
                <span className="customer-create-label-text">ニックネーム</span>
                <span className="optional-badge">任意</span>
              </label>
              <input
                id="nickname"
                type="text"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
              />
            </div>

            <div className="customer-create-group">
              <label htmlFor="addressName2">
                <span className="customer-create-label-text">宛名2</span>
                <span className="optional-badge">任意</span>
              </label>
              <input
                id="addressName2"
                type="text"
                value={addressName2}
                onChange={(e) => setAddressName2(e.target.value)}
              />
            </div>

            <div className="customer-create-group">
              <label htmlFor="storeName">
                <span className="customer-create-label-text">店舗名</span>
                <span className="optional-badge">任意</span>
              </label>
              <input
                id="storeName"
                type="text"
                value={storeName}
                onChange={(e) => setStoreName(e.target.value)}
              />
            </div>

            <div className="customer-create-group">
              <label htmlFor="nomination">
                <span className="customer-create-label-text">指名</span>
                <span className="optional-badge">任意</span>
              </label>
              <input
                id="nomination"
                type="text"
                value={nomination}
                onChange={(e) => setNomination(e.target.value)}
              />
            </div>

            <div className="customer-create-group">
              <label htmlFor="remarks">
                <span className="customer-create-label-text">備考</span>
                <span className="optional-badge">任意</span>
              </label>
              <textarea
                id="remarks"
                value={remarks}
                onChange={(e) => setRemarks(e.target.value)}
              />
            </div>

            <div className="customer-create-actions">
              <button className="customer-create-button" type="submit">
                登録
              </button>

              <Link className="customer-create-back-link" to="/customers">
                一覧へ戻る
              </Link>
            </div>
          </form>
        </div>
      </main>
    </>
  );
}

export default CustomerCreatePage;
