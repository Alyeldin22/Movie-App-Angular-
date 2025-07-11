import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TvShowsComponent } from './tv-shows';

describe('TvShows', () => {
  let component: TvShowsComponent;
  let fixture: ComponentFixture<TvShowsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TvShowsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TvShowsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
