import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NewsCreatePage } from './news-create.page';

describe('NewsCreatePage', () => {
  let component: NewsCreatePage;
  let fixture: ComponentFixture<NewsCreatePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsCreatePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
