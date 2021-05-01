import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SubcategoryService } from 'src/app/services/subcategory.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  private categoryTitle: string | null = "";

  subcategories: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private _subcategoryService: SubcategoryService
  ) { }

  ngOnInit(): void {
    this.setCategoryFromParam();
    if (!this.categoryTitle || this.categoryTitle == "") {
      this.router.navigate(['']);
    }
    else this.getSubCategoriesByCategoryTitle(this.categoryTitle);
  }

  setCategoryFromParam() {
    const routeParams = this.route.snapshot.paramMap;
    this.categoryTitle = routeParams.get('title');
  }

  getSubCategoriesByCategoryTitle(title: string) {
    this._subcategoryService.getSubCategoriesByCategoryTitle(title).subscribe((response:any) => {
      this.subcategories = response;
    })
  }

}
