import React,{useState} from 'react'

const main = () => {
    const [pseudo, setPseudo] = useState('')
    const [password, setPassword] = useState('')
    const [isLogged, setIsLogged] = useState(false)
  return (
      <form>
          <h1>Login</h1>
          <input type="text" placeholder="pseudo" value={pseudo} onChange={(e) => setPseudo(e.target.value)} />
          <input type="password" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <button type="submit" onClick={(e) => {
              e.preventDefault()
              if (pseudo === 'admin' && password === 'admin') {
                  setIsLogged(true)
              }
          }}>Login</button>
          {isLogged && <h1>Logged</h1>}
        
      </form>
  )
}

export default main