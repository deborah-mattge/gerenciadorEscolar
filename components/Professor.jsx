import ButtonLuka from "./DisableButton";
import InputUser from "./InputUser";

export default function Professor(props) {
    return (
        <div className="flex gap-[88px] w-full bg-[#efefe5] rounded-lg">
            <InputUser nome={props.nome}/>
            <ButtonLuka disciplina={props.disciplina}/>
        </div>
    )
}