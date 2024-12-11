import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Feedback } from '../entities/feedback.entity';
import { CreateFeedbackDto } from './dto/create-feedback.dto';
import { Product } from '../entities/product.entity';

@Injectable()
export class FeedbackService {
  constructor(
    @InjectRepository(Feedback)
    private feedbackRepository: Repository<Feedback>,

    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  async create(createFeedbackDto: CreateFeedbackDto) {
    const { content, productId } = createFeedbackDto;

    // Find the product to associate with the feedback
    const product = await this.productRepository.findOne({ where: { id: productId } });
      if (!product) {
      throw new Error(`Product with ID ${productId} not found.`);
      }

    // Create the feedback entity and set the product relation
    const feedback = this.feedbackRepository.create({ 
      content, 
      product,
    });

    // Save the feedback entity
    return this.feedbackRepository.save(feedback);
  }

   async findByProduct(productId: number): Promise<Feedback[]> {
    const product = await this.productRepository.findOne({ where: { id: productId } });
    if (!product) {
      throw new Error(`Product with ID ${productId} not found`);
    }
    return this.feedbackRepository.find({ where: { product } });
  }
}

// @Injectable()
// export class FeedbackService {
//   constructor(
//     @InjectRepository(Feedback)
//     private feedbackRepository: Repository<Feedback>,
//   ) {}

//   async create(createFeedbackDto: CreateFeedbackDto) {
//     const feedback = this.feedbackRepository.create(createFeedbackDto);
//     return this.feedbackRepository.save(feedback);
//   }

//   async findByProduct(productId: number) {
//     return this.feedbackRepository.find({ where: { product: { id: productId } } });
//   }

//   async create(message: string) {
//     const feedback = this.feedbackRepository.create({ message });
//     return this.feedbackRepository.save(feedback);
//   }

//   async findAll() {
//     return this.feedbackRepository.find();
//   }
// }
