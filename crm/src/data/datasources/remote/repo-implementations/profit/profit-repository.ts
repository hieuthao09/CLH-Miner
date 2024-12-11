// staff.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ListProfitResponse } from 'data/responses/profit/profit-response';
import { IProfitRepository } from 'domain/repositories/profit-repository';
import { environment } from 'environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class ProfitRepository extends IProfitRepository {
	private apiUrl = environment.api;

	constructor(private http: HttpClient) {
		super();
	}

	override getProfit(params: { pMinUtil: number }): Observable<ListProfitResponse> {
		return this.http.get<ListProfitResponse>(`${this.apiUrl}/smw-api/clhui`, {
			params,
		});
	}
}
