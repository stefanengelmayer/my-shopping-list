import {Component, OnInit} from '@angular/core';
import {faTrash} from '@fortawesome/free-solid-svg-icons';
import {GetService} from '../../services/get.service';
import {ItemRecord} from '../../Models/Record';
import {DeleteService} from '../../services/delete.service';
import {HttpErrorResponse} from '@angular/common/http';


@Component({
  selector: 'app-suggestions',
  templateUrl: './suggestions.component.html',
  styleUrls: ['./suggestions.component.css']
})
export class SuggestionsComponent implements OnInit {
  items: ItemRecord[] = []
  faTrash = faTrash

  constructor(private getService: GetService, private deleteService: DeleteService) {
  }

  ngOnInit(): void {
    this.loadList()
  }

  deleteSuggestion(item: ItemRecord) {
    this.deleteService.deleteItem(item.id).subscribe(response => {
      console.log(response);
      if (response instanceof HttpErrorResponse) {
        if (response.status == 409) {
          // TODO show toast notification that item is in use.
        }
      }
      this.loadList()
    })

  }

  loadList() {
    this.items = []
    this.getService.getItems().subscribe(response => {
      for (let responseItem of response.records) {
        let item = new ItemRecord();
        item.id = responseItem.id
        item.name = responseItem.name
        item.count = responseItem.count
        this.items.push(item)
      }
    })
  }


}
