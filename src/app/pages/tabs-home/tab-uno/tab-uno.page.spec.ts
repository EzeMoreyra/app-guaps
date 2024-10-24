import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TabUnoPage } from './tab-uno.page';

describe('TabUnoPage', () => {
  let component: TabUnoPage;
  let fixture: ComponentFixture<TabUnoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(TabUnoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
