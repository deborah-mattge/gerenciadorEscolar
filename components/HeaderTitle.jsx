export default function HeaderTitle(props){
  return (

      <div className="flex justify-between bg-[#1B4079] rounded-t-lg p-4 py-6 w-full items-center" onClick={async ()=> {
            props.parentToChild(!props.able)
            if (!props.able && props.procurar){
              props.zerarProf([])
            }
            if (props.procurar && props.able){
              console.log("vo procurar")
              props.procuraProf()
            }
            if (props.mapear){
              props.mapeaAlunos()
            }


        }}>
          <p className="text-[#FCFCFC] w-full h-6 text-2xl items-center flex font-semibold">
          {props.texto}
          </p>
          {
            !props.able &&           <img src="arrowUp.svg" alt="" /> || <img src="more.svg" alt="" />

          }

        </div>
  )
}
 