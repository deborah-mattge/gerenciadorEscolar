import ButtonLuka from "./ButtonLuka";
import InputUser from "./InputUser";

export default function Professor() {
    return (
        <div className="flex gap-[88px] w-full">
            <InputUser write placeholder={"Escreva o nome do Professor"} />
            <ButtonLuka/>
        </div>
    )
}