import 'dart:io';

int calculate() {
  return 6 * 7;
}

String readFromFile() {
  var file = File("./input.txt");
  return file.readAsStringSync();
}

int bruteForce(String line, int quantityOfCharsNeeded) {
  var temp = "";
  for (var i = 0; i < line.length - quantityOfCharsNeeded - 1; i++) {
    for (var j = 0; j < quantityOfCharsNeeded; j++) {
      if (!temp.contains(line[i + j])) {
        temp += line[i + j];
      } else {
        temp = "";
        break;
      }

      if (temp.length == quantityOfCharsNeeded) {
        return i + quantityOfCharsNeeded;
      }
    }
  }

  return -1;
}

int slidingWindow(String line, int quantityOfCharsNeeded) {
  Map<String, int> map = {};

  var window = 0;
  for (var i = 0; i < line.length; i++) {
    window += 1;
    var currentChar = line[i];
    if (map.containsKey(currentChar)) {
      var prevIndex = map[currentChar] as int;
      var diff = i - prevIndex;
      if (diff < quantityOfCharsNeeded) {
        if (diff < window) {
          window = diff;
        }
      }
    }

    map[currentChar] = i;
    if (window == quantityOfCharsNeeded) {
      return i + 1;
    }
  }

  return -1;
}
