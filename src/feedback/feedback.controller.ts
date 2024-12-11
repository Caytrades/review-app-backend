import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { FeedbackService } from './feedback.service';
// import { AuthGuard } from '@nestjs/passport';
import { CreateFeedbackDto } from './dto/create-feedback.dto';

@Controller('feedback')
export class FeedbackController {
    constructor(private readonly feedbackService: FeedbackService) {}

    // @UseGuards(AuthGuard('jwt'))
    @Post()
    create(@Body() createFeedbackDto: CreateFeedbackDto) {
      return this.feedbackService.create(createFeedbackDto);
    }
  
    @Get('/product/:id')
    async getFeedbacksByProduct(@Param('productId') productId: string) {
        return this.feedbackService.findByProduct(+productId); // Convert productId to a number
    }

    // @Get()
    // async listFeedbacks() {
    //     return this.feedbackService.findAll();
    // }

    // @Get('/:id')
    // getFeedback () {

    // }

    // @Post()
    // async createMessage(@Body('message') message: string) {
    //     return this.feedbackService.create(message);
}
