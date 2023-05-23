import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type NoteDocument = HydratedDocument<Note>;

@Schema()
export class Note {
    @Prop({ index: true })
    id: number;

    @Prop()
    title: string;

    @Prop()
    text: string;

    @Prop()
    createdAt: Date;

    @Prop()
    updatedAt: Date | null;
}

export const NoteSchema = SchemaFactory.createForClass(Note);