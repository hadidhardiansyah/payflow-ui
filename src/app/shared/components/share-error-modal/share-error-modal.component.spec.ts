import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShareErrorModalComponent } from './share-error-modal.component';

describe('ShareErrorModalComponent', () => {
  let component: ShareErrorModalComponent;
  let fixture: ComponentFixture<ShareErrorModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShareErrorModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShareErrorModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
