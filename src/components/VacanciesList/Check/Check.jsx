import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {addFavoriteAC, deleteFavoriteAC} from "../../../state/favoriteReduser";
import iconStarOn from "../../../svg/starOn.svg"
import iconStarOff from "../../../svg//starOff.svg"
function Check({obj,id}) {

    const [favorite, setFavorite] = useState(false)
    const storeFavorite = useSelector(state => state.favorite.favorite)

useEffect(()=>{
    for (let i = 0; i < storeFavorite.length; i++) {
        if(storeFavorite[i].id===id){
         return setFavorite(true)
        }
    }
},[])

    const dispatch = useDispatch()

    const dispatchFavorite = () => {
      if(favorite){
          dispatch(deleteFavoriteAC(id))
          setFavorite(false)
      }else{
          dispatch(addFavoriteAC(obj))
          setFavorite(true)
      }
    }
    return (
        <div data-elem={`vacancy-${id}-shortlist-button`} onClick={dispatchFavorite}>
            <img src={favorite?iconStarOn:iconStarOff} alt="starFavorite" />
        </div>
    )
}

export default Check;