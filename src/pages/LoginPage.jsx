import { useState } from "react";
import { useNavigate } from "react-router";
import "./LoginPage.css";

function LoginPage() {
  const [loginId, setLoginId] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (loginId.trim() === "" || password.trim() === "") {
      setErrorMessage("ユーザーIDとパスワードを入力してください");
      return;
    }

    const response = await fetch("http://localhost:8080/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        loginId,
        password,
      }),
    });

    if (response.ok) {
      navigate("/customers");
    } else {
      setErrorMessage("ログインIDまたはパスワードが正しくありません");
    }
  };

  return (
    <main className="login-page">
      <div className="login-container">
        <h1>Atena?</h1>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="loginId">ユーザーID</label>
            <input
              id="loginId"
              type="text"
              value={loginId}
              onChange={(e) => setLoginId(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">パスワード</label>
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <label>
              <input
                type="checkbox"
                checked={showPassword}
                onChange={(e) => setShowPassword(e.target.checked)}
              />
              パスワードを表示
            </label>
          </div>

          {errorMessage && <p>{errorMessage}</p>}

          <button type="submit">ログイン</button>
        </form>
      </div>
    </main>
  );
}

export default LoginPage;
