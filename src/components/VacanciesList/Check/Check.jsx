
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {addFavoriteAC, deleteFavoriteAC} from "../../../state/favoriteReduser";


function Check({obj,id}) {

    const [favorite, setFavorite] = useState(false)

    const storeFavorite = useSelector(state => state.favorite.favorite)

useEffect(()=>{
    for (let i = 0; i < storeFavorite.length; i++) {
        if(storeFavorite[i].id===id){
            setFavorite(true)
        }
    }
},[])



    const dispatch = useDispatch()

    const add = (obj) => {
        dispatch(addFavoriteAC(obj))
        setFavorite(true)
    }
    const remove = (id) => {
        dispatch(deleteFavoriteAC(id))
        setFavorite(false)
    }

    return (
        <>
            {favorite ? <button onClick={() => remove(id)}>delete</button> :
                <button onClick={() => add(obj)}>add</button>}
        </>
    )
}

export default Check;