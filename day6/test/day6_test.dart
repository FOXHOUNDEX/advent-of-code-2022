import 'package:day6/day6.dart' as day6;
import 'package:test/test.dart';

void main() {
  test('marker tests', () {
    expect(day6.bruteForce("mjqjpqmgbljsphdztnvjfqwrcgsmlb", 4), 7);
    expect(day6.bruteForce("bvwbjplbgvbhsrlpgdmjqwftvncz", 4), 5);
    expect(day6.bruteForce("nppdvjthqldpwncqszvftbrmjlhg", 4), 6);
    expect(day6.bruteForce("nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg", 4), 10);
    expect(day6.bruteForce("zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw", 4), 11);
  });

  test('message tests', () {
    expect(day6.bruteForce("mjqjpqmgbljsphdztnvjfqwrcgsmlb", 14), 19);
    expect(day6.bruteForce("bvwbjplbgvbhsrlpgdmjqwftvncz", 14), 23);
    expect(day6.bruteForce("nppdvjthqldpwncqszvftbrmjlhg", 14), 23);
    expect(day6.bruteForce("nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg", 14), 29);
    expect(day6.bruteForce("zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw", 14), 26);
  });
}
