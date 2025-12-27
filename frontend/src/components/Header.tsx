import { Link } from 'react-router-dom'
import '../styles/common.css'
import '../styles/header.css'

interface HeaderProps {
  isAuthenticated: boolean
  alert: boolean
}

export default function Header({ isAuthenticated, alert }: HeaderProps) {
  return (
    <header>
      <div className="display-flex-set">
        <Link to="/home">
          <img src="/img/KKIA2-removebg.png" id="logo" />
        </Link>

        <Link to="/game/schedule" className="header-menu">
          GAME
        </Link>
        <Link to="/market/list" className="header-menu">
          MARKET
        </Link>
        <Link to="/community/main" className="header-menu">
          COMMUNITY
        </Link>
      </div>

      <div className="display-flex-set">
        <div id="market-message-wrap" className="display-flex">
          <img id="market-message" src="/img/message.png" />

          {isAuthenticated && alert && (
            <img
              id="market-alert"
              src="/img/message-mark.png"
            />
          )}
        </div>

        <Link to="/user/mypage">
          <img className="header-mypage" src="/img/tiger.png" />
        </Link>

        {!isAuthenticated && (
          <Link id="login-btn" to="/user/logIn">
            LOGIN
          </Link>
        )}

        {isAuthenticated && (
          <button
            id="logout-btn"
            onClick={() => {
              fetch('/api/logout', { method: 'POST' })
                .then(() => window.location.reload())
            }}
          >
            LOGOUT
          </button>
        )}
      </div>
    </header>
  )
}
