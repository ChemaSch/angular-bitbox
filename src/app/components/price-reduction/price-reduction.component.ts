import { Component, OnInit } from "@angular/core";
import { Price_Reduction } from "../../models/price_reduction.model";
import { ActivatedRoute } from "@angular/router";
import { PriceReductionService } from "../../services/price-reduction.service";
import { NgForm } from "@angular/forms";

@Component({
  selector: "app-price-reduction",
  templateUrl: "./price-reduction.component.html",
  styleUrls: ["./price-reduction.component.css"]
})
export class PriceReductionComponent implements OnInit {
  price_reduction = new Price_Reduction();

  isDetail: boolean;

  constructor(
    private _price_ReductionService: PriceReductionService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const detail = this.route.snapshot.paramMap.get("detail");
    this.isDetailView(detail);

    const id = this.route.snapshot.paramMap.get("id");
    this.getPriceReduction(id);
  }

  isDetailView(detail: string) {
    if (detail === "detail") {      
      this.isDetail = true;
    } else {      
      this.isDetail = false;
    }
  }

  // Get a price reduction.
  getPriceReduction(id: string) {
    this._price_ReductionService
      .getPriceReduction(id)
      .subscribe(price_reduction => (this.price_reduction = price_reduction));
  }

  // Register a new price reduction.
  savePriceReduction(price_Reduction: Price_Reduction) {
    this._price_ReductionService
      .savePriceReduction(price_Reduction)
      .subscribe();
  }

  saveOrUpdate(f: NgForm) {
    if (f.invalid) {
      return;
    }

    this.savePriceReduction(this.price_reduction);
  }
}
