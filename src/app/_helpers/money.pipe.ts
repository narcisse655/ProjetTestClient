import { Pipe, PipeTransform } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { MaterielService } from '@app/_services';

@Pipe({
    name: 'money'
})
export class MoneyPipe implements PipeTransform {

    transform(montant: number, extension: string = 'FCFA'): string {
        return montant+extension;
        //return (montant / (1024 * 1024)).toFixed(2) + 'MB';
    } 

}
