/* eslint-disable @typescript-eslint/no-wrapper-object-types */
import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator';
export function IsPasswordConfirmationMatch(validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
        registerDecorator({
            name: 'isPasswordConfirmationMatch',
            target: object.constructor,
            propertyName: propertyName,
            constraints: ['password'],
            options: validationOptions,
            validator: {
                validate(value: string, args: ValidationArguments) {
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    const relatedValue = (args.object as any)[args.constraints[0]];
                    return value === relatedValue;
                },
                defaultMessage() {
                    return "Las contraseñas no coinciden.";
                },
            },
        });
    };
} 