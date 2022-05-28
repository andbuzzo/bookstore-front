import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Livro } from '../livro.model';
import { LivroService } from '../livro.service';

@Component({
  selector: 'app-livro-delete',
  templateUrl: './livro-delete.component.html',
  styleUrls: ['./livro-delete.component.css']
})
export class LivroDeleteComponent implements OnInit {

  id_cat : String = '';

  livro: Livro = {
    id: '',
    titulo:'',
    nome_autor:'',
    texto:''
  }

  constructor(
    private service: LivroService,
    private route: ActivatedRoute,
    private router: Router,
     ) { }

  ngOnInit(): void {
    this.id_cat = this.route.snapshot.paramMap.get("id_cat")!
    this.livro.id = this.route.snapshot.paramMap.get("id")!
    this.findById()
    
  }
  
  cancel(): void {
    this.router.navigate([`categorias/${this.id_cat}/livros`])
  }

  findById(): void{
    this.service.findById(this.livro.id!).subscribe((resposta) =>{
      this.livro = resposta
    })
  }

  delete(): void{
    this.service.delete(this.livro.id!).subscribe({
      next: () => this.service.mensagem('Livro deletado com sucesso!'),
      error: () => {
        this.service.mensagem("Erro ao remover o livro, tente novamente mais tarde!!!");
        this.router.navigate([`categorias/${this.id_cat}/livros`])
      },
      complete: () => this.router.navigate([`categorias/${this.id_cat}/livros`])
    })
  }

}
