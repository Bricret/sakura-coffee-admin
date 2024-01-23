import { fonts } from "../UI/Fonts";
import AgreeTableForm from "../UI/TablesUI/AgreeTable-Form";


export default function AgreeTablePage() {
    return (
    <main 
      className=" h-screen py-28"
      style={{backgroundImage: 'linear-gradient(115deg, #a88165, #efd1bb)'}}
    >
      <section className="container mx-auto ">
        <article className="flex flex-col lg:flex-row  w-10/12 lg:w-8/12 bg-white rounded-xl mx-auto shadow-lg              overflow-hidden">   
          <section 
            className="w-full lg:w-1/2 text-black flex flex-col items-center justify-center bg-no-repeat bg-cover bg-center relative "
            style={{backgroundImage: 'url(/sideImage.jpg)'}}    
          >
              <div className="bg-white/80 p-2 rounded-lg text-center cursor-default">
                <h1 className={`${ fonts.merriweather.className } text-3xl font-bold text-third`}>
                    Bienvenido
                </h1>
                <p>Buenos amigos, buen café y buenos tiempos.</p>
              </div>
          </section>
          <section className="w-full lg:w-1/2 py-16 px-12">
            <h2 className={`${fonts.merriweather.className} text-2xl mb-4 cursor-default`}>Agregue una nueva <span className="text-secundary ">Mesa</span></h2>
            <p className="mb-4 text-zinc-600 cursor-default">Complete todos los campos</p>
            <AgreeTableForm />
          </section>
        </article>
      </section>
    </main>
    )
}