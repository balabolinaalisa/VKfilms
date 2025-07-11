import { use, useEffect } from "react";
import { useMovies } from "../hooks/useMovies";
import{useInfiniteScroll} from '../hooks/useInfiniteScroll';
import {CardGrid, Title, Group, View,Panel, PanelHeader,IconButton, Spinner,Div, Text} from '@vkontakte/vkui';
import{Icon24Filter,Icon24Like,Icon48LogoVk} from '@vkontakte/icons';
import MovieCard from "../components/MovieCard";


 const Home = () =>{
    
    const {movies, loadMore,hasMore } = useMovies();
    const observerRef= useInfiniteScroll(loadMore);
    return(
        <View activePanel="card">
         <Panel id="card">
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
            <IconButton label="Фильтры" >
                <Icon24Filter fill="var(--vkui--color_icon_accent)"style={{
                }}/>
            </IconButton>
            <IconButton label="Избранное">
                <Icon24Like fill="var(--vkui--color_icon_accent)" style={{
                }}/>
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
       </View>
    );
};

export default Home;