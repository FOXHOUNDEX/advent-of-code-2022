import input from './input'
// import input from './test-input'
import {
  ElementToPointsMapping,
  GameResult,
  GameResultToPointsMapping,
  InputLetter,
  InverseResultMapping,
  LetterToElementMapping,
  LetterToExpectedGameResultMapping,
  ParsedGame,
  ResultMapping
} from './types';


function parseInput(input: string): ParsedGame[] {
  const games: ParsedGame[] = [];

  for (const line of input.split('\n')) {
    const [enemy, mine] = line.split(' ') as InputLetter[];
    games.push({
      enemyElement: LetterToElementMapping[enemy],
      myElement: LetterToElementMapping[mine],
      myExpectedGameResult: LetterToExpectedGameResultMapping[mine]!
    });
  }

  return games;
}

function calculateMyScoreForGamePart1({ enemyElement, myElement }: ParsedGame): number {
  let score = 0;
  if (enemyElement === myElement) {
    score += GameResultToPointsMapping[GameResult.DRAW];
  }

  if (ResultMapping[myElement][enemyElement] === GameResult.WIN) {
    score += GameResultToPointsMapping[GameResult.WIN]
  }
  return score + ElementToPointsMapping[myElement];
}

function calculateMyScoreForGamePart2({ enemyElement, myExpectedGameResult }: ParsedGame): number {
  let score = GameResultToPointsMapping[myExpectedGameResult];

  const expectedElement = myExpectedGameResult === GameResult.DRAW ?
    enemyElement :
    InverseResultMapping[enemyElement][myExpectedGameResult]!

  return score + ElementToPointsMapping[expectedElement];
}


const parsedInput = parseInput(input);
const part1 = parsedInput.reduce((prev, next) => prev + calculateMyScoreForGamePart1(next), 0)
const part2 = parsedInput.reduce((prev, next) => prev + calculateMyScoreForGamePart2(next), 0)


console.log(`part 1 - ${part1}, part 2 - ${part2}`);




