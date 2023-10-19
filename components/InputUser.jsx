export default function InputUser(props) {
    return (
        <input type="text" name="" id="" className={"w-full p-4 bg-[#FCFCFC] inputText rounded-lg placeholder:text-[#1B4079]" +
         (props.write ? " border-solid border-2 border-[#1B4079]" : " inputDisable bg-[#E8E8E8]")} placeholder={props.placeholder} />
    )
}