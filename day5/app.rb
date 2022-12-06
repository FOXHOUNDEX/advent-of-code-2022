class Stack
  @stack_order
  @stack_value_index
  @stack_crates

  attr_accessor :stack_order
  attr_accessor :stack_value_index
  attr_accessor :stack_crates
  def initialize(stack_order, stack_value_index, stack_crates)
    @stack_order = stack_order
    @stack_value_index = stack_value_index
    @stack_crates = stack_crates
  end
  def moveTo(stacks, number_of_items, revert_order)
    items_to_take = self.stack_crates.first(number_of_items)
    stacks.stack_crates.unshift(*(revert_order ? items_to_take : items_to_take.reverse()))
    self.stack_crates = self.stack_crates.drop(number_of_items)
  end
end

class Instruction
  @quantity_to_move
  @from_where
  @to_where

  attr_reader :quantity_to_move
  attr_reader :from_where
  attr_reader :to_where
  def initialize(quantity_to_move, from_where, to_where)
    @quantity_to_move = quantity_to_move
    @from_where = from_where
    @to_where = to_where
  end
end

def parse_stacks_indexes(row, find_index_only)
  number_found = false
  stacks_indexes = []
  multi_digit_number = ''
  last_index = nil
  for char, i in row.split("").each_with_index
    if is_number(char)
      if !last_index
        last_index = i
      end
      number_found = true
      multi_digit_number += char
      if (i + 1 == row.length && multi_digit_number.length > 0)
        stacks_indexes.push(find_index_only == true ? last_index : multi_digit_number.to_i)
      end
    elsif multi_digit_number.length > 0
      stacks_indexes.push(find_index_only == true ? last_index : multi_digit_number.to_i)
      last_index = nil
      number_found = false
      multi_digit_number = ''
    end
  end

  return stacks_indexes
end

def parse_stacks(indexes, rows)
  stacks_result = []
  for stack_index, i in indexes.each_with_index
    stack_crates = []
    for row, index in rows.each_with_index
      if (index === rows.count - 1)
        break;
      end

      row_item = row[stack_index]
      if (row_item != '' && row_item != ' ')
        stack_crates.push(row_item)
      end
    end
    stacks_result.push(Stack.new(stack_index, i + 1, stack_crates))
    stack_crates = []
  end

  return stacks_result
end

def parse_instructions(input)
  instructions = []
  for row in input.split("\n")
    quantity, from, to = parse_stacks_indexes(row, false)
    instructions.push(Instruction.new(quantity, from, to))
  end

  return instructions
end

def parse_stacks_and_crates(input)
  rows = input.split("\n")
  last_row = rows[-1]
  stack_indexes = parse_stacks_indexes(last_row, true)

  return parse_stacks(stack_indexes, rows)
end

def is_number(char)
  return char =~ /\d/
end

def process_instructions(stacks, instructions, revert_order = false)
  for ins in instructions
    stack_from = stacks.find { |s| s.stack_value_index == ins.from_where}
    stack_to = stacks.find { |s| s.stack_value_index == ins.to_where}
    stack_from.moveTo(stack_to, ins.quantity_to_move, revert_order)
  end

  puts 'after proc'
  puts stacks.inspect

  top_crates = []
  for stack in stacks
    top_crate = stack.stack_crates[0]
    if (top_crate)
      top_crates.push(top_crate)
    end
  end

  return top_crates
end

def main
  input_content = File.open("input_initial_stacks.txt").read
  stacks = parse_stacks_and_crates input_content
  stacks_duplicate = parse_stacks_and_crates input_content

  input_instructions = File.open("input_instructions.txt").read
  parsed_instructions = parse_instructions input_instructions

  crane9000 = process_instructions(stacks, parsed_instructions, false)
  crane9001 = process_instructions(stacks_duplicate, parsed_instructions, true)

  puts "-- final results -- "
  puts crane9000.join()
  puts crane9001.join()
end

main()
