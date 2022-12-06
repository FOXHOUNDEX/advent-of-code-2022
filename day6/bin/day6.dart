import 'package:day6/day6.dart' as day6;

void main(List<String> arguments) {
  var line = day6.readFromFile();
  // var marker = day6.slidingWindow(line, 4);
  var marker = day6.bruteForce(line, 4);
  var message = day6.bruteForce(line, 14);

  print("marker = $marker");
  print("message = $message");
}
