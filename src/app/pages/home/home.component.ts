import { Component, OnInit } from '@angular/core';
import { ProdutosService } from 'src/app/core/servicos/produtos.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  
  constructor (private servicoProduto: ProdutosService){
  }
  
  ngOnInit(): void {
    this.servicoProduto.listar()
    .subscribe(
      resposta => {
        console.log(resposta)
      }
    )
  }
}
