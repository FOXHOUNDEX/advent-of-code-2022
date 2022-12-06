import 'package:day6/day6.dart' as day6;

void main(List<String> arguments) {
  var line = day6.readFromFile();

  var slMarker = day6.slidingWindow(line, 4);
  var slMessage = day6.slidingWindow(line, 14);

  var bfMarker = day6.bruteForce(line, 4);
  var bfMessage = day6.bruteForce(line, 14);

  print("sliding window: marker = $slMarker, message = $slMessage");
  print("brute froce: marker = $bfMarker, message = $bfMessage");
}
