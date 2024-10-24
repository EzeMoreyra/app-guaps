import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TabTresPage } from './tab-tres.page';

describe('TabTresPage', () => {
  let component: TabTresPage;
  let fixture: ComponentFixture<TabTresPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(TabTresPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
