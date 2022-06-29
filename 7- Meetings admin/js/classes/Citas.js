
class Citas{
    constructor(){
        this.citas=[];
    }

    agregarCita(cita){
        this.citas=[...this.citas,cita];
    }

    eliminarCita(id){
        this.citas=this.citas.filter(cita=> cita.id!==id);
    }

    editarCita(citaActualizada){
        //Iterar en cada una de las citas, verifica que la cita y la cita actualizada tengan el mismo ID y se reescribe todo el objeto
        this.citas = this.citas.map(cita => cita.id === citaActualizada.id ? citaActualizada : cita);
    }
}

export default Citas; //Exportando la clase