import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NewsSearchPage } from './news-search.page';

describe('NewsSearchPage', () => {
  let component: NewsSearchPage;
  let fixture: ComponentFixture<NewsSearchPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsSearchPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
