import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TabsHomePage } from './tabs-home.page';

describe('TabsHomePage', () => {
  let component: TabsHomePage;
  let fixture: ComponentFixture<TabsHomePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(TabsHomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
