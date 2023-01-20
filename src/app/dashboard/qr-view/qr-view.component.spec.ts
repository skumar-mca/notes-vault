import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { QRViewComponent } from './qr-view.component';


describe('QRViewComponent', () => {
  let component: QRViewComponent;
  let fixture: ComponentFixture<QRViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [QRViewComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QRViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
