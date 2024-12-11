import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Feedback } from './feedback.entity';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
  
  @Column()
  company: string;

  @Column()
  description: string;

  @OneToMany(() => Feedback, (feedback) => feedback.product)
  feedbacks: Feedback[];
}
