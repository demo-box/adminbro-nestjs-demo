import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Comment extends Document {
  @Prop({
    default: Date.now,
  })
  created_at: Date;

  @Prop()
  user_id: string;

  @Prop()
  content: string;

  @Prop()
  liked_num: number;

  @Prop()
  client_name: string;

  @Prop()
  connect_key: string;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);
