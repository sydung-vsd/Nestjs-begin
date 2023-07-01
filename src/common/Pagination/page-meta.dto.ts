import { ApiProperty } from "@nestjs/swagger";
import { PageMetaDtoParameters } from "./interface";

export class PageMetaDto {
  @ApiProperty()
  readonly page: number;

  @ApiProperty()
  readonly take: number;

  @ApiProperty()
  readonly totalRec: number;

  @ApiProperty()
  readonly pageCount: number;

  @ApiProperty()
  readonly hasPreviousPage: boolean;

  @ApiProperty()
  readonly hasNextPage: boolean;

  @ApiProperty()
  readonly recPerPage: number;

  constructor({ pageOptionsDto, totalRec }: PageMetaDtoParameters) {
    this.page = pageOptionsDto.page;
    this.take = pageOptionsDto.take;
    this.totalRec = totalRec;
    // this.recPerPage = pageOptionsDto.
    this.pageCount = Math.ceil(this.totalRec / this.take);
    this.hasPreviousPage = this.page > 1;
    this.hasNextPage = this.page < this.pageCount;
  }
}