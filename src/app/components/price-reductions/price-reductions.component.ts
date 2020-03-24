import { Component, OnInit } from "@angular/core";
import { Price_Reduction } from "../../models/price_reduction.model";
import { PriceReductionService } from "../../services/price-reduction.service";

@Component({
  selector: "app-price-reductions",
  templateUrl: "./price-reductions.component.html",
  styleUrls: ["./price-reductions.component.css"]
})
export class PriceReductionsComponent implements OnInit {
  price_reductions: Price_Reduction[] = [];
  detail = "detail";

  constructor(private _price_ReductionService: PriceReductionService) {}

  ngOnInit(): void {
    this.getPriceReductions();
  }

  // Get all price reductions.
  getPriceReductions() {
    this._price_ReductionService
      .getPriceReductions()
      .subscribe(
        price_reductions => (this.price_reductions = price_reductions)
      );
  }
}
