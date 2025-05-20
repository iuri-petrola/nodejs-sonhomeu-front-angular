import { Component, OnInit } from '@angular/core';
import { ProdutosService } from 'src/app/core/servicos/produtos.service';
import { Produto } from 'src/app/core/types/types';


@Component({
  selector: 'app-produtos',
  templateUrl: './produtos.component.html',
  styleUrls: ['./produtos.component.scss']
})

export class ProdutosComponent implements OnInit {
  produtos!: Produto[];

  constructor(private service: ProdutosService) {
  }

  ngOnInit(): void {
    this.service.listar().subscribe(
      res => {
        this.produtos = res;
      }
    )
  }
}