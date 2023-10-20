export default function InputUser(props) {

    if (props.write) {

        return (
            <input type="text" name="" id="" className={"w-full p-4 bg-[#FCFCFC] inputText rounded-lg placeholder:text-[#1B4079]" +
                (props.write ? " border-solid border-2 border-[#1B4079]" : " inputDisable bg-[#E8E8E8]")} placeholder={props.placeholder} />
        )
    }


    return (
        <div className={"w-full inputText p-4 bg-[#E8E8E8] inputText rounded-lg text-[#1B4079] flex items-center" +
            (props.write ? " border-solid border-2 border-[#1B4079]" : " inputDisable bg-[#E8E8E8]")}>
            <p>{props.materia}</p>
        </div>
    )

}