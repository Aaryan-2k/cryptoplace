import './NavBar.css'
export default function NavBar(){
    return(
        <div className='navbar'>
           <h1 classname='nav-head'>CryptoPlace</h1>
            <div className='nav-links'>
                <a>Home</a>
                <a>Features</a>
                <a>Pricing</a>
                <a>Blog</a>
            </div>
            <div>
                <select name='currency'>
                    <option value="USD">USD</option>
                    <option value="INR">INR</option>
                    <option value="EUR">EUR</option>
                </select>
                <button className="signup-button">Signup</button>
            </div>
        </div>
    )

}