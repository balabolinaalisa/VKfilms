import type {Movie} from "../types/types";
import {Card,CardGrid, Title, Text, Div, Image, Spacing} from '@vkontakte/vkui';
import {Icon48FilmStripPlay, Icon16StarAlt,Icon24PictureOutline} from '@vkontakte/icons'
import { useRouteNavigator } from '@vkontakte/vk-mini-apps-router';

interface Props{
    movie: Movie;
}

const MovieCard = ({movie}:Props) =>{
    const routeNavigator = useRouteNavigator();
    return(
            <Card mode="outline" 
            onClick={() => routeNavigator.push(`/movie/${movie.id}`)}
            style={{
                marginTop: 8,
                height:'100%',
                width:'100%',
                display:'flex',
                flexDirection:'column',
                cursor: 'pointer'
            }}>
                <Div style={{padding:0}}>
                    <div style={{
                        position:'relative',
                        paddingBottom:'150%',
                        backgroundColor:'var(--vkui--color_background_secondary)',
                        borderRadius:8,
                        overflow:'hidden'
                    }}>
                        {movie.poster?.url?(  
                        <img
                        src={movie.poster?.url}
                        alt={movie.name}
                        title={movie.name}
                        style={{
                            position:'absolute',
                            top:0,
                            left:0,
                            height:'100%',
                            width:'100%',   
                            objectFit:'cover'
                        }}
                        />
                    ):(
                        <div style={{
                            position:'absolute',
                            top:0,
                            left:0,
                            width:'100%',
                            height:'100%',
                            display:'flex',
                            justifyContent:'center',
                            alignItems:'center',
                            color:'var(--vkui--color_text_secondary)'
                        }}>
                            <Icon24PictureOutline width={48} height={48}/>
                            </div>
                    )}
                  </div>
                  <div style={{padding:12}}>
                    <Title level="3" 
                            style={{
                            marginTop: 8,
                            whiteSpace:'nowrap',
                            overflow:'hidden',
                            textOverflow:'ellipsis'    
                            }}
                            >
                            {movie.name}
                            </Title>   
                            <Spacing size={8}/>
                    <div style={{
                        display:'flex',
                        alignItems:'center',
                        color:'var(--vkui--color_text_secondary)'
                    }}>
                    <Text>{movie.year}</Text> 
                    {movie.rating?.kp &&(
                        <>
                        <div style={{width:4}}/>
                        <Icon16StarAlt fill="var(--vkui--color_icon_accent)"/>
                        <div style={{width:4}}/>
                        <Text weight="2">
                            {movie.rating?.kp.toFixed(1)}
                        </Text>
                        </>
                    )}
                    </div>
                     </div>
                </Div>
            </Card>

    )
}  
export default MovieCard;