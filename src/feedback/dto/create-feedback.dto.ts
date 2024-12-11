import { IsString, IsNotEmpty } from 'class-validator';

export class CreateFeedbackDto {
  @IsString()
  @IsNotEmpty()
  content: string;

  @IsNotEmpty()
  productId: number; // Assume this links the feedback to a specific product
}
