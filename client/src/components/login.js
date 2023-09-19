export default function Login() {

  return (
    <div>
      <header>
        <nav>
          <ul>
            <li><a href="index.html">Home</a></li>
            <li><a href="user.html">User</a></li>
            <li><a href="reviews.html">Reviews</a></li>
          </ul>
        </nav>
      </header>
      <div className="entry">
        <div className="text">
          <h1>AAG Music</h1>
          <h3>Where artists help each other get heard.</h3>
        </div>
        <input placeholder="Username" type="text" id="myInput" name="myInput" />
        <input placeholder="Password" type="password" id="myInput" name="myInput" />
        <button>Login</button>
        <button>Register</button>
      </div>
      <footer>
        <nav>
          <ul>
            <li><a href="about.html">About</a></li>
            <li><a href="contact.html">Contact</a></li>
            <li><a href="privacy.html">Privacy Policy (If we had one)</a></li>
          </ul>
        </nav>
      </footer>
    </div>
  )
}