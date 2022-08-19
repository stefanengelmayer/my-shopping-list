import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-pdf-viewer',
  templateUrl: './pdf-viewer.component.html',
  styleUrls: ['./pdf-viewer.component.css']
})
export class PdfViewerComponent implements OnInit {
  pdfSrc = "/assets/cookbook.pdf"


  constructor(private httpClient: HttpClient) {
  }

  ngOnInit(): void {
  }

  checkPdfFile() {
    return this.httpClient.get(this.pdfSrc)
  }
}
