import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Livro } from '../livro.model';
import { LivroService } from '../livro.service';

@Component({
  selector: 'app-livro-create',
  templateUrl: './livro-create.component.html',
  styleUrls: ['./livro-create.component.css']
})
export class LivroCreateComponent implements OnInit {

  id_cat : String = '';

  livro: Livro = {
    id: '',
    titulo:'',
    nome_autor:'',
    texto:''
  }

  titulo = new FormControl('', [Validators.minLength(3), Validators.maxLength(100)])
  nome_autor = new FormControl('', [Validators.minLength(3),Validators.maxLength(100)])
  texto = new FormControl('', [Validators.minLength(10), Validators.maxLength(2000000)])

  constructor(
    private service: LivroService,
    private route: ActivatedRoute,
    private router: Router,
     ) { }

  ngOnInit(): void {
    this.id_cat = this.route.snapshot.paramMap.get("id_cat")!
    console.log(this.id_cat + " nginit")
  }

  create():void{
    console.log(this.id_cat)
    this.service.create(this.livro, this.id_cat).subscribe({
      next: () => this.router.navigate([`categorias/${this.id_cat}/livros`]),
      error: () => {
        this.router.navigate([`categorias/${this.id_cat}/livros`])
        this.service.mensagem('Erro ao criar novo livro! Tente mais tarde!')
      },
      complete: () =>  this.service.mensagem('Livro criado com sucesso')
    })

  }

  cancel(): void {
    this.router.navigate([`categorias/${this.id_cat}/livros`])
  }

  getMessage(){
    if(this.titulo.invalid){
      return 'O Campo TITULO deve conter entre 3 e 100 caracteres';
    }
    if(this.nome_autor.invalid){
      return 'O Campo Nome do Autor deve conter entre 3 e 100 caracteres';
    }
    if(this.texto.invalid){
      return 'O Campo Texto deve conter entre 10 e 2000000 caracteres';
    }
    return false;
  }

}
