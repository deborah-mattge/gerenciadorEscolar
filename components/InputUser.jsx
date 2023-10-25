export default function InputUser(props) {
    
    const pegarValorInput = (event) => {
        const novaNota = event.target.value;
        if (props.parentToChild) {
            props.parentToChild(novaNota);
        }
    };

    if (props.write) {

        return (
            <input type="text" name="" id={props.id} className={"w-full p-4 bg-[#FCFCFC] inputText rounded-lg placeholder:text-[#1B4079]" +
                (props.write ? " border-solid border-2 border-[#1B4079] outline-none" : " inputDisable bg-[#E8E8E8]")} placeholder={props.placeholder} 
                onChange={pegarValorInput}/>
        )
    }


    return (
        <div className={"w-full inputText p-4 bg-[#E8E8E8] inputText rounded-lg text-[#1B4079] flex items-center" +
            (props.write ? " border-solid border-2 border-[#1B4079]" : " inputDisable bg-[#E8E8E8]")}>
            <p>{props.nome}</p>
        </div>
    )

}