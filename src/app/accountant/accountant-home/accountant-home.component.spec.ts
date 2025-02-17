import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountantHomeComponent } from './accountant-home.component';

describe('AccountantHomeComponent', () => {
  let component: AccountantHomeComponent;
  let fixture: ComponentFixture<AccountantHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccountantHomeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccountantHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
