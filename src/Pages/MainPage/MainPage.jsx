import s from './MainPage.module.css'

function MainPage(props) {

let objects = props.data.objects
    console.log(objects);
    return (
        <div className={s.page}>
            {objects !== undefined ? objects.map((e) => {
                return (
                    <div key={e.id}  className={s.card}>
                        <div>{e.profession}</div>
                        <div>{e.firm_name}</div>
                        <div>{e.town.title}</div>
                        <div>{e.type_of_work.title}</div>
                        <div>зп от {e.payment_from} rub</div>
                    </div>
                )
            }) : 'тут должен быть loading!!!'}
        </div>
    )
}

export default MainPage;