//Importamos los componentes.
import Footer from "./components/Footer/Footer"
import Header from "./components/Header/Header"
import PostSearch from "./components/PostSearch/PostSearch"

const App = () => {
  return (
    <div className="app">
      <Header />
      <PostSearch />
      <Footer />
    </div>
  )
}

export default App
