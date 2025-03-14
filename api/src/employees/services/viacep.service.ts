// src/shared/services/viacep.service.ts
import { Injectable, Logger, Inject } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { AxiosError } from 'axios';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { ViaCepResponseDto } from '../dto/viacep-response.dto';

@Injectable()
export class ViaCepService {
  private readonly logger = new Logger(ViaCepService.name);
  private readonly BASE_URL = 'https://viacep.com.br/ws';
  private readonly TIMEOUT = 5000;

  constructor(
    private readonly httpService: HttpService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async search(cep: string): Promise<ViaCepResponseDto> {
    const sanitizedCep = this.sanitizeCep(cep);
    this.validateCep(sanitizedCep);

    try {
      const cached =
        await this.cacheManager.get<ViaCepResponseDto>(sanitizedCep);
      if (cached) return cached;

      const response = await firstValueFrom(
        this.httpService.get(`${this.BASE_URL}/${sanitizedCep}/json/`, {
          timeout: this.TIMEOUT,
        }),
      );

      const result = this.mapResponse(response.data);
      await this.cacheManager.set(sanitizedCep, result, 86400000); // 24h cache
      return result;
    } catch (error) {
      this.handleError(error as AxiosError);
    }
  }

  private sanitizeCep(cep: string): string {
    return cep.replace(/\D/g, '');
  }

  private validateCep(cep: string): void {
    if (!/^\d{8}$/.test(cep)) {
      throw new Error('CEP deve conter exatamente 8 dígitos');
    }
  }

  private mapResponse(data: any): ViaCepResponseDto {
    if (data.erro) throw new Error('CEP não encontrado');

    return {
      cep: data.cep,
      logradouro: data.logradouro,
      complemento: data.complemento,
      bairro: data.bairro,
      localidade: data.localidade,
      uf: data.uf,
      ibge: data.ibge,
      gia: data.gia,
      ddd: data.ddd,
      siafi: data.siafi,
    };
  }

  private handleError(error: AxiosError): never {
    this.logger.error(`ViaCEP Error: ${error.message}`, error.stack);

    switch (error.response?.status) {
      case 400:
        throw new Error('Formato de CEP inválido');
      case 404:
        throw new Error('CEP não encontrado');
      default:
        throw new Error('Serviço de CEP temporariamente indisponível');
    }
  }
}
