import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne } from 'typeorm';
import { Product } from 'src/entities/product.entity';


@Entity()
export class Feedback {
  @PrimaryGeneratedColumn()
  id: number;

  // @Column('text')
  // message: string;
  
  @Column()
  content: string;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => Product, (product) => product.feedbacks, { onDelete: 'CASCADE' })
  product: Product;
}
