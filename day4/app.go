package main

import (
	"io/ioutil"
	"strconv"
	"strings"
)

var testing = false

type Range struct {
	left  int
	right int
}

func (r *Range) containsIn(r2 Range) bool {
	return r.left >= r2.left && r.right <= r2.right
}

func (r *Range) overlapsWith(r2 Range) bool {
	return (r.left >= r2.left && r.left <= r2.right) || (r.right <= r2.right && r.right >= r2.left)
}

func main() {
	var input string

	if testing {
		input = `2-4,6-8
2-3,4-5
5-7,7-9
2-8,3-7
6-6,4-6
2-6,4-8`
	} else {
		data, _ := ioutil.ReadFile("input.txt")
		input = string(data)
	}

	contains, overlaps := processInput(input)
	println(contains, overlaps)
}

func processInput(input string) (uint, uint) {
	contains, overlaps := uint(0), uint(0)
	for _, line := range strings.Split(input, "\n") {
		var pairs = strings.Split(line, ",")
		var range1 = parseLine(pairs[0])
		var range2 = parseLine(pairs[1])
		if range1.containsIn(range2) || range2.containsIn(range1) {
			contains++
		}
		if range1.overlapsWith(range2) || range2.overlapsWith(range1) {
			overlaps++
		}
	}

	return contains, overlaps
}

func parseLine(s string) Range {
	var numbers = strings.Split(s, "-")
	var lower, _ = strconv.Atoi(numbers[0])
	var upper, _ = strconv.Atoi(numbers[1])

	return Range{lower, upper}
}
