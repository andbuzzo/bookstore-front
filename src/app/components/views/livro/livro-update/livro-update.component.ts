import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Livro } from '../livro.model';
import { LivroService } from '../livro.service';

@Component({
  selector: 'app-livro-update',
  templateUrl: './livro-update.component.html',
  styleUrls: ['./livro-update.component.css']
})
export class LivroUpdateComponent implements OnInit {

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

  update(){
    this.service.update(this.livro).subscribe({
      next: () => this.router.navigate([`categorias/${this.id_cat}/livros`]),
      error: () => {
        this.router.navigate([`categorias/${this.id_cat}/livros`]);
        this.service.mensagem('Falha ao atualizar livro, tente novamente mais tarde')
      },
      complete: () =>  this.service.mensagem('Livro atualizado com sucesso!')
    })
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
