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

// int slidingWindow(String line, int quantityOfCharsNeeded) {
//   // Set<String> set = {};
//   Map<String, int> map = {};

//   // var buildingLine = "";
//   int currentSequence = 0;
//   int startingIndex = -1;

//   for (var i = 0; i < line.length; i++) {
//     var currentChar = line[i];
//     if (!map.containsKey(currentChar)) {
//       map[currentChar] = i;
//       ++currentSequence;
//     }

//     if (startingIndex == -1) {
//       startingIndex = i;
//     }

//     if (!buildingLine.contains(line[i])) {
//       buildingLine += line[i];
//     } else {
//       startingIndex = -1;
//     }

//     print("buildingLine: $buildingLine");

//     if (buildingLine.length == quantityOfCharsNeeded) {
//       return startingIndex;
//     }
//   }

//   return -1;
// }
