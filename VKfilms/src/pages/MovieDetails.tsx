import { 
  Panel, 
  PanelHeader, 
  PanelHeaderBack, 
  Div, 
  Title, 
  Text, 
  Spinner,
  Group,
  SimpleCell,
  Avatar
} from '@vkontakte/vkui';
import { Icon16StarAlt, Icon20CalendarOutline } from '@vkontakte/icons';
import type { Movie } from '../types/types';
import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

const MovieDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [movie, setMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `https://api.kinopoisk.dev/v1.4/movie/${id}`,
          {
            headers: {
              'X-API-KEY': import.meta.env.VITE_KINOPOISK_API_KEY,
            }
          }
        );
        
        if (!response.ok) {
          throw new Error('Фильм не найден');
        }
        
        const data = await response.json();
        setMovie(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Ошибка загрузки');
      } finally {
        setLoading(false);
      }
    };

    fetchMovie();
  }, [id]);

  if (loading) {
    return (
      <Group>
        <Div style={{ display: 'flex', justifyContent: 'center' }}>
          <Spinner size="l" />
        </Div>
      </Group>
    );
  }

  if (error) {
    return (
      <Group>
        <Div style={{ color: 'var(--vkui--color_text_negative)' }}>
          {error}
        </Div>
      </Group>
    );
  }

  if (!movie) {
    return null;
  }

  return (
    <Panel>
      <PanelHeader 
        before={<PanelHeaderBack onClick={() => navigate(-1)} />}
      >
        {movie.name}
      </PanelHeader>

      <Group>
        {movie.poster?.url && (
          <Div style={{ padding: 0 }}>
            <img 
              src={movie.poster.url} 
              alt={movie.name}
              style={{
                width: '100%',
                maxHeight: '400px',
                objectFit: 'contain',
                borderRadius: 8
              }}
            />
          </Div>
        )}

        <Div>
          <Title level="1" style={{ marginBottom: 12 }}>{movie.name}</Title>
          
          <div style={{ display: 'flex', gap: 16, alignItems: 'center', marginBottom: 12 }}>
            {movie.rating?.kp && (
              <Text style={{ display: 'flex', alignItems: 'center' }}>
                <Icon16StarAlt fill="var(--vkui--color_icon_accent)" style={{ marginRight: 4 }} />
                {movie.rating.kp.toFixed(1)}
              </Text>
            )}
            
            {movie.year && (
              <Text style={{ display: 'flex', alignItems: 'center' }}>
                <Icon20CalendarOutline style={{ marginRight: 4 }} />
                {movie.year}
              </Text>
            )}
          </div>

          {movie.description && (
            <>
              <Title level="2" style={{ marginBottom: 8 }}>Описание</Title>
              <Text>{movie.description}</Text>
            </>
          )}
        </Div>

        {movie.genres && movie.genres?.length > 0 && (
          <Div>
            <Title level="2" style={{ marginBottom: 8 }}>Жанры</Title>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {movie.genres.map(genre => (
                <SimpleCell
                  key={genre.name}
                  before={<Avatar size={24} style={{ backgroundColor: 'var(--vkui--color_background_accent)' }} />}
                >
                  {genre.name}
                </SimpleCell>
              ))}
            </div>
          </Div>
        )}

        <Div>
          <Title level="2" style={{ marginBottom: 8 }}>Детали</Title>
          {movie.movieLength && (
            <Text>Длительность: {movie.movieLength} мин.</Text>
          )}
          {movie.countries && movie.countries?.length > 0 && (
            <Text>Страна: {movie.countries.map(c => c.name).join(', ')}</Text>
          )}
        </Div>
      </Group>
    </Panel>
  );
};

export default MovieDetails;