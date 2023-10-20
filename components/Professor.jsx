import ButtonLuka from "./ButtonLuka";
import InputUser from "./InputUser";

export default function Professor(props) {
    return (
        <div className="flex gap-[88px] w-full">
            <InputUser professor={props.materia}  />
            <ButtonLuka/>
        </div>
    )
}