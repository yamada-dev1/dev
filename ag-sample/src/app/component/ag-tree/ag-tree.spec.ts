import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgTree } from './ag-tree';

describe('AgTree', () => {
  let component: AgTree;
  let fixture: ComponentFixture<AgTree>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgTree]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgTree);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
