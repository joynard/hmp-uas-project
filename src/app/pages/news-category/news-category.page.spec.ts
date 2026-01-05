import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NewsCategoryPage } from './news-category.page';

describe('NewsCategoryPage', () => {
  let component: NewsCategoryPage;
  let fixture: ComponentFixture<NewsCategoryPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsCategoryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
