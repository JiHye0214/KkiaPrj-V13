import { useState } from "react";
import { Link } from "react-router-dom";
import "../../styles/login.css";

export default function Login() {
    const [loginId, setLoginId] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [errorMessage, setErrorMessage] = useState<string>("");

    const handleLogin = async () => {
        try {
            const params = new URLSearchParams();
            params.append("loginId", loginId);
            params.append("password", password);

            const response = await fetch("/api/user/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                body: params.toString(),
                credentials: "include",
            });

            console.log("----------------------")
            console.log(response);

            if (!response.ok) {
                const err = await response.json();
                setErrorMessage(err.message);
                console.log(err.message);
                return;
            }

            // 로그인 성공
            // navigate("/home");
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error) {
            setErrorMessage("서버 오류가 발생했습니다.");
        }
    };

    return (
        <div className="auth-wrapper">
            <div id="login-wrapper" className="display-flex-set">
                {/* 에러 메시지 */}
                {errorMessage && (
                    <div className="error-msg display-flex-set">
                        <img src="/img/warning.png" width="35px" />
                        <div className="error-msg-text">{errorMessage}</div>
                    </div>
                )}

                {/* 로고 */}
                <Link to="/home">
                    <img src="/img/KKIA2-removebg.png" className="logo" />
                </Link>

                {/* 로그인 폼 */}
                <div id="login-content" className="display-flex-set">
                    <label htmlFor="login-id">
                        <img src="/img/loginTiger.png" id="login-id-img" />
                        <input
                            id="login-id"
                            className="login-items login-input"
                            type="text"
                            placeholder="아이디"
                            value={loginId}
                            onChange={(e) => setLoginId(e.target.value)}
                        />
                    </label>

                    <label htmlFor="login-pw">
                        <img src="/img/loginPassword.png" id="login-pw-img" />
                        <input
                            id="login-pw"
                            className="login-items login-input"
                            type="password"
                            placeholder="비밀번호"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </label>

                    <button className="login-items" id="login-submit-btn" onClick={handleLogin}>
                        로그인
                    </button>
                </div>

                {/* 메뉴 */}
                <div id="login-menu-wrap" className="display-flex">
                    <Link to="/user/find">아이디/비밀번호 찾기</Link>
                    <Link to="/user/register">회원가입</Link>
                </div>
            </div>

            {/* 오른쪽 이미지 */}
            <div>
                <img id="login-picture" src="/img/backgrounds/2024.jpg" />
            </div>
        </div>
    );
}
