import {Link, withRouter} from 'react-router-dom'

import Cookies from 'js-cookie'

import {AiFillHome} from 'react-icons/ai'

import './index.css'

const Header = props => {
  const onClickLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }
  return (
    <nav className="nav-bar">
      <Link to="/" className="links">
        <img
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          alt="website logo"
          className="logo"
        />
      </Link>
      <ul className="links-card">
        <Link to="/" className="links">
          <li>Home</li>
        </Link>
        <Link to="/jobs" className="links">
          <li>Jobs</li>
        </Link>
        <li>
          <button type="button" className="logout-btn" onClick={onClickLogout}>
            Logout
          </button>
        </li>
      </ul>
      <div className="sm-card">
        <AiFillHome fill="#ffffff" size="30px" />
      </div>
    </nav>
  )
}
export default withRouter(Header)
