import app

test_input = """vJrwpWtwJgWrhcsFMMfFFhFp
jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL
PmmdzqPrVvPwwTWBwg
wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn
ttgJtRGJQctTZtZT
CrZsJsPPZsGzwwsLwLmpwMDw""".split(
    "\n"
)

assert app.find_intersection_char("a", "b") == None
assert app.find_intersection_char("a", "a") == "a"
assert app.find_intersection_char("a", "A") == None
assert app.find_intersection_char("A", "a") == None
assert app.find_intersection_char("A", "a") == None
assert app.find_intersection_char("aaaax", "xbbbb") == "x"
assert app.find_intersection_char("asxNyy", "dddNdd") == "N"
assert app.find_intersection_char("aNxyyc", "ddddNd") == "N"

assert app.get_char_priority("a") == 1
assert app.get_char_priority("b") == 2
assert app.get_char_priority("z") == 26

assert app.get_char_priority("A") == 27
assert app.get_char_priority("X") == 50
assert app.get_char_priority("Z") == 52


assert app.sum_priorities_part1(test_input) == 157

assert app.sum_priorities_part2(test_input) == 70
