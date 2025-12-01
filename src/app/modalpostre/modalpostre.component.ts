import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ModalController, IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonButton, IonIcon, IonItem, IonLabel, IonInput, IonSelect, IonSelectOption } from '@ionic/angular/standalone';
import { FormsModule } from '@angular/forms'; // Necesario para standalone
import { closeCircleOutline, saveOutline } from 'ionicons/icons';
import { addIcons } from 'ionicons';

@Component({
  selector: 'app-modal-postre',
  templateUrl: './modalpostre.component.html',
  styleUrls: ['./modalpostre.component.scss'],
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule, 
    ReactiveFormsModule, // 👈 IMPORTANTE para usar Formularios Reactivos
    IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonButton, IonIcon, IonItem, IonLabel, IonInput, IonSelect, IonSelectOption
  ]
})
export class ModalPostreComponent implements OnInit {
  // Datos recibidos de MispostresPage (a través de componentProps)
  @Input() postre: any; 
  @Input() modo: 'agregar' | 'editar' = 'agregar';
  
  public formTitle: string = '';
  public productForm!: FormGroup;
  public categorias = ['Tortas', 'Pies', 'Cupcakes', 'Galletas', 'Otros']; // Ejemplo de categorías

  constructor(
    private modalController: ModalController,
    private fb: FormBuilder
  ) {
    addIcons({ closeCircleOutline, saveOutline });
  }

  ngOnInit() {
    this.formTitle = this.modo === 'agregar' ? 'Agregar Nuevo Producto' : 'Editar Producto';
    
    // Inicializar Formulario Reactivo
    this.productForm = this.fb.group({
      id: [this.postre ? this.postre.id : null],
      descripcion: [this.postre ? this.postre.descripcion : '', [Validators.required, Validators.minLength(3)]],
      categoria: [this.postre ? this.postre.categoria : this.categorias[0], Validators.required],
      precio: [this.postre ? this.postre.precio : '', [Validators.required, Validators.min(0.01)]],
      imagen: [this.postre ? this.postre.imagen : ''] // Solo URL de imagen por ahora
    });
  }

  // Cierra el modal sin devolver datos (botón Cancelar/X)
  cancelar() {
    this.modalController.dismiss(null, 'cancel');
  }

  // Cierra el modal y devuelve los datos del formulario (botón Guardar)
  guardar() {
    if (this.productForm.valid) {
      // 1. Obtiene los datos finales del formulario
      const dataToReturn = this.productForm.value;
      
      // 2. Devuelve los datos al componente padre con el rol 'confirm'
      this.modalController.dismiss(dataToReturn, 'confirm');
    } else {
      console.log('Formulario inválido. Revisa los campos.');
      // Opcional: Mostrar un Toast al usuario
    }
  }
}