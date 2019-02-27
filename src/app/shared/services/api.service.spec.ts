import { ApiService } from "./api.service";
import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { Notebook } from '../../notes/model/notebook';

describe('ApiService', () => {

    let httpMock: HttpTestingController;
    let apiService: ApiService;

    // Execute before each unit test
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [ApiService]
        });
        // get an instance passing dependency injection
        httpMock = getTestBed().get(HttpTestingController);
        apiService = getTestBed().get(ApiService);
    });

    it('it is created', () => {
        expect(apiService).toBeTruthy();
    });

    it('should get all notebooks from http', () => {
        let notebooks: Notebook[] = [ { id: 1, name: "notebook name", numberOfNotes: 0 } ];

        // Tests
        apiService.getAllNotebooks().subscribe( res => {
                expect(res.length).toBe(1);
                expect(res).toEqual(notebooks);
        });

        // http mock for simulate http request
        let req = httpMock.expectOne(apiService.ALL_NOTEBOOKS_URL);
        expect(req.request.method).toBe("GET");
        req.flush(notebooks);

    });

});