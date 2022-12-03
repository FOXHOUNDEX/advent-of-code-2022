file = open("input.txt", "r")


def find_intersection_char(left, right):
    for char in left:
        index = right.find(char)
        if index != -1:
            return right[index]


def get_char_priority(char):
    return ord(char) - 38 if char.isupper() else ord(char) - 96


def sum_priorities_part1(lines):
    result = 0
    for line in lines:
        left = line[0 : len(line) // 2 :]
        right = line[len(line) // 2 : len(line) :]
        char = find_intersection_char(left, right)
        result += get_char_priority(char)
    return result


def sum_priorities_part2(lines):
    result = 0
    for index in range(0, len(lines))[::3]:
        uniqueness_set = set([])
        starting_line = lines[index]
        for char in starting_line:
            # dunno why i've decided to do this optimization
            # probably just to learn python a bit more :)
            if char in uniqueness_set:
                continue
            uniqueness_set.add(char)
            if char in lines[index + 1] and char in lines[index + 2]:
                result += get_char_priority(char)
    return result


lines = file.read().split("\n")
print("part1 =", sum_priorities_part1(lines))
print("part2 =", sum_priorities_part2(lines))
