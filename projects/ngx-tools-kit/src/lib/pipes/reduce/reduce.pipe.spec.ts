import { ReducePipe } from './reduce.pipe';

describe('ReducePipe', () => {
  it('create an instance', () => {
    const pipe = new ReducePipe();
    expect(pipe).toBeTruthy();
  });

  it('should reduce an array of numbers to their sum', () => {
    const pipe = new ReducePipe();
    const numbers = [1, 2, 3, 4, 5];
    const result = pipe.transform(numbers, (acc, item) => acc + item, 0);
    expect(result).toBe(15);
  });

  it('should reduce an array of strings to a single concatenated string', () => {
    const pipe = new ReducePipe();
    const strings = ['Hello', ' ', 'World', '!'];
    const result = pipe.transform(strings, (acc, item) => acc + item, '');
    expect(result).toBe('Hello World!');
  });
});
