import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {PdfViewerComponent} from '../pdf-viewer/pdf-viewer.component';
import {faBasketShopping, faEraser, faFilePdf, faFileArrowDown} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isPdf: boolean = false
  @ViewChild('navbarToggler') navbarToggler: ElementRef | undefined;
  faBasketShopping = faBasketShopping
  faEraser = faEraser
  faFilePdf = faFilePdf
  faFileArrowDown = faFileArrowDown

  constructor(private route: ActivatedRoute, private pdfViewerComponent: PdfViewerComponent) {

  }

  ngOnInit(): void {
    this.pdfViewerComponent.checkPdfFile().subscribe({
      next: () => {
        this.isPdf = true;
      },
      error: (err) => {
        this.isPdf = err.status == 200;
      }
    })
  }

  collapseNav() {
    this.navbarToggler?.nativeElement.click();
    console.log('Clicked');
  }
}
