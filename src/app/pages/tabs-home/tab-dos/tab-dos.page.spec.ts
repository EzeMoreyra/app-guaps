import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TabDosPage } from './tab-dos.page';

describe('TabDosPage', () => {
  let component: TabDosPage;
  let fixture: ComponentFixture<TabDosPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(TabDosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
