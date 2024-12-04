import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { FeedbackService } from './feedback.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('feedback')
export class FeedbackController {
    constructor(private readonly feedbackService: FeedbackService) {}

    // @UseGuards(AuthGuard('jwt'))
    @Get()
    async listFeedbacks() {
        return this.feedbackService.findAll();
    }

    @Get('/:id')
    getFeedback () {

    }

    @Post()
    async createMessage(@Body('message') message: string) {
        return this.feedbackService.create(message);
    }
}
