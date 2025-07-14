import {Panel, PanelHeader,PanelHeaderBack,FormItem,Select,Slider,Button, Group,CustomSelect, CustomSelectOption,Chip} from "@vkontakte/vkui";
import{ Icon20FilterOutline } from "@vkontakte/icons";
import {useState} from 'react';
import type {Movie} from "../types/types";

interface Props{
    id:string;
    genres:string[];
    onApplyFilters:(filters:{genres:string[]; rating:[number,number]; years:[number,number]})=>void;
    onClose:()=>void;
}

const Filters=({
    id,
    genres,
    onApplyFilters,
    onClose
}:Props)=>{
    const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
    const[rangeRating,setRangeRating]=useState<[number,number]>([5,10]);
    const[rangeYears,setrangeYears]=useState<[number,number]>([1990, new Date().getFullYear()]);
    const handleApply = () => {
    const newFilters = {
      genres: selectedGenres,
      rating: rangeRating,
      years: rangeYears,
    };
    console.log('Applying filters:', newFilters);
    onApplyFilters(newFilters);
    onClose();
  };
    return(
        <Panel>
            <PanelHeader
            before={<PanelHeaderBack onClick={onClose}/>}>
                Фильтры
            </PanelHeader>
            <Group>
                <FormItem top="Жанры">
                    <CustomSelect
                    placeholder="Выберите жанры"
                    options={genres.map(genre=>({label:genre,value:genre}))}
                    onChange={(e)=>
                        setSelectedGenres(prev=>
                            e.target.value
                            ?[...prev, e.target.value as string]
                            :prev
                        )}
                    value={null}
                    renderOption={({option,...restProps})=>(
                        <CustomSelectOption {...restProps}/>
                    )}/>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 8 }}>
    {selectedGenres.map(genre => (
                            <Chip
                                key={genre}
                                removable
                                onRemove={() => setSelectedGenres(prev => prev.filter(g => g !== genre))}
                            >
                                {genre}
                            </Chip>
                            ))}
                        </div>
                </FormItem>
                <FormItem top={`Рейтинг:${rangeRating[0]}-${rangeRating[1]}`}>
                    <Slider
                    min={0}
                    max={10}
                    step={0.1}
                    value={rangeRating}
                    onChange={setRangeRating}
                    multiple/>
                </FormItem>
                <FormItem top={`Год выпуска:${rangeYears[0]}-${rangeYears[1]}`}>
                    <Slider
                    min={1990}
                    max={new Date().getFullYear()}
                    step={1}
                    value={rangeYears}
                    onChange={setrangeYears}
                    multiple/>
                </FormItem>
                <Button
                size="l"
                mode="primary"
                onClick={(handleApply)=>{
                    onApplyFilters({
                        genres:selectedGenres,
                        rating:rangeRating,
                        years:rangeYears
                    });
                    onClose();
                }}>
                    Применить
                </Button>
            </Group>
        </Panel>    
    );
};

export default Filters;
