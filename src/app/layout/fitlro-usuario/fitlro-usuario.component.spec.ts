import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FitlroUsuarioComponent } from './fitlro-usuario.component';

describe('FitlroUsuarioComponent', () => {
  let component: FitlroUsuarioComponent;
  let fixture: ComponentFixture<FitlroUsuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FitlroUsuarioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FitlroUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
