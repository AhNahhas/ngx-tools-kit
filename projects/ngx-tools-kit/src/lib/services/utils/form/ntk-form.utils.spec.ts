import { TestBed } from '@angular/core/testing';
import { NtkFormUtils } from './ntk-form.utils';
import { Predicate, provideZonelessChangeDetection } from '@angular/core';
import { FormControl } from '@angular/forms';

describe('FormUtils', () => {
  let service: NtkFormUtils;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NtkFormUtils, provideZonelessChangeDetection()],
    });

    service = TestBed.inject(NtkFormUtils);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should validate email allowing blank', () => {
    const emailValidator = service.emailValidator(true);
    expect(emailValidator(new FormControl(null))).toBeNull();
    expect(emailValidator(new FormControl(''))).toBeNull();
    expect(emailValidator(new FormControl('test'))).not.toBeNull();
    expect(emailValidator(new FormControl('test@'))).not.toBeNull();
    expect(emailValidator(new FormControl('test@domain'))).toBeNull();
    expect(emailValidator(new FormControl('test@domain.com'))).toBeNull();
  });

  it('should validate email not allowing blank', () => {
    const emailValidator = service.emailValidator(false);
    expect(emailValidator(new FormControl(null))).not.toBeNull();
    expect(emailValidator(new FormControl(''))).not.toBeNull();
    expect(emailValidator(new FormControl('test'))).not.toBeNull();
    expect(emailValidator(new FormControl('test@'))).not.toBeNull();
    expect(emailValidator(new FormControl('test@domain'))).toBeNull();
    expect(emailValidator(new FormControl('test@domain.com'))).toBeNull();
  });

  it('should validate date allowing null', () => {
    const dateValidator = service.dateValidator(true);
    expect(dateValidator(new FormControl(null))).toBeNull();
    expect(dateValidator(new FormControl(new Date()))).toBeNull();
    expect(dateValidator(new FormControl('invalid date'))).not.toBeNull();
  });

  it('should validate date not allowing null', () => {
    const dateValidator = service.dateValidator(false);
    expect(dateValidator(new FormControl(null))).not.toBeNull();
    expect(dateValidator(new FormControl(new Date()))).toBeNull();
    expect(dateValidator(new FormControl('invalid date'))).not.toBeNull();
  });

  it('should validate positive number allowing null', () => {
    const positiveNumberValidator = service.positiveNumberValidator(true);
    expect(positiveNumberValidator(new FormControl(null))).toBeNull();
    expect(positiveNumberValidator(new FormControl(-1))).not.toBeNull();
    expect(positiveNumberValidator(new FormControl(0))).toBeNull();
    expect(positiveNumberValidator(new FormControl(10))).toBeNull();
  });

  it('should validate positive number not allowing null', () => {
    const positiveNumberValidator = service.positiveNumberValidator(false);
    expect(positiveNumberValidator(new FormControl(null))).not.toBeNull();
    expect(positiveNumberValidator(new FormControl(-1))).not.toBeNull();
    expect(positiveNumberValidator(new FormControl(0))).toBeNull();
    expect(positiveNumberValidator(new FormControl(10))).toBeNull();
  });

  it('should validate not blank allowing null', () => {
    const notBlankValidator = service.notBlankValidator(true);
    expect(notBlankValidator(new FormControl(null))).toBeNull();
    expect(notBlankValidator(new FormControl(''))).not.toBeNull();
    expect(notBlankValidator(new FormControl('   '))).not.toBeNull();
    expect(notBlankValidator(new FormControl('test'))).toBeNull();
  });

  it('should validate not blank not allowing null', () => {
    const notBlankValidator = service.notBlankValidator(false);
    expect(notBlankValidator(new FormControl(null))).not.toBeNull();
    expect(notBlankValidator(new FormControl(''))).not.toBeNull();
    expect(notBlankValidator(new FormControl('   '))).not.toBeNull();
    expect(notBlankValidator(new FormControl('test'))).toBeNull();
  });

  it('should validate array', () => {
    const arrayValidator = service.notEmptyArrayValidator();
    expect(arrayValidator(new FormControl(null))).not.toBeNull();
    expect(arrayValidator(new FormControl([]))).not.toBeNull();
    expect(arrayValidator(new FormControl([1, 2, 3]))).toBeNull();
  });

  it('should validate predicate', () => {
    const isEven: Predicate<number> = (value: number) => value % 2 === 0;
    const predicateValidator = service.predicateValidator(isEven);
    expect(predicateValidator(new FormControl(2))).toBeNull();
    expect(predicateValidator(new FormControl(3))).not.toBeNull();
  });
});
