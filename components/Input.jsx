export default function Input(props){
    return(
        <input type={props.tipo} id={props.id}  placeholder={props.texto}  className=" border-b-2 border-gray-500 w-[575px]  leading-10 outline-none"/>
    )
}