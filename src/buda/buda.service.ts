import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class BudaService {
  async getTotalTradedDuringBlackBuda(): Promise<string> {
    const start = '2024-03-01T12:00:00-03:00';
    const end = '2024-03-01T13:00:00-03:00';
    try {
      const response = await axios.get('https://www.buda.com/api/v2/markets/btc-clp/trades', {
        params: {
          limit: 100,
          timestamp: { from: start, to: end }
        }
      });
      let total = 0;
      response.data.trades.entries.forEach((trade: [string, number, number]) => {
        const [timestamp, amount, price] = trade;
        total += amount * price;
      });
      return total.toFixed(2);
    } catch (error) {
      console.error('Error fetching data from Buda.com API:', error);
      return '0.00';
    }
  }

  async getPercentageIncreaseInVolume(): Promise<string> {
    const start2024 = '2024-03-01T12:00:00-03:00';
    const end2024 = '2024-03-01T13:00:00-03:00';
    const start2023 = '2023-03-01T12:00:00-03:00';
    const end2023 = '2023-03-01T13:00:00-03:00';
    try {
      const response2024 = await axios.get('https://www.buda.com/api/v2/markets/btc-clp/trades', {
        params: { limit: 100, timestamp: { from: start2024, to: end2024 } }
      });
      const response2023 = await axios.get('https://www.buda.com/api/v2/markets/btc-clp/trades', {
        params: { limit: 100, timestamp: { from: start2023, to: end2023 } }
      });
      let volume2024 = 0;
      let volume2023 = 0;
      response2024.data.trades.entries.forEach((trade: [string, number, number]) => {
        const [, amount] = trade;
        volume2024 += Number(amount);

      });
      response2023.data.trades.entries.forEach((trade: [string, number, number]) => {
        const [, amount] = trade;
        volume2023 += Number(amount);
      });

      console.log("Volume 2024:", volume2024);
      console.log("Volume 2023:", volume2023);

      if (volume2023 === 0) {
        return "No hay informacion para el 2023, no se puede calcular el % de crecimiento.";
      }

      const increase = ((volume2024 - volume2023) / volume2023) * 100;
      return increase.toFixed(2) + '%';
    } catch (error) {
      console.error('Error fetching data from Buda.com API:', error);
      return 'Failed to fetch data';
    }
  }

  async getLostCommissionDuringBlackBuda(): Promise<string> {
    const totalTraded = await this.getTotalTradedDuringBlackBuda();
    const commissionRate = 0.008; // 0.8%
    const lostCommission = Number(totalTraded) * commissionRate;
    return lostCommission.toFixed(2);
  }
}
