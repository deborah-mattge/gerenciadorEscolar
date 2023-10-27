
import InputUser from "./InputUser"


export default function AlunoNota(props) {
    return (
        <div className="w-full flex gap-[88px]">
            <InputUser nome={props.notaNome} />
            <p className="flex items-center justify-center bg-[#5D779F] p-4  gap-4 rounded-lg oi text-[#FCFCFC]">Nota: {props.nota}</p>
        </div>
    )
}

