export default function Button(props){
    return(
        <button className={"bg-[#1B4079] rounded-xl text-white font-extrabold " + (props.tamanho)}>{props.texto}</button>
    )
}