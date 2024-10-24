import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SeleccionarUbicacionComponent } from './seleccionar-ubicacion.component';

describe('SeleccionarUbicacionComponent', () => {
  let component: SeleccionarUbicacionComponent;
  let fixture: ComponentFixture<SeleccionarUbicacionComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [SeleccionarUbicacionComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SeleccionarUbicacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
