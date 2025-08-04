import './Search.css'
export default function Search(){
    return(
        <div className='main-container'>
            <div className='main-head'><h1>Largest Crypto Marketplace</h1>
            <p>Welcome to the world's largest cryptocurrency marketplace. Sign up to explore more about cryptos.</p>
            </div>
            <div className="search-container">
            <input type='search' placeholder="Search crypto..."></input>
            <button>Search</button></div>
        </div>
    )
}