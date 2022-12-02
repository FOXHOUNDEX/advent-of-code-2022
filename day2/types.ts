
export type ParsedGame = {
  enemyElement: SelectedElement;
  myElement: SelectedElement;
  myExpectedGameResult: GameResult;
}

export enum GameResult {
  WIN = 'WIN',
  LOOSE = 'LOOSE',
  DRAW = 'DRAW'
}

export type InputLetter = 'A' | 'B' | 'C' | 'X' | 'Y' | 'Z';

export enum SelectedElement {
  ROCK = 'ROCK',
  PAPER = 'PAPER',
  SCISSORS = 'SCISSORS'
}

export const LetterToElementMapping: Record<InputLetter, SelectedElement> = {
  A: SelectedElement.ROCK,
  X: SelectedElement.ROCK,
  B: SelectedElement.PAPER,
  Y: SelectedElement.PAPER,
  C: SelectedElement.SCISSORS,
  Z: SelectedElement.SCISSORS,
};

export const LetterToExpectedGameResultMapping: { [key in InputLetter]?: GameResult } = {
  X: GameResult.LOOSE,
  Y: GameResult.DRAW,
  Z: GameResult.WIN,
};

export const ElementToPointsMapping: { [key in SelectedElement]: number } = {
  [SelectedElement.ROCK]: 1,
  [SelectedElement.PAPER]: 2,
  [SelectedElement.SCISSORS]: 3
}

export const GameResultToPointsMapping: { [key in GameResult]: number } = {
  [GameResult.LOOSE]: 0,
  [GameResult.DRAW]: 3,
  [GameResult.WIN]: 6,
}

type ResultMappingType = { [key in SelectedElement]: { [key in SelectedElement]?: GameResult } };

export const ResultMapping: ResultMappingType = {
  [SelectedElement.ROCK]: {
    [SelectedElement.SCISSORS]: GameResult.WIN,
    [SelectedElement.PAPER]: GameResult.LOOSE
  },
  [SelectedElement.PAPER]: {
    [SelectedElement.ROCK]: GameResult.WIN,
    [SelectedElement.SCISSORS]: GameResult.LOOSE
  },
  [SelectedElement.SCISSORS]: {
    [SelectedElement.PAPER]: GameResult.WIN,
    [SelectedElement.ROCK]: GameResult.LOOSE
  },
}

type InverseResultMappingType = { [key in SelectedElement]: { [key in GameResult]?: SelectedElement } };

export const InverseResultMapping: InverseResultMappingType = {
  [SelectedElement.ROCK]: {
    [GameResult.LOOSE]: SelectedElement.SCISSORS,
    [GameResult.WIN]: SelectedElement.PAPER,
  },
  [SelectedElement.PAPER]: {
    [GameResult.LOOSE]: SelectedElement.ROCK,
    [GameResult.WIN]: SelectedElement.SCISSORS,
  },
  [SelectedElement.SCISSORS]: {
    [GameResult.LOOSE]: SelectedElement.PAPER,
    [GameResult.WIN]: SelectedElement.ROCK,
  },
}