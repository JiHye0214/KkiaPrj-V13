type Props = {
    errorMessage: string;
};

function LoginError({ errorMessage }: Props) {
    if (!errorMessage) return null;

    // 일단 login-valid: 아래로 움직이는 클래스를 자식컴포에선 줌
    return (
        <div className="error-msg display-flex-set login-valid">
            <img src="/img/warning.png" width="35px" />
            <div className="error-msg-text">{errorMessage}</div>
        </div>
    );
}

export default LoginError;
