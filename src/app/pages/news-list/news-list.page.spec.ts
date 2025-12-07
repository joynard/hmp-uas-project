import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NewsListPage } from './news-list.page';

describe('NewsListPage', () => {
  let component: NewsListPage;
  let fixture: ComponentFixture<NewsListPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
