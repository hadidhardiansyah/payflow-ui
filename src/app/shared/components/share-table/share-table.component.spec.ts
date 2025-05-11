import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShareTableComponent } from './share-table.component';

describe('ShareTableComponent', () => {
  let component: ShareTableComponent;
  let fixture: ComponentFixture<ShareTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShareTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShareTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
