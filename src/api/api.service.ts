import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { Note, NoteDocument } from '../schemas/note.schema';
import { InjectModel } from '@nestjs/mongoose';
import { FindNotesQuery, UCNoteBody } from './api.controller';

@Injectable()
export class ApiService {
    constructor(@InjectModel(Note.name) private noteModel: Model<Note>) {}

    async getNote(id: number): Promise<NoteDocument> {
        return this.noteModel.findOne({ id }).exec();
    }

    async getNotes(query: FindNotesQuery): Promise<NoteDocument[]> {
        return this.noteModel.find({}).sort({ updatedAt: -1 }).skip(query.offset).limit(query.count).exec();
    }

    async updateNote(body: UCNoteBody): Promise<boolean> {
        let note = await this.getNote(body.id);

        note.updateOne({ $set: { title: body.title, text: body.text, updatedAt: new Date() }}).exec();

        return true;
    }

    async createNote(body: UCNoteBody): Promise<boolean> {
        let id = await this.noteModel.count({}).exec();

        let date = new Date();

        await this.noteModel.create({
            id: id + 1,
            title: body.title,
            text: body.text,
            createdAt: date,
            updatedAt: date
        });

        return true;
    }

    async noteCount(): Promise<number> {
        return this.noteModel.count({}).exec();
    }

    async deleteNote(id: number): Promise<boolean> {
        await this.noteModel.deleteOne({ id }).exec();

        return true;
    }
}
