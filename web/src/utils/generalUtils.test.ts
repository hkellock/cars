import { transpose } from './generalUtils';

test('transpose transposes the given matrix', () => {
  const matrix = [
    ['a', 'b'],
    ['c', 'd'],
    ['e', 'f'],
  ];
  const expectedResult = [
    ['a', 'c', 'e'],
    ['b', 'd', 'f'],
  ];
  const result = transpose(matrix);
  expect(result).toEqual(expectedResult);
});
