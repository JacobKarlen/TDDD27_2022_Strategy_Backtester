import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { string } from 'mathjs';

import { kpis } from 'src/app/shared/data/kpis';
import { KPI } from 'src/app/shared/models/borsdata';

@Component({
  selector: 'app-kpiselector-modal',
  templateUrl: './kpiselector-modal.component.html',
  styleUrls: ['./kpiselector-modal.component.scss']
})
export class KPISelectorModalComponent implements OnInit {

  kpis: KPI[] = kpis.slice(0, 29) // only first 29 kpis currently have abbreviations

  searchGroup = new FormGroup({
    'search': new FormControl('', []),
  })

  constructor(public dialogRef: MatDialogRef<KPISelectorModalComponent>) {}

  ngOnInit(): void {
    this.searchGroup.valueChanges.subscribe((control: any) => {
      let term: string = control.search
      this.kpis = kpis.filter((kpi: KPI) => {
        return kpi.nameEn.includes(term) || kpi.abbreviation?.includes(term)
      })
    })
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }


}
