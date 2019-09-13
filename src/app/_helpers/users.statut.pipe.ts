import { Pipe, PipeTransform } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { MaterielService } from '@app/_services';

@Pipe({
    name: 'state'
})
export class UsersStatutPipe implements PipeTransform {

    transform(state: boolean): string {
        if (state == true){
            
            return 'Activé';
        }else{
            return 'Désactivé';
        }
        //return (montant / (1024 * 1024)).toFixed(2) + 'MB';
    } 

}
