import { IOption } from './ioption';

export interface IQuestion {
  questionId: number;
  content: string;
  type: string;
  examId: number;
  optionAswerId: number;
  options: IOption[];
}
