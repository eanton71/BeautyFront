/**
 * elementos
 * calendario mensual: se carga con los dias disponibles 
 * deshabilita  festivos.json y sabados y domingo (poner en otro color)
 * recibe del servidor lista de citas   a partir de una rango de fechas (1 a dos meses)
 *  GET parametro: servicio , retorna  lista de {año,mes,dia,hora,minutos,trabajador,duracion}
 * 
 * selectores para los trabajadores que salen en la tabla
 * 
 * lista de horas diaria: 
 * cuando se hace click en un dia disponible 
 * muestra las horas disponibles en rangos de un cuarto de hora a partir del horario del centro (10-21)
 * carga la tabla de citas para ese dia y trabajador horariocreado: bloquea los tramos cogidos en las citas
 * muestra botones en los tramos libres
 * 
 * una vez selecionado el tramo se confirma (boton confirmar), se envia a servidor para guardar
 * POST {año,mes,dia,hora,minutos,servicio,trabajador,cliente}
 * 
 */



import { Component } from '@angular/core';
import { CitaService } from '../services/cita.service';
import { ServiciosService } from '../services/servicios.service';
import { Cita, NuevaCita } from 'app/models/cita';
import { Trabajador } from '../models/trabajador';
import { Servicio } from '../models/servicio';
import { ActivatedRoute } from '@angular/router'; 
import { environment } from '../../environments/environment'; 
import { Cliente } from '../models/cliente';
import { HorizontalConnectionPos } from '@angular/cdk/overlay';
import { HttpSentEvent } from '@angular/common/http';
import { MatSelectionListChange } from '@angular/material/list';


const festivos = require('../../assets/data/festivos.json');
//const trabajadores = require('../../assets/data/trabajador.json');
@Component({
  selector: 'app-calendar',
  templateUrl: 'calendar.component.html',
  styleUrls: ['calendar.component.scss'],
})

export class CalendarComponent {


  
  id_cliente = "";
  serverimg = environment.url_public;
  id_servicio = "";
  trabajadores: Trabajador[] = new Array();
 
  selectedDate: any;
  //definir fecha minima y maxima para mostrar
  minDate = new Date();
  miliS = this.minDate.getTime();
  //1 minuto = 60000 miisegundos
  add2Meses = 2 * 30 * 24 * 60 * 60000;
  maxDate = new Date(this.miliS + this.add2Meses);
  selTrabajador: string="";
   
  constructor(private citaService: CitaService, private serviciosService: ServiciosService, private route: ActivatedRoute) {

  }
  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id_servicio = params['id'];
    });

    this.get_trabajadores_servicio(this.id_servicio);
    console.log("Trabajadores: ", this.trabajadores);
    //this.selected = this.trabajadores[0].nombre;
    this.getLocalStorageID();
     
  }
  private getLocalStorageID(): void {

    let usr: Cliente = JSON.parse(localStorage.getItem('user')!);
    this.id_cliente = usr._id;
     
  }

   

  anyo: number = 0;
  mesN: number = 0;
  mes = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

  dia: number = 0;
  hora: number = 0;
  min: number = 0;
  onSelectCalendar(event: any) {
    this.selectedDate=event;
    this.anyo = this.selectedDate.getFullYear() ;
    this.mesN = this.selectedDate.getMonth();
    this.dia = this.selectedDate.getDate();

  
    //y generamos la lista de horas disponibles
    this.generarHorario();
    this.horarioStr = this.horario.map(a => a.hora + ":" + a.min);
    this.horariocreado = true;

  }
  onSelectListChange($event: MatSelectionListChange) {
    let valor = $event.source.selectedOptions.selected[0].value;
    let indice = this.horarioStr.indexOf(valor);
    console.log(this.horario[indice]);
    this.hora = this.horario[indice].hora;
    this.min = this.horario[indice].min;

  }
   
  cita: NuevaCita | undefined;
  //console.log(this.selTrabajador);
  guardarcita() {
    alert("post: año" + this.anyo + ", mes: " + this.mesN + " ,dia: " + this.dia +
      " ,idcliente: " + this.id_cliente +
      ", idtrabajador: " + this.selTrabajador +
      ", idservicio: " + this.id_servicio);
    /* let t : Trabajador;
    try {
      t = this.trabajadores.find(t => t.nombre = this.selTrabajador);
    } catch (error) {
      console.log(error);
    }
    this.cita = new NuevaCita(
      this.anyo,
      this.mesN,
      this.dia,
      this.hora,
      this.min,
      this.id_servicio,
      60,
      this.trabajadores.find(t => t.nombre = this.selTrabajador),
      this.id_cliente); */
  /* this.citaService.guardarCita(new NuevaCita(
    this.anyo,
      this.mesN,
      this.dia,
      this.hora,
      this.min,
      this.id_servicio,
      60,
      this.trabajadores.find(t => t.nombre = this.selTrabajador),
      this.id_cliente))
      */
  }

  nofestivos: boolean[] = new Array();
  /**
   * para deshabilitar dias y no se puedan clicar
   */
  deshabilitaDias = (d: Date): boolean => {
    //this.nofestivos = festivos.every((d.getDay() != festivos.dia));
    return (d.getDay() !== 0 && d.getDay() !== 6);
  }

  horario = new Array();
  horarioStr: string[] = [];
  horariocreado = false;
  generarHorario() {
    this.horario = new Array();
    let hora: number = 9;
    let min: number = 0;
    this.horario.push({ hora: 9, min: 0 });
    for (let i = 1; i < 48; i++) {
      hora = hora + Math.floor((min + 15) / 60);
      min = (min + 15) % 60;
      this.horario.push({ hora: hora, min: min });
    }
  }


  private get_trabajadores_servicio = (id: string) => {
    this.serviciosService.getTrabajadoresServicio(id).subscribe(res => this.trabajadores = res);
  }
  /**
    
     
    deleteProduct(index: number): void {
      this.productService.deleteProduct(this.products[index]._id).subscribe(result => {
        if (result) {
          this.getProducts();
        }
      })
    }
    updateProduct(index: number): void {
      const { name, price, description } = this.productForm.getRawValue();
      this.productService.updateProduct(this.products[index]._id, name, price, description).subscribe(result => {
        if (result) {
          this.productForm.reset();
          this.getProducts();
        }
      })
    }
   */

    

  /*
  myFilter = (d: Date | null): boolean => {
    const day = (d || new Date()).getDay();
    // Prevent Saturday and Sunday from being selected.
    return day !== 0 && day !== 6;
  };*/
}
