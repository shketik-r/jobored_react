import s from './SearchVacancies.module.css'
import {getApi} from "../../utils/network";
import {useEffect} from "react";
import {URL, URLVacancies} from "../../constans/apiConstants";


function SearchVacancies() {

    const getVacancies = async (url) => {
        const res = await getApi(url)
        console.log("search:",res);

    }

    useEffect(() => {
        getVacancies(URL + URLVacancies + id)
    }, [])
    

    return (
            <form action="">
                <input type="text"/>
                <input type="submit"/>
            </form>
    )
}
export default SearchVacancies;