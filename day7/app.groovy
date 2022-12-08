#!/usr/bin/env groovy

def extractInts( String input ) {
  input.findAll( /\d+/ )*.toInteger().first()
}

def extractChars( String input ) {
  input.findAll( /[a-z]+/ ).first()
}

abstract class FileSystemItem {
  FileSystemItem(name, parent = null) {
    this.name = name
    this.parent = parent
  }
  
  public FileSystemItem parent

  public String name

  public def getParent() {
    this.parent
  }

  public abstract def size()
  public abstract def type()
}

class FileItem extends FileSystemItem {
  public FileItem(name, size, parent) {
    super(name, parent)
    this.size = size
  }

  private int size;

  @Override
  public def size() {
    return this.size;
  }

  @Override
  public def type() {
    return "file";
  }
}

class DirectoryItem extends FileSystemItem {
  DirectoryItem(name, parent = null) {
    super(name, parent)
  }

  public ArrayList<FileSystemItem> children = [];

  public addChild(FileSystemItem child) {
    this.children.add(child)
  }

  public findDirByName(name) {
    this.children.find { it.name == name }
  }

  @Override
  public def size() {
    int size = 0;
    for (child in this.children) {
      def childSize = child.size()
      size += child.size()
    }

    return size;
  }

  @Override
  public def type() {
    return "directory";
  }

  public def calculateSizesWhereAtMost(size) {
    int result = 0;
    for (child in this.children.findAll { it.type() == "directory" }) {
      final childSize = child.size()
      if (childSize <= size) {
        result += childSize
      }
      result += child.calculateSizesWhereAtMost(size)
    }
    return result
  }

  public def findSmallestDirMoreThan(minSize) {
    int result = 0
    for (child in this.children.findAll { it.type() == "directory" }) {
      final childSize = child.size()
      if (childSize >= minSize) {
        if (result == 0 || childSize < result) {
          result = childSize
        }

        final innerChildSmallest = child.findSmallestDirMoreThan(minSize)
        if (innerChildSmallest && (result == 0 || innerChildSmallest <= result)) {
          result = innerChildSmallest
        }
      }
    }
    
    return result
  }
}

def main() {
  String fileContents = new File('input.txt').text
  final lines = fileContents.split("\n")

  Boolean lsCommandExecuted = false;
  
  DirectoryItem root;
  DirectoryItem currentDir;

  for (int i = 0; i < lines.length; i++) {
    final line = lines[i]

    switch(line) {
      case ~/dir .*/:
        final dirName = line.substring("dir ".length())
        final newDir = new DirectoryItem(dirName, currentDir)
        currentDir.addChild(newDir)
        break;
      case ~/[0-9]* .*/:
        final fileName = extractChars(line)
        final fileSize = extractInts(line)
        final newFile = new FileItem(fileName, fileSize, currentDir)
        currentDir.addChild(newFile)
        break;
      case ~/\$ cd [a-z]*/:
        var dirName = line.substring("\$ cd ".length())
        currentDir = currentDir.findDirByName(dirName)
        break;
      case "\$ cd ..":
        currentDir = currentDir.parent
        break;
      case "\$ cd /":
        currentDir = root = new DirectoryItem("root")
        break;
    }
  }

  final overallSize = root.size()
  println "overall size: ${overallSize}"
  println "sum of dirs under 100000: ${root.calculateSizesWhereAtMost(100000)}"

  final totalSpace = 70000000
  final unusedSpace = totalSpace - overallSize
  println "unused space: ${unusedSpace}"

  final requiredSpace = 30000000
  final spaceToFreeUp = requiredSpace - unusedSpace
  println "space to free up: ${spaceToFreeUp}"
  
  final minSize = root.findSmallestDirMoreThan(spaceToFreeUp)
  println "size ${minSize}"
}

main()
