/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { AfterViewInit, Component, ElementRef, ViewChild, DebugElement } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { CoreApiService, TextMsgItApiService } from '../../../shared';
import { CoreApiServiceMock } from '../../../testing';

import { TextBodyModule } from './text-body.module';
import { CharacterCounterDirective } from './character-counter.directive';

describe('Directive: CharacterCounter', () => {
  let component: MockWrapperComponent;
  let debugElem: DebugElement;
  let directive: CharacterCounterDirective;
  let fixture: ComponentFixture<MockWrapperComponent>;


  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        MockWrapperComponent
      ],
      imports: [
        FormsModule,
        TextBodyModule
      ],
      providers: [
        { provide: CoreApiService, useValue: CoreApiServiceMock },
        { provide: TextMsgItApiService, useValue: CoreApiServiceMock },
        { provide: ElementRef, useValue: $('<textarea></textarea>')}
      ]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MockWrapperComponent);
    component = fixture.componentInstance;
    debugElem = fixture.debugElement;
  });

  beforeEach(() => {
    /* latest way to access directive that you are testing--in our tests */
    //directive = debugElem.query(By.directive(CharacterCounterDirective)).componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create CharacterCounterDirective', () => {
    expect(component.directive).toBeTruthy();
  });

  describe('header count tests', () => {
    let headers = []
    beforeEach(() => {
      headers = [
        { name: 'Property',
          max_length: 23
        },
        { name: 'First Name',
          max_length: 11
        },
        { name: 'T-Code',
          max_length: 8
        }
      ]
    })
    it('should accurately count with basic headers', () => {
      component.directive.headers = headers;
      component.directive.input.val('test [Property]')
      let remaining = component.directive.count();
      expect(remaining).toEqual(132);

    })
    it('should accurately count with space in header Name', () => {
      component.directive.headers = headers;
      component.directive.input.val('test [First Name]')
      let remaining = component.directive.count();
      expect(remaining).toEqual(144);
    })
    it('should accurately count with special character in header Name', () => {
      component.directive.headers = headers;
      component.directive.input.val('test [T-Code]')
      let remaining = component.directive.count();
      expect(remaining).toEqual(147);
    })
    it('should accurately count with no headers', () => {
      component.directive.input.val('test message')
      let remaining = component.directive.count();
      expect(remaining).toEqual(148);
    })
  })

});

@Component({
  template:
  `
<textarea rdCharacterCounter [(ngModel)]="ngModel"></textarea>
  `
})
export class MockWrapperComponent implements AfterViewInit {
  /* alternate way you could access directive
    @ViewChild()--works in tests and in production */
  /* you would access it this way via component.directive in tests */
  /* not available until afterViewInit() */
  @ViewChild(CharacterCounterDirective) directive: CharacterCounterDirective;

  ngModel: string = 'initial characters';

  constructor() { }

  ngAfterViewInit() {
    /* directive should be defined now */
  }

}
