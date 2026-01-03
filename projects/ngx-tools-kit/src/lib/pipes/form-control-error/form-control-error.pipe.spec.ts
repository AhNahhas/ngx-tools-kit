import { FormControl, Validators } from '@angular/forms';
import { FormControlErrorPipe } from './form-control-error.pipe';

describe('FormControlErrorPipe', () => {
  it('create an instance', () => {
    const pipe = new FormControlErrorPipe();
    expect(pipe).toBeTruthy();
  });

  it('should return the error message for a specific error', () => {
    const pipe = new FormControlErrorPipe();
    const control = new FormControl(null, Validators.required);
    const errorMapping = { required: 'This field is required.' };
    expect(pipe.transform(control, errorMapping)).toBe('This field is required.');
  });

  it('should return the first error message if no mapping is found', () => {
    const pipe = new FormControlErrorPipe();
    const control = new FormControl('abc', Validators.compose([Validators.minLength(5)]));
    const errorMapping = { required: 'This field is required.' };
    expect(pipe.transform(control, errorMapping)).toEqual({ requiredLength: 5, actualLength: 3 });
  });

  it('should return null if there are no errors', () => {
    const pipe = new FormControlErrorPipe();
    const control = new FormControl('');
    const errorMapping = { required: 'This field is required.' };
    expect(pipe.transform(control, errorMapping)).toBeNull();
  });
});
