import s from './Info.module.css'


function Info(props) {

    function createMarkup() {
        return {__html: props.info[0].vacancyRichText};
    }
    return (
        <div className={s.card} dangerouslySetInnerHTML={createMarkup()}/>
    )

}

export default Info;