import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {PdfViewerComponent} from '../pdf-viewer/pdf-viewer.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isPdf: boolean = false

  constructor(private route: ActivatedRoute, private pdfViewerComponent: PdfViewerComponent) {

  }

  ngOnInit(): void {
    console.log(this.route);
    this.pdfViewerComponent.checkPdfFile().subscribe({
      next: () => {
        this.isPdf =  true;
    },
      error: (err)  => {
        this.isPdf =  err.status == 200;
    }})
  }

}
