import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Feedback } from './feedback.entity';

@Injectable()
export class FeedbackService {
  constructor(
    @InjectRepository(Feedback)
    private feedbackRepository: Repository<Feedback>,
  ) {}

  async create(message: string): Promise<Feedback> {
    const feedback = this.feedbackRepository.create({ message });
    return this.feedbackRepository.save(feedback);
  }

  async findAll(): Promise<Feedback[]> {
    return this.feedbackRepository.find();
  }
}
