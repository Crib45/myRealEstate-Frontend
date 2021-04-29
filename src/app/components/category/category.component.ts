import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  private categoryTitle: string | null = "";

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.setCategoryFromParam();
    if (!this.categoryTitle || this.categoryTitle == "") {
      this.router.navigate(['']);
    }
    else this.getSubCategoriesByCategoryTitle()
  }

  setCategoryFromParam() {
    const routeParams = this.route.snapshot.paramMap;
    this.categoryTitle = routeParams.get('title');
  }

  getSubCategoriesByCategoryTitle() {

  }

}
