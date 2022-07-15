import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    Query,
    Headers,
} from '@nestjs/common';
import { DocumentService } from './document.service';
import { CreateDocumentDto } from './dto/create-document.dto';
import { UpdateDocumentDto } from './dto/update-document.dto';

@Controller('document')
export class DocumentController {
    constructor(private readonly documentService: DocumentService) {}

    @Post()
    create(@Body() createDocumentDto: CreateDocumentDto) {
        return this.documentService.create(createDocumentDto);
    }

    @Post(':id')
    fork(@Param('id') id: string, @Headers('Authorization') token: string) {
        return this.documentService.fork(id, token);
    }

    @Get()
    findAll() {
        return this.documentService.findAll();
    }

    @Get('search')
    search(@Query() query: { query: string; page?: string; limit?: string }) {
        let offset = 0;
        let limit = 10;
        let page = 1;
        if (query.limit) {
            limit = Number(query.limit);
            if (Number.isNaN(limit)) {
                offset = 0;
            }
        }
        if (query.page) {
            page = Number(query.page);
            if (Number.isNaN(page) || page < 1) {
                offset = 0;
            } else {
                offset = (page - 1) * limit;
            }
        }

        return this.documentService.search(query.query, offset, limit);
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.documentService.findOne(id);
    }

    @Patch('fav/:id')
    addFav(@Param('id') id: string, @Headers('Authorization') token: string) {
        return this.documentService.addFav(id, token);
    }

    @Patch(':id')
    update(
        @Param('id') id: string,
        @Body() updateDocumentDto: UpdateDocumentDto
    ) {
        return this.documentService.update(id, updateDocumentDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.documentService.remove(id);
    }
}
