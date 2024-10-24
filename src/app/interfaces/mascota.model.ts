// mascota.model.ts
export interface Ubicacion {
  lat: number | null; // Latitud, puede ser null inicialmente
  lng: number | null; // Longitud, puede ser null inicialmente
}

export interface Mascota {
  nombre: string;
  tipo: string;
  raza: string;
  color: string;
  tamano: string;
  edad: number | null; // Edad puede ser null
  ubicacion: Ubicacion; // Cambia 'direccion' a 'ubicacion'
  vacunado: boolean;
  comentarios: string;
}

