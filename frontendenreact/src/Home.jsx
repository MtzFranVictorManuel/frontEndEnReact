import { useEffect, useState } from "react";
import PeliculaCard from "./PeliculaCard";
import SearchIcon from "./search.svg";
import { API_URL } from "./App";



const Home = () => {
    const [peliculas, setPeliculas] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    const buscarPeliculas = async (titulo) => {
        const response = await fetch(`${API_URL}?s=${titulo}`);
        const data = await response.json();
        setPeliculas(data);
    }

    useEffect(() => {
        buscarPeliculas('');
    }, []);

    return (
        <>
        <div className="search">
            <input placeholder="Buscar películas por título" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
            <img src={SearchIcon} alt="Buscar" onClick={() => buscarPeliculas(searchTerm)} />
        </div>

        {peliculas?.length > 0
            ? (
                <div className="container">
                    {peliculas.map(pelicula => (
                        <PeliculaCard pelicula={pelicula} key={pelicula.peliculaId} />
                    ))}
                </div>
            ) : (
                <div className="empty">
                    <h1>No se encontraron películas</h1>
                </div>
            )
        }
        </>
    );
}

export default Home;