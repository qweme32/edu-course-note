import { Controller, Get, Query, Post, Delete, Put, Body } from '@nestjs/common';
import { ApiService } from './api.service';

export interface UCNoteBody {
    id: number;
    title: number;
    text: number;
}

export interface FindNotesQuery {
    count: number;
    offset: number;
}

@Controller('api')
export class ApiController {
    constructor (private readonly apiService: ApiService) {}

    @Get("note")
    async getNote(@Query('id') id: number) {
        return this.apiService.getNote(id);
    }

    @Get("notes")
    async getNotes(@Query() query: FindNotesQuery) {
        return this.apiService.getNotes(query);
    }

    @Get("notes/count")
    async getNotesCount() {
        return this.apiService.noteCount();
    }

    @Post("note")
    async postNote(@Body() body: UCNoteBody) {
        return this.apiService.createNote(body);
    }

    @Put("note")
    async putNote(@Body() body: UCNoteBody) {
        return this.apiService.updateNote(body);
    }

    @Delete("note")
    async deleteNote(@Query('id') id: number) {
        return this.apiService.deleteNote(id);
    }
}
