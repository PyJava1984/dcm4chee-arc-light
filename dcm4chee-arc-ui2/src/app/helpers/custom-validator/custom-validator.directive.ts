import { Directive } from '@angular/core';
import {AbstractControl, Validator, NG_VALIDATORS, ValidatorFn} from "@angular/forms";

@Directive({
    selector: '[appCustomValidator]',
    providers: [{ provide: NG_VALIDATORS, useExisting: CustomValidatorDirective, multi: true }]
})
export class CustomValidatorDirective {

    static min(min: number): ValidatorFn {
        return (control: AbstractControl): {[key: string]: any} => {
            if (!control.value) {
                return null;  // don't validate empty values to allow optional controls
            }
            // {'msg': {'requiredMax': min, 'actual': control.value}}
            return control.value < min ?
            {'msg': `The given value ${control.value} is smaller than the allowed min value ${min}!`} :
                null;
        };
    }

    static max(max: number): ValidatorFn {
        return (control: AbstractControl): {[key: string]: any} => {
            if (!control.value) {
                return null;  // don't validate empty values to allow optional controls
            }
            // {'msg': {'requiredMax': max, 'actual': control.value}} :
            return control.value > max ?
            {'msg': `The given value ${control.value} is bigger than the allowed max value ${max}!`} :
                null;
        };
    }
    static regExp(patern: string): ValidatorFn {
        return (control: AbstractControl): {[key: string]: any} => {
            if (!control.value) {
                return null;  // don't validate empty values to allow optional controls
            }
            var re = new RegExp(patern, 'g');
            console.log("exec",re.exec(control.value));
            console.log("exec",(re.exec(control.value) === null));
            // {'msg': {'pattern': patern, 'value': control.value}} :
            return (re.exec(control.value) === null) ?
            {'msg': `The given value is not a valid string!`} :
                null;
        };
    }
}