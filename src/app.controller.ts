import { Controller, Get, Redirect, Render } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Redirect("/list?page=1")
  index() {};

  @Get("list")
  @Render("index")
  list() {};

  @Get("create")
  @Render("create")
  create() {};

  @Get("edit")
  @Render("edit")
  edit() {};
}
