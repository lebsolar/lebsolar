import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import emailjs from '@emailjs/browser';

@Component({
  selector: 'app-contacto',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contact.html',
  styleUrl: './contact.css',
})
export class Contact {

  constructor(private title: Title) {
    this.title.setTitle('CONTACTO | LebSolar Ingeniería');
  }

  loading = false;
  enviado = false;
  error = false;

  autoResize(event: any) {
    const textarea = event.target;
    textarea.style.height = 'auto';
    textarea.style.overflow = 'hidden';
    textarea.style.height = textarea.scrollHeight + 'px';
  }

  enviarFormulario(form: any) {

    if (form.invalid) return;

    this.loading = true;
    this.enviado = false;
    this.error = false;

    emailjs.send(
      'SERVICE_ID',
      'TEMPLATE_ID',
      {
        from_name: form.value.nombre,
        phone: form.value.telefono,
        from_email: form.value.email || 'No proporcionado',
        message: form.value.mensaje || 'Sin mensaje',
        servicio: form.value.servicio || 'No especificado'
      },
      '' //Public Key
    )
      .then(() => {

        this.loading = false;
        this.enviado = true;

        form.resetForm();

        setTimeout(() => {
          this.enviado = false;
        }, 4000);

      })
      .catch((err) => {

        console.error('Error EmailJS:', err);
        this.loading = false;
        this.error = true;

        setTimeout(() => {
          this.error = false;
        }, 4000);

      });
  }
}