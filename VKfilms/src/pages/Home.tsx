import { useMemo,useState,useEffect } from "react";
import { useMovies } from "../hooks/useMovies";
import{useInfiniteScroll} from '../hooks/useInfiniteScroll';
import {CardGrid, Title, Group, View,Panel, PanelHeader,IconButton, Spinner,Div, Text} from '@vkontakte/vkui';
import{Icon24Filter,Icon24Like,Icon48LogoVk} from '@vkontakte/icons';
import MovieCard from "../components/MovieCard";
import Filters from "../components/Filters";


 const Home = () =>{
    
 

    const [activePanel,setActivePanel] = useState('main');
    const [filters,setFilters]=useState <{genres?:string[];rating?:[number,number];years?:[number,number]}>({
        genres:[],
        rating:[5,10],
        years:[1990, new Date().getFullYear()]
    });
     const { movies, loadMore, hasMore, isLoading } = useMovies(filters);  
     const observerRef= useInfiniteScroll(loadMore);
     useEffect(() => {
    if (!isLoading) {
      loadMore();
    }
  }, [filters, loadMore, isLoading]);
     const allGenres=useMemo(()=>{
        const genres=new Set<string>();
        movies.forEach(movie=>{
            if (Array.isArray(movie.genres)) {
        movie.genres.forEach(g => {
          if (g?.name) genres.add(g.name)});
      }
    });
        return Array.from(genres);
    },[movies]);

    return(
        <View activePanel={activePanel}>
         <Panel id="main">
            <Group>   
                <div style={{
                    display:'flex',
                    justifyContent:'center',
                    alignItems:'center',
                }}>
                <Icon48LogoVk fill="var(--vkui--color_icon_accent)"/> 
                <Title style={{
                padding:12,
                textAlign:'center',
            }}>Фильмы</Title>
            <IconButton aria-label="Фильтры" onClick={()=>setActivePanel('filters')} >
                <Icon24Filter fill="var(--vkui--color_icon_accent)"/>
            </IconButton>
            <IconButton label="Избранное">
                <Icon24Like fill="var(--vkui--color_icon_accent)"/>
            </IconButton>
            </div> 
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
                <div
                    ref={observerRef}
                    style={{
                        height:'50px',
                        display: hasMore? 'block':'none'
                    }}>
                        <Spinner size="s"/>
                    </div>
                    {!hasMore && (
                        <Div style={{textAlign:'center'}}>
                            <Text>Фильмы закончились</Text>
                        </Div>
                    )}
            </Group> 

        </Panel> 
            <Filters
            id="filters"
            genres={allGenres}
            onApplyFilters={setFilters}
            onClose={()=>setActivePanel('main')} />
       </View>
    );
};

export default Home;