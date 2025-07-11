import { use, useEffect } from "react";
import { useMovies } from "../hooks/useMovies";
import {CardGrid, Title, Group, View,Panel, PanelHeader} from '@vkontakte/vkui'
import MovieCard from "../components/MovieCard";


const Home = () =>{
    
    const {movies, fetchMovies, loading, error} = useMovies();
    useEffect(()=>{
        fetchMovies(1)
    },[]);
        if(error){
            return (<div>{error}</div>)
        }
        if(loading && !movies.length)
        {
            return (<div>Загрузка...</div>)
        }
      /*console.log('Movies data:', movies.map(m => ({ 
    name: m.name, 
    rating: m.rating 
  })));*/
    return(
        <View activePanel="card">
         <Panel id="card">

            <Group>     
                     <Title style={{
            padding:12,
            textAlign:'center'
          }}>Популярные фильмы</Title>
                <CardGrid 
                     size="l"
                     style={{
                        display:'grid',
                        gridTemplateColumns:'repeat(auto-fill, minmax(200px, 1fr))',
                        alignItems:'start',
                        gap:12,
                        padding:12
                     }}
                >
                    {movies.map(movie=>(
                        <MovieCard key={movie.id} movie={movie}/>
                    )
                    )}
                </CardGrid>
                {loading && <div>Загружаем еще...</div>}
            </Group>
        </Panel> 
       </View>
    )
}

export default Home;