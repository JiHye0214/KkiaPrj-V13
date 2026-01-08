import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/login.css"; 

type Gender = "남자" | "여자" | "";

export default function Register() {
  const navigate = useNavigate();

  const [loginId, setLoginId] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [nickname, setNickname] = useState("");
  const [birth, setBirth] = useState("");
  const [gender, setGender] = useState<Gender>("");
  const [error, setError] = useState("");

  const handleSignUp = async () => {
    if (password !== passwordCheck) {
      setError("비밀번호가 일치하지 않습니다.");
      return;
    }

    try {
      const response = await fetch("/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          loginId,
          password,
          name,
          email,
          nickname,
          birth,
          gender,
        }),
      });

      if (!response.ok) {
        const message = await response.text();
        setError(message || "회원가입에 실패했습니다.");
        return;
      }

      // 회원가입 성공 → 로그인 페이지
      navigate("/login");
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (e) {
      setError("서버 오류가 발생했습니다.");
    }
  };

  return (
    <div className="auth-wrapper">
      <div id="signup-wrapper" className="display-flex-set">
        {/* 에러 메시지 */}
        {error && (
          <div className="error-msg display-flex-set">
            <img src="/img/warning.png" width="35px" />
            <div className="error-msg-text">{error}</div>
          </div>
        )}

        {/* 로고 */}
        <Link to="/home">
          <img src="/img/KKIA2-removebg.png" className="logo" />
        </Link>

        {/* 회원가입 폼 */}
        <div id="signup-content" className="display-flex-set">
          <input
            className="login-items signup-input"
            type="text"
            placeholder="아이디"
            value={loginId}
            onChange={(e) => setLoginId(e.target.value)}
          />

          <input
            className="login-items signup-input"
            type="password"
            placeholder="비밀번호"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <input
            className="login-items signup-input"
            type="password"
            placeholder="비밀번호 확인"
            value={passwordCheck}
            onChange={(e) => setPasswordCheck(e.target.value)}
          />

          <input
            className="login-items signup-input"
            type="text"
            placeholder="이름"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            className="login-items signup-input"
            type="text"
            placeholder="이메일"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            className="login-items signup-input"
            type="text"
            placeholder="닉네임"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
          />

          {/* 추가 정보 */}
          <div id="add-wrap" className="display-flex-set login-items signup-input">
            <label>
              생년월일
              <input
                className="choice-wrap"
                type="date"
                value={birth}
                onChange={(e) => setBirth(e.target.value)}
              />
            </label>

            <div className="display-flex">
              <div id="gender">성별</div>
              <div className="choice-wrap">
                <label htmlFor="radio-female">
                  <input
                    type="radio"
                    id="radio-female"
                    name="gender"
                    value="여자"
                    checked={gender === "여자"}
                    onChange={() => setGender("여자")}
                  />
                  여
                </label>

                <label htmlFor="radio-male">
                  <input
                    type="radio"
                    id="radio-male"
                    name="gender"
                    value="남자"
                    checked={gender === "남자"}
                    onChange={() => setGender("남자")}
                  />
                  남
                </label>
              </div>
            </div>
          </div>

          <button className="login-items" id="signup-btn" onClick={handleSignUp}>
            회원가입
          </button>
        </div>
      </div>

      {/* 우측 이미지 */}
      <div>
        <img id="login-picture" src="/img/backgrounds/챔필.jpg" />
      </div>
    </div>
  );
};

