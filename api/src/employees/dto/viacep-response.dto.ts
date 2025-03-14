import { ApiProperty } from '@nestjs/swagger';

export class ViaCepResponseDto {
  @ApiProperty({ example: '01001-000' })
  cep: string;

  @ApiProperty({ example: 'Praça da Sé' })
  logradouro: string;

  @ApiProperty({ example: 'lado ímpar' })
  complemento: string;

  @ApiProperty({ example: 'Sé' })
  bairro: string;

  @ApiProperty({ example: 'São Paulo' })
  localidade: string;

  @ApiProperty({ example: 'SP' })
  uf: string;

  @ApiProperty({ example: '3550308' })
  ibge: string;

  @ApiProperty({ example: '1004' })
  gia: string;

  @ApiProperty({ example: '11' })
  ddd: string;

  @ApiProperty({ example: '7107' })
  siafi: string;
}
